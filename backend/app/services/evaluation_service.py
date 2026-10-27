from collections.abc import Callable

from sqlalchemy.orm import Session

from ..models import Analysis
from ..schemas import EvaluationResult, RUBRIC_VERSION
from .scoring import score_interpretation, validate_and_total_dimensions


Evaluator = Callable[[str], tuple[EvaluationResult, str]]


def create_analysis(db: Session, prompt: str, evaluator: Evaluator) -> Analysis:
    result, model_name = evaluator(prompt)
    total_score = validate_and_total_dimensions(result.dimensions)
    analysis = Analysis(
        original_prompt=prompt,
        improved_prompt=result.improved_prompt,
        total_score=total_score,
        dimensions=[dimension.model_dump() for dimension in result.dimensions],
        weaknesses=[weakness.model_dump() if hasattr(weakness, "model_dump") else weakness for weakness in result.weaknesses],
        missing_requirements=result.missing_requirements,
        recommendations=[recommendation.model_dump() for recommendation in result.recommendations],
        model_name=model_name,
        rubric_version=RUBRIC_VERSION,
    )
    db.add(analysis)
    db.commit()
    db.refresh(analysis)
    return analysis


def analysis_to_response(analysis: Analysis) -> dict:
    return {
        "id": analysis.id,
        "original_prompt": analysis.original_prompt,
        "improved_prompt": analysis.improved_prompt,
        "total_score": analysis.total_score,
        "score_interpretation": score_interpretation(analysis.total_score),
        "dimensions": analysis.dimensions,
        "weaknesses": analysis.weaknesses,
        "missing_requirements": analysis.missing_requirements,
        "recommendations": analysis.recommendations,
        "rubric_version": analysis.rubric_version,
        "model_name": analysis.model_name,
        "created_at": analysis.created_at,
    }
