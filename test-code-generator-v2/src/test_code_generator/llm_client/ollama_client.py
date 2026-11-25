import json
import logging
import os
import ollama
from test_code_generator.llm_client.base_llm_client import BaseLLMClient
from test_code_generator.llm_client.llm_client_error import LLMClientError
from test_code_generator.llm_client.llm_response import LlmResponse
from test_code_generator.llm_client.llm_chat_request import LlmChatRequest

logger = logging.getLogger(__name__)

# context window used when neither the caller nor the environment asks for one:
# the runtime default (4096) is too small for the batch prompts, the model maximum is too large for the 70B
DEFAULT_NUM_CTX = 65536


def _model_defaults(model: str):
    """Context length and thinking support declared by the model, when the runtime reports them."""
    try:
        info = ollama.show(model)
        model_info = getattr(info, "model_info", None) or {}
        context_length = next((value for key, value in model_info.items() if key.endswith("context_length")), None)
        capabilities = getattr(info, "capabilities", None) or []
        return context_length, "thinking" in capabilities
    except Exception as e:
        logger.warning(f"Model information not available for {model}: {e}")
        return None, False


def _env_flag(name: str, default: bool = False) -> bool:
    """Boolean environment flag: 1/true/yes/on enable it, anything else disables it."""
    value = os.environ.get(name)
    if value is None:
        return default
    return value.strip().lower() in ("1", "true", "yes", "on")


def _loaded_gpu_percent(client, model: str):
    """Share of the loaded model that sits in VRAM: 100 = no CPU offload, less = offloaded layers."""
    try:
        for loaded in client.ps().models:
            if loaded.name == model or loaded.model == model:
                size = int(loaded.size or 0)
                vram = int(loaded.size_vram or 0)
                return round(100 * vram / size) if size else None
    except Exception as e:
        logger.warning(f"Loaded model information not available for {model}: {e}")
    return None

class OllamaClient(BaseLLMClient):
    """
    A wrapper over Ollama to interact with
    """

    def __init__(self, model: str = "llama3", timeout: int = 120, num_ctx: int = None, disable_thinking: bool = True,
                 allow_offloading: bool = None, keep_alive: str = None):
        """
        Initialize OllamaClient
        :param model:
        :param timeout:
        :param num_ctx: context window; when not given, GEN2E2_NUM_CTX, then DEFAULT_NUM_CTX (65536)
        :param disable_thinking: do not ask the reasoning to the thinking models
        :param allow_offloading: let the runtime keep on the CPU the layers that do not fit in the GPU
                                (None = read GEN2E2_ALLOW_OFFLOADING, default false)
        :param keep_alive: how long the runtime keeps the model in memory between the calls of a run (0 = unload after every call)
        """

        self.model = model
        self.timeout = timeout
        model_context_length, thinking_supported = _model_defaults(model)
        # precedence: argument, environment, fixed default. The maximum declared by the model is not used:
        # 131072 for llama3.3 does not fit in VRAM together with a 70B, and the runtime default of 4096
        # is smaller than the batch prompts
        self.num_ctx = num_ctx or int(os.environ.get("GEN2E2_NUM_CTX", 0)) or DEFAULT_NUM_CTX
        # the pinned client (0.4.8) has no capabilities in ShowResponse, so the probe never matched:
        # reasoning is disabled unconditionally (think: false is harmless for non-thinking models)
        self.disable_thinking = disable_thinking
        self.allow_offloading = allow_offloading if allow_offloading is not None else _env_flag("GEN2E2_ALLOW_OFFLOADING", False)
        self.keep_alive = keep_alive or os.environ.get("GEN2E2_KEEP_ALIVE", "30m")
        self.client = ollama.Client()
        logger.info(f"OllamaClient initialized with model: {self.model} (num_ctx: {self.num_ctx}, thinking disabled: {self.disable_thinking}, offloading allowed: {self.allow_offloading}, keep_alive: {self.keep_alive})")

    def chat(self, request: LlmChatRequest, temperature: float) -> LlmResponse:
        
        messages = []
        for message in request.messages:
            messages.append({
                "role": message.role,
                "content": message.content
            })
        
        try:
            options = {
                "timeout": self.timeout,
                "temperature": temperature
            }
            if not self.allow_offloading:
                # all the layers must stay in VRAM: without room the runtime fails instead of spilling to the CPU
                options["num_gpu"] = 999
            if self.num_ctx:
                options["num_ctx"] = self.num_ctx

            payload = {
                "model": self.model,
                "messages": messages,
                "stream": False,
                "options": options,
                # without this the runtime unloads the model after every answer and reloads it on the next call
                "keep_alive": self.keep_alive
            }
            if self.disable_thinking:
                # thinking models: no reasoning, only the final answer is generated
                payload["think"] = False

            # the installed ollama client does not expose think and num_ctx, so the request is sent
            # through its own client, which keeps the same host and error handling
            response = self.client._request_raw("POST", "/api/chat", json=payload).json()
            logger.info(response)

            content = response["message"]["content"]
            # an empty answer (done: false) carries no counts: without the defaults the whole use case is lost
            n_tokens_prompt = response.get("prompt_eval_count", 0)
            n_tokens_response = response.get("eval_count", 0)
            total_duration = response.get("total_duration", 0)
            load_duration = response.get("load_duration", 0)
            eval_duration = response.get("eval_duration", 0)

            gpu_percent = _loaded_gpu_percent(self.client, self.model)
            logger.info(f"Model {self.model} loaded with {gpu_percent}% in VRAM (100 = no CPU offload)")

            return LlmResponse(content, messages, n_tokens_prompt, n_tokens_response, total_duration,
                              len(response["message"].get("thinking") or ""), self.num_ctx or 0, gpu_percent,
                              load_duration, eval_duration)
        
        except ollama.ResponseError as e:
            logger.exception(e)
            print(e)
            raise LLMClientError(e)

    def unload(self) -> None:
        """Release the model: the GPU goes back to the other users, the next run loads it again."""
        try:
            # keep_alive 0 on /api/generate is the documented way to unload a model
            self.client._request_raw("POST", "/api/generate", json={"model": self.model, "keep_alive": 0})
            logger.info(f"Model {self.model} released")
        except Exception as e:
            logger.warning(f"Model {self.model} not released: {e}")

    def generate(self, prompt: str, temperature:float) -> LlmResponse:
        """
        Sends a prompt to Ollama and returns the response.
        :param prompt: the prompt to be sent to Ollama
        :param temperature: temperature of the model execution
        :return: the generated response
        """

        try:
            response = ollama.generate(
                model=self.model,
                prompt=prompt,
                stream=False,
                raw=True,
                options={
                    "timeout": self.timeout,
                    "temperature": temperature
                }
            )
            # content = ""
            # for chunk in response:
            #     chunkContent = chunk['response']
            #     content += chunkContent
            #     print(chunkContent, end='', flush=True)
            content = response["response"]
            n_tokens_prompt = response["prompt_eval_count"]
            n_tokens_response = response["eval_count"]
            total_duration = response["total_duration"]
            
            logger.info(f"Ollama responded in {total_duration} time, with {n_tokens_prompt} tokens in prompt and {n_tokens_response} tokens in response. Content:\n {content}")
            
            return LlmResponse(content, prompt, n_tokens_prompt, n_tokens_prompt, total_duration)
        
        except ollama.ResponseError as e:
            logger.exception(e)
            print(e)
            raise LLMClientError(e)



