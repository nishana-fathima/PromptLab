import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.api.analyses import get_evaluator
from app.database import Base, get_db
from app.main import app
from app.schemas import EvaluationResult


class FakeEvaluator:
    def evaluate(self, prompt: str) -> tuple[EvaluationResult, str]:
        return EvaluationResult.model_validate(
            {
                "improved_prompt": f"Improve this coding task with explicit acceptance criteria: {prompt}",
                "dimensions": [
                    {"name": "clarity", "score": 10, "max_score": 15, "assessment": "Clear enough."},
                    {"name": "specificity", "score": 8, "max_score": 15, "assessment": "Some details exist."},
                    {"name": "context", "score": 6, "max_score": 20, "assessment": "Context is limited."},
                    {"name": "completeness", "score": 8, "max_score": 20, "assessment": "Several details are absent."},
                    {"name": "constraints", "score": 5, "max_score": 15, "assessment": "Constraints are limited."},
                    {"name": "expected_output", "score": 7, "max_score": 15, "assessment": "Output is partly implied."},
                ],
                "weaknesses": ["Acceptance criteria are not explicit."],
                "missing_requirements": ["Testing requirements"],
                "recommendations": [
                    {"recommendation": "Add acceptance criteria.", "reason": "They make completion verifiable."}
                ],
            }
        ), "fake-model"


class FailingEvaluator:
    def evaluate(self, prompt: str) -> tuple[EvaluationResult, str]:
        raise RuntimeError("provider unavailable")


class MalformedEvaluator:
    def evaluate(self, prompt: str) -> tuple[EvaluationResult, str]:
        result, model = FakeEvaluator().evaluate(prompt)
        result.dimensions[0].max_score = 20
        return result, model


class SeverityEvaluator:
    def evaluate(self, prompt: str) -> tuple[EvaluationResult, str]:
        result, model = FakeEvaluator().evaluate(prompt)
        result.weaknesses = [{"description": "The output format is underspecified.", "severity": "high"}]
        return result, model


@pytest.fixture
def client(tmp_path):
    engine = create_engine(
        f"sqlite:///{tmp_path / 'test.db'}",
        connect_args={"check_same_thread": False},
    )
    TestingSession = sessionmaker(bind=engine, autoflush=False, autocommit=False)
    Base.metadata.create_all(bind=engine)

    def override_db():
        db = TestingSession()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_db
    app.dependency_overrides[get_evaluator] = lambda: FakeEvaluator()
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()


def test_health(client):
    response = client.get("/api/health", headers={"X-Request-ID": "test-request"})
    assert response.json() == {
        "status": "ok",
        "service": "PromptLab API",
    }
    assert response.headers["X-Request-ID"] == "test-request"


def test_create_get_and_list_analysis(client):
    created = client.post("/api/v1/analyses", json={"prompt": "Build a login form in React."})
    assert created.status_code == 201
    body = created.json()
    assert body["total_score"] == 44
    assert body["model_name"] == "fake-model"
    assert body["score_interpretation"] == "Needs clarification"

    fetched = client.get(f"/api/v1/analyses/{body['id']}")
    assert fetched.status_code == 200
    assert fetched.json()["original_prompt"] == "Build a login form in React."

    listed = client.get("/api/v1/analyses?limit=10")
    assert listed.status_code == 200
    assert listed.json()["total"] == 1
    assert len(listed.json()["items"]) == 1
    assert listed.json()["items"][0]["score_interpretation"] == "Needs clarification"


def test_rejects_short_prompt(client):
    response = client.post("/api/v1/analyses", json={"prompt": "short"})
    assert response.status_code == 422


def test_missing_analysis(client):
    response = client.get("/api/v1/analyses/999")
    assert response.status_code == 404
    assert response.json() == {
        "error": {"code": "ANALYSIS_NOT_FOUND", "message": "Analysis not found"}
    }


def test_rejects_blank_prompt(client):
    response = client.post("/api/v1/analyses", json={"prompt": "   "})
    assert response.status_code == 422


def test_rejects_prompt_above_configured_limit(client):
    response = client.post("/api/v1/analyses", json={"prompt": "x" * 20_001})
    assert response.status_code == 422
    assert response.json() == {
        "error": {"code": "PROMPT_TOO_LONG", "message": "Prompt must be no more than 20000 characters."}
    }


def test_provider_failure_returns_safe_error(client):
    client.app.dependency_overrides[get_evaluator] = lambda: FailingEvaluator()
    response = client.post("/api/v1/analyses", json={"prompt": "Build a useful API endpoint."})
    assert response.status_code == 503
    assert response.json() == {
        "error": {"code": "AI_PROVIDER_ERROR", "message": "provider unavailable"}
    }


def test_malformed_evaluation_is_not_persisted(client):
    client.app.dependency_overrides[get_evaluator] = lambda: MalformedEvaluator()
    response = client.post("/api/v1/analyses", json={"prompt": "Build a useful API endpoint."})
    assert response.status_code == 502
    assert response.json()["error"]["code"] == "AI_RESPONSE_INVALID"
    assert client.get("/api/v1/analyses").json()["total"] == 0


def test_severity_metadata_is_persisted_without_breaking_legacy_shape(client):
    client.app.dependency_overrides[get_evaluator] = lambda: SeverityEvaluator()
    response = client.post("/api/v1/analyses", json={"prompt": "Build a useful API endpoint."})
    assert response.status_code == 201
    assert response.json()["weaknesses"] == [
        {"description": "The output format is underspecified.", "severity": "high"}
    ]
