"""PromptLab MCP server for AI hosts.

The server deliberately uses stdio transport. MCP hosts launch this module as a
child process, so credentials stay in the backend environment and never reach
the host or frontend.
"""

from collections.abc import Iterator

from mcp.server.fastmcp import FastMCP
from sqlalchemy import func, select

from .config import get_settings
from .database import SessionLocal
from .models import Analysis
from .schemas import AnalysisRequest
from .services.evaluation_service import analysis_to_response, create_analysis
from .services.openai_client import OpenAIEvaluator


mcp = FastMCP("PromptLab")


def _json_analysis(analysis: Analysis) -> dict:
    result = analysis_to_response(analysis)
    result["created_at"] = analysis.created_at.isoformat()
    return result


def _database_session() -> Iterator:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@mcp.tool()
def analyze_prompt(prompt: str) -> dict:
    """Evaluate and persist a coding prompt using PromptLab's rubric."""
    request = AnalysisRequest.model_validate({"prompt": prompt})
    settings = get_settings()
    if len(request.prompt) > settings.max_prompt_length:
        raise ValueError(f"Prompt must be no more than {settings.max_prompt_length} characters.")

    try:
        evaluator = OpenAIEvaluator(settings)
        with SessionLocal() as db:
            analysis = create_analysis(db, request.prompt, evaluator.evaluate)
            return _json_analysis(analysis)
    except ValueError:
        raise
    except RuntimeError as exc:
        raise RuntimeError(str(exc)) from exc


@mcp.tool()
def list_analyses(limit: int = 20, offset: int = 0) -> dict:
    """List saved prompt analyses, newest first."""
    if not 1 <= limit <= 100:
        raise ValueError("limit must be between 1 and 100")
    if offset < 0:
        raise ValueError("offset must be non-negative")

    with SessionLocal() as db:
        total = db.scalar(select(func.count()).select_from(Analysis)) or 0
        analyses = db.scalars(
            select(Analysis).order_by(Analysis.created_at.desc()).offset(offset).limit(limit)
        ).all()
        items = []
        for analysis in analyses:
            items.append(
                {
                    "id": analysis.id,
                    "original_prompt_preview": analysis.original_prompt[:160],
                    "total_score": analysis.total_score,
                    "score_interpretation": analysis_to_response(analysis)["score_interpretation"],
                    "created_at": analysis.created_at.isoformat(),
                }
            )
        return {"items": items, "total": total, "limit": limit, "offset": offset}


@mcp.tool()
def get_analysis(analysis_id: int) -> dict:
    """Retrieve one saved prompt analysis by its numeric ID."""
    with SessionLocal() as db:
        analysis = db.get(Analysis, analysis_id)
        if analysis is None:
            raise ValueError("Analysis not found")
        return _json_analysis(analysis)


@mcp.tool()
def get_rubric() -> dict:
    """Describe the six PromptLab scoring dimensions and their maximum scores."""
    return {
        "rubric_version": "1.0",
        "dimensions": [
            {"name": "clarity", "max_score": 15},
            {"name": "specificity", "max_score": 15},
            {"name": "context", "max_score": 20},
            {"name": "completeness", "max_score": 20},
            {"name": "constraints", "max_score": 15},
            {"name": "expected_output", "max_score": 15},
        ],
        "total_possible": 100,
        "guidance": "Score only relevant information; do not invent missing project context.",
    }


if __name__ == "__main__":
    mcp.run()
