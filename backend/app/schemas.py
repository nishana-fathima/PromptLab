from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator


DIMENSION_LIMITS = {
    "clarity": 15,
    "specificity": 15,
    "context": 20,
    "completeness": 20,
    "constraints": 15,
    "expected_output": 15,
}
RUBRIC_VERSION = "1.0"


class AnalysisRequest(BaseModel):
    prompt: str = Field(min_length=10, max_length=100_000)

    @field_validator("prompt")
    @classmethod
    def prompt_not_blank(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("Prompt must not be blank")
        return value.strip()


class DimensionScore(BaseModel):
    name: Literal[
        "clarity",
        "specificity",
        "context",
        "completeness",
        "constraints",
        "expected_output",
    ]
    score: int = Field(ge=0)
    max_score: int = Field(ge=0)
    assessment: str = Field(min_length=1)


class Recommendation(BaseModel):
    recommendation: str = Field(min_length=1)
    reason: str = Field(min_length=1)


class Weakness(BaseModel):
    description: str = Field(min_length=1)
    severity: Literal["high", "medium", "low"] | None = None


class EvaluationResult(BaseModel):
    improved_prompt: str = Field(min_length=1)
    dimensions: list[DimensionScore] = Field(min_length=6, max_length=6)
    weaknesses: list[str | Weakness]
    missing_requirements: list[str]
    recommendations: list[Recommendation]


class AnalysisResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    original_prompt: str
    improved_prompt: str
    total_score: int
    score_interpretation: str
    dimensions: list[DimensionScore]
    weaknesses: list[str | Weakness]
    missing_requirements: list[str]
    recommendations: list[Recommendation]
    rubric_version: str
    model_name: str
    created_at: datetime


class AnalysisListItem(BaseModel):
    id: int
    original_prompt_preview: str
    total_score: int
    score_interpretation: str
    created_at: datetime


class AnalysisListResponse(BaseModel):
    items: list[AnalysisListItem]
    total: int
    limit: int
    offset: int


class ErrorDetail(BaseModel):
    code: str
    message: str


class ErrorResponse(BaseModel):
    error: ErrorDetail
