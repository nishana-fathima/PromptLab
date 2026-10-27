from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from ..config import get_settings
from ..database import get_db
from ..models import Analysis
from ..schemas import (
    AnalysisListItem,
    AnalysisListResponse,
    AnalysisRequest,
    AnalysisResponse,
)
from ..services.evaluation_service import analysis_to_response, create_analysis
from ..services.openai_client import OpenAIEvaluator

router = APIRouter(prefix="/api/v1/analyses", tags=["analyses"])


def get_evaluator() -> OpenAIEvaluator:
    try:
        return OpenAIEvaluator(get_settings())
    except RuntimeError as exc:
        raise HTTPException(
            status_code=503,
            detail={"code": "AI_PROVIDER_ERROR", "message": str(exc)},
        ) from exc


@router.post("", response_model=AnalysisResponse, status_code=status.HTTP_201_CREATED)
def create_analysis_endpoint(
    request: AnalysisRequest,
    db: Session = Depends(get_db),
    evaluator: OpenAIEvaluator = Depends(get_evaluator),
) -> dict:
    if len(request.prompt) > get_settings().max_prompt_length:
        raise HTTPException(
            status_code=422,
            detail={
                "code": "PROMPT_TOO_LONG",
                "message": f"Prompt must be no more than {get_settings().max_prompt_length} characters.",
            },
        )
    try:
        analysis = create_analysis(db, request.prompt, evaluator.evaluate)
    except ValueError as exc:
        raise HTTPException(status_code=502, detail={"code": "AI_RESPONSE_INVALID", "message": str(exc)}) from exc
    except RuntimeError as exc:
        raise HTTPException(status_code=503, detail={"code": "AI_PROVIDER_ERROR", "message": str(exc)}) from exc
    return analysis_to_response(analysis)


@router.get("", response_model=AnalysisListResponse)
def list_analyses(
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: Session = Depends(get_db),
) -> dict:
    total = db.scalar(select(func.count()).select_from(Analysis)) or 0
    analyses = db.scalars(
        select(Analysis).order_by(Analysis.created_at.desc()).offset(offset).limit(limit)
    ).all()
    return {
        "items": [
            AnalysisListItem(
                id=analysis.id,
                original_prompt_preview=analysis.original_prompt[:160],
                total_score=analysis.total_score,
                score_interpretation=analysis_to_response(analysis)["score_interpretation"],
                created_at=analysis.created_at,
            )
            for analysis in analyses
        ],
        "total": total,
        "limit": limit,
        "offset": offset,
    }


@router.get("/{analysis_id}", response_model=AnalysisResponse)
def get_analysis(analysis_id: int, db: Session = Depends(get_db)) -> dict:
    analysis = db.get(Analysis, analysis_id)
    if analysis is None:
        raise HTTPException(status_code=404, detail={"code": "ANALYSIS_NOT_FOUND", "message": "Analysis not found"})
    return analysis_to_response(analysis)
