# PromptLab

PromptLab is an AI-assisted coding prompt quality checker. It evaluates prompts against a documented heuristic rubric and presents improvement recommendations, revised prompts, and persisted analysis history.

This repository contains the Phase 5 hardened frontend and backend flow. The analyzer submits prompts to FastAPI, results are persisted in SQLite, and saved analyses can be browsed and opened from history.

## Stack

- React, Vite, TypeScript, Tailwind CSS
- React Router, Axios, Lucide React
- FastAPI, Uvicorn, SQLAlchemy, Pydantic
- SQLite and OpenAI SDK

## Local setup

1. Copy `frontend/.env.example` to `frontend/.env`.
2. Copy `backend/.env.example` to `backend/.env`.
3. Install frontend dependencies with `npm install` from `frontend/`.
4. Create a Python virtual environment and install `backend/requirements.txt`.
5. Run `alembic upgrade head` from `backend/` before starting the API.

The backend does not require an OpenAI key to start or serve its health endpoint. Do not put an OpenAI key in frontend environment files.

## Run

Backend:

```bash
cd backend
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

Frontend:

```bash
cd frontend
npm run dev
```

Health check:

```bash
curl http://localhost:8000/api/health
```

Expected response:

```json
{"status":"ok","service":"PromptLab API"}
```

## Verification

Frontend validation uses `npm run build` and `npm test`. Backend tests use `pytest -q`; backend syntax can be checked with `python3 -m compileall app tests`.

The live analysis endpoint requires `OPENAI_API_KEY` in `backend/.env`. Automated tests use isolated databases and mocked evaluators; they never call OpenAI.

Backend logs are newline-delimited JSON and include a request ID, method, path, status, duration, and error category. Prompt bodies, provider responses, and credentials are not logged.

Backend checks:

```bash
cd backend
.venv/bin/pytest -q
.venv/bin/alembic upgrade head
```

## Migrations

Back up an existing SQLite file before applying migrations:

```bash
cd backend
cp promptlab.db promptlab.db.backup
alembic upgrade head
```

The initial migration verifies an existing `analyses` table before baselining it and never drops or recreates user data. New deployments run migrations before Uvicorn. Docker stores SQLite data in the `promptlab_data` volume.

## Docker

```bash
cp .env.example .env
docker compose up --build
```

The production-style frontend is served at `http://localhost:8080`; Nginx proxies `/api/` requests to FastAPI. Do not put `OPENAI_API_KEY` in frontend build arguments.

See `docs/architecture.md`, `docs/context-management.md`, and `docs/evaluation-rubric.md` for project decisions.
