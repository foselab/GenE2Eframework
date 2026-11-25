from dataclasses import dataclass
from typing import Optional

@dataclass
class LlmResponse:
    """Class representing a test step within a test case."""
    response: str
    prompt: str
    n_tokens_prompt: str
    n_tokens_response: str
    time: int
    thinking_chars: int = 0
    num_ctx: int = 0
    gpu_percent: Optional[int] = None
    load_duration: int = 0
    eval_duration: int = 0
