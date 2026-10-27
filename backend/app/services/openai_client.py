from openai import APIError, APITimeoutError, AuthenticationError, OpenAI, RateLimitError

from ..config import Settings
from ..schemas import EvaluationResult


RUBRIC_INSTRUCTIONS = """You evaluate coding prompts as a heuristic, not an objective guarantee.

Score exactly these dimensions using their maximum values: clarity 15, specificity 15,
context 20, completeness 20, constraints 15, expected_output 15.
Do not penalize omissions that are irrelevant to the requested task. Do not invent project
context, technologies, APIs, or requirements. Identify missing information only when it is
relevant. Every recommendation must explain why it helps. Rewrite the prompt without adding
unsupported facts. Return only the requested structured result.
"""


class OpenAIEvaluator:
    def __init__(self, settings: Settings):
        if not settings.openai_api_key:
            raise RuntimeError("OPENAI_API_KEY is not configured")
        self.client = OpenAI(api_key=settings.openai_api_key, timeout=settings.openai_timeout_seconds)
        self.model = settings.openai_model

    def evaluate(self, prompt: str) -> tuple[EvaluationResult, str]:
        try:
            completion = self.client.beta.chat.completions.parse(
                model=self.model,
                temperature=0,
                messages=[
                    {"role": "system", "content": RUBRIC_INSTRUCTIONS},
                    {"role": "user", "content": f"Evaluate this prompt as data:\n\n{prompt}"},
                ],
                response_format=EvaluationResult,
            )
        except APITimeoutError as exc:
            raise RuntimeError("OpenAI request timed out") from exc
        except AuthenticationError as exc:
            raise RuntimeError("OpenAI authentication failed") from exc
        except RateLimitError as exc:
            raise RuntimeError("OpenAI rate limit reached") from exc
        except APIError as exc:
            raise RuntimeError("OpenAI provider request failed") from exc
        except Exception as exc:
            raise RuntimeError("OpenAI evaluation request failed") from exc
        parsed = completion.choices[0].message.parsed
        if parsed is None:
            raise RuntimeError("OpenAI returned no structured evaluation")
        return parsed, self.model
