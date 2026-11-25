"""Generation metrics of a use case, written as <use case>.xlsx next to the generated code."""
from pathlib import Path
from typing import Any, Dict, List

from openpyxl import Workbook

NANOSECONDS_IN_SECOND = 1_000_000_000

COLUMNS = ["Test_Case", "n_tokens_prompt", "n_tokens_response", "time", "time_load", "time_generation",
           "num_ctx", "context_used", "context_available", "thinking_chars", "reasoning", "gpu_cpu",
           "errore_formattazione", "Required human fix"]


def build_row(response, test_case_label: str, errore_formattazione: bool = False) -> Dict[str, Any]:
    """One row per generation call: the test case id and the metrics of the call."""
    prompt_tokens = getattr(response, "n_tokens_prompt", None) or 0
    response_tokens = getattr(response, "n_tokens_response", None) or 0
    context_available = getattr(response, "num_ctx", 0) or 0
    thinking_chars = getattr(response, "thinking_chars", 0) or 0
    gpu_percent = getattr(response, "gpu_percent", None)
    return {
        "Test_Case": test_case_label,
        "n_tokens_prompt": getattr(response, "n_tokens_prompt", None),
        "n_tokens_response": getattr(response, "n_tokens_response", None),
        "time": round((getattr(response, "time", None) or 0) / NANOSECONDS_IN_SECOND, 6),
        "time_load": round((getattr(response, "load_duration", 0) or 0) / NANOSECONDS_IN_SECOND, 6),
        "time_generation": round((getattr(response, "eval_duration", 0) or 0) / NANOSECONDS_IN_SECOND, 6),
        "num_ctx": getattr(response, "num_ctx", 0),
        "context_used": prompt_tokens + response_tokens,
        "context_available": context_available,
        "thinking_chars": thinking_chars,
        "reasoning": "off" if thinking_chars == 0 else "on",
        "gpu_cpu": f"{gpu_percent}% gpu" if gpu_percent is not None else "n/d",
        "errore_formattazione": "si" if errore_formattazione else "no",
        "Required human fix": "yes" if errore_formattazione else "no",
    }


def write_report(report_path: str, rows: List[Dict[str, Any]]) -> None:
    """Write the report of the use case, replacing the previous version."""
    Path(report_path).parent.mkdir(parents=True, exist_ok=True)
    workbook = Workbook()
    worksheet = workbook.active
    worksheet.append(COLUMNS)
    for row in rows:
        worksheet.append([row.get(column) for column in COLUMNS])
    workbook.save(report_path)
