# Architecture

## Phase 4 integrated application

The project is split into two independently runnable applications:

```text
React/Vite frontend --HTTP/JSON--> FastAPI backend --SQLAlchemy--> SQLite
                                          |
                                           +--> OpenAI structured evaluation
```

The frontend owns presentation, routing, browser-safe configuration, and API calls. The backend owns configuration, database sessions, validation, error handling, and all provider credentials.

## Frontend boundaries

- `pages/` contains route-level views.
- `components/` contains reusable UI and layout components.
- `services/` contains HTTP clients.
- `hooks/` contains stateful browser behavior.
- `types/` contains shared frontend types.
- `utils/` contains small pure helpers.

## Backend boundaries

- `api/` contains HTTP route modules.
- `database.py` contains engine, session factory, and dependency wiring.
- `models.py` contains SQLAlchemy models.
- `schemas.py` contains Pydantic contracts.
- `services/` contains domain and provider behavior.
- `main.py` initializes FastAPI, middleware, error handling, and database tables.

## Frontend analysis flow

The `/analyze` route keeps prompt input, request status, validated analysis, and errors in local React state. `services/analysisService.ts` is the frontend boundary for `POST /api/v1/analyses`; it validates dimension names, maximum scores, score ranges, total-score consistency, and required response fields before the UI renders results.

The analyzer intentionally displays the backend's current weakness contract, which is a list of strings. It does not invent titles or severity levels; missing severity is shown as an evaluator note. Recommendations are normalized from the existing `recommendation` and `reason` fields without adding AI-generated content.

## Current API

- `GET /api/health` returns service status.
- `POST /api/v1/analyses` evaluates and persists a prompt.
- `GET /api/v1/analyses` returns newest-first paginated history.
- `GET /api/v1/analyses/{id}` returns one persisted analysis.

The history list includes `score_interpretation` as an additive response field. Existing persisted analysis records remain compatible because no database column or serialized weakness shape was changed.

## Reliability decisions

- Alembic owns deployed schema initialization and upgrades. The initial revision safely verifies and baselines an existing `analyses` table instead of recreating it.
- Weaknesses remain JSON data. Legacy string entries and new `{description, severity}` objects are both accepted; legacy entries retain an unset severity.
- Idempotency keys are not implemented in this phase. The current frontend prevents concurrent duplicate submissions, and there is no existing client retry-key contract. A future retry-safe API should add a persisted request key and payload fingerprint together rather than deduplicating by prompt text.
- OpenAI access remains backend-only and uses a bounded timeout.

## Deferred decisions

OpenAI invocation remains backend-owned and uses a configured request timeout. Authentication, deployment, and richer weakness severity metadata remain deferred.

## Observability

FastAPI middleware generates or validates an `X-Request-ID`, returns it in the response, and emits compact JSON request events containing only method, path, status, duration, and an error category. Request bodies, API keys, and provider responses are excluded.

## Phase 6 verification boundary

The backend virtual environment is the source of truth for Python verification. Alembic is tested against temporary SQLite files, while API tests override the database and evaluator dependencies. Live OpenAI requests are opt-in and skipped when the backend key is absent.
