# PromptLab

PromptLab is an AI-assisted coding prompt quality checker. It evaluates prompts against a documented heuristic rubric and presents improvement recommendations, revised prompts, and persisted analysis history.

This repository contains a presentation-ready frontend-only demo. Prompt analysis uses deterministic local TypeScript rules, and saved analyses use browser `localStorage`. The backend remains in the repository for future integration but is not required to run the demo.

## Stack

- React, Vite, TypeScript, Tailwind CSS
- React Router, Lucide React
- FastAPI, Uvicorn, SQLAlchemy, Pydantic (future backend integration)
- SQLite and OpenAI SDK (future backend integration)

## Frontend-only setup

```bash
cd frontend
npm install
npm run dev
```

No API key, Python environment, SQLite database, Docker, or `.env` file is required. The frontend does not call FastAPI or any external service.

## Run

```bash
cd frontend
npm run dev
```

Open `http://localhost:5173` in a browser.

## Verification

Frontend validation uses:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The backend remains separately testable for future integration, but is not part of the demo startup path.

## Demo Mode

The analyzer displays `Demo Mode — Local Rule-Based Analysis`. It evaluates prompts using local scoring rules and predefined improvement templates. No external AI API is used.

The local rubric is:

| Criterion | Maximum |
| --- | ---: |
| Clarity | 20 |
| Specificity | 20 |
| Context | 15 |
| Completeness | 20 |
| Constraints | 15 |
| Expected output | 10 |
| **Total** | **100** |

Scores are based on capped, explainable signals such as a concrete action, named technology, requested behavior, relevant context, quality constraints, and explicit deliverables. Keyword presence alone does not produce a high score. Missing irrelevant details are not penalized.

Improved prompts are labeled `Template-based improved prompt` and use placeholders for decisions that were not provided.

## Local History

Completed analyses are stored under a versioned localStorage key and limited to 50 records. Invalid stored JSON is safely discarded. History survives browser refresh and can be cleared from the History page with confirmation.

## Backend migrations

Back up an existing SQLite file before applying migrations:

```bash
cd backend
cp promptlab.db promptlab.db.backup
alembic upgrade head
```

The backend migration verifies an existing `analyses` table before baselining it and never drops or recreates user data. These commands are not required for the frontend-only demo.

## Backend Docker configuration

```bash
cp .env.example .env
docker compose up --build
```

The backend and production frontend container configuration is retained for future integration. It is not required for the demo. Never put `OPENAI_API_KEY` in frontend build arguments.

See `docs/architecture.md`, `docs/context-management.md`, and `docs/evaluation-rubric.md` for project decisions.
