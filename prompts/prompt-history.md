# Development Prompt History

## Phase 1: Requirements and architecture

- Objective: Analyze PromptLab requirements, define MVP scope, design architecture, database schema, API endpoints, rubric, risks, and phased plan.
- Prompt reference: Initial PromptLab planning request from the project owner.
- Decisions: Use a React/Vite frontend, FastAPI backend, SQLite persistence, structured AI responses, and a six-dimension 100-point heuristic rubric. Keep the MVP small enough for one day.
- Validation outcome: Planning output was produced and used as the baseline for Phase 2. No application code was requested in that phase.

## Phase 2: Full-stack foundation

- Objective: Set up a runnable React/Vite/Tailwind frontend shell, FastAPI backend foundation, documentation, and OpenCode agent/skill definitions without implementing the full analyzer.
- Prompt reference: Phase 2 foundation implementation request from the project owner.
- Decisions: Preserve the existing backend modules, add `/api/health`, use `FRONTEND_ORIGINS` for explicit CORS configuration, keep OpenAI credentials server-side, and create placeholder routes for `/`, `/analyze`, and `/history`.
- Validation outcome: Frontend dependencies installed with `npm install`, frontend production build passed with `npm run build`, and backend syntax passed with `python3 -m compileall app tests`. Backend runtime tests and health verification were not executable because this environment has no `pip`, `uv`, FastAPI, SQLAlchemy, or pytest installation. `opencode --version` reported `1.15.10`; the agent and skill use the supported project-local `.opencode/agent` and `.opencode/skills/<name>/SKILL.md` conventions.

## Phase 3: Professional prompt analyzer interface

- Objective: Implement the `/analyze` frontend workspace with prompt editing, API submission, validated results, score visualization, weaknesses, recommendations, and original/improved prompt comparison.
- Prompt reference: Phase 3 professional prompt analyzer implementation request from the project owner.
- Decisions: Use local React state and an abortable request lifecycle. Keep API parsing in `services/analysisService.ts`. Consume the existing `POST /api/v1/analyses` contract without changing backend business logic or inventing AI results. Because the current backend returns weaknesses as strings and does not return severity, render a neutral evaluator-note indicator rather than fabricate severity.
- Validation outcome: `npm run build` passed after fixing TypeScript response-boundary types. `npm audit --audit-level=high` reported zero vulnerabilities. Frontend dev server startup passed. No automated frontend test runner or lint script exists in the current project, and real analysis was not claimed because backend runtime dependencies are unavailable in this environment.

## Phase 4: Backend integration, history, detail views, and testing

- Objective: Integrate the analyzer with the persisted analysis API, implement history and detail views, add backend timeout/error handling, and establish frontend/backend automated coverage.
- Prompt reference: Phase 4 backend integration and history implementation request from the project owner.
- Decisions: Preserve `/api/v1/analyses` and add only the additive `score_interpretation` field to history items. Reuse persisted detail responses rather than re-running analysis. Keep weakness severity absent because the existing stored schema does not provide it; the frontend does not infer severity.
- Validation outcome: Frontend `npm test` passed with 9 tests, `npm run build` passed, and `npm audit --audit-level=moderate` reported zero vulnerabilities. Backend `python3 -m compileall app tests` passed. Backend pytest and live endpoint verification remain blocked because this environment has no `pip`, `uv`, or installed Python dependencies. Live OpenAI analysis was not claimed.

## Phase 5: Production hardening and reliability

- Objective: Harden environment validation, OpenAI timeout/error handling, database migrations, severity compatibility, frontend quality tooling, automated tests, and deployment configuration without breaking existing contracts.
- Prompt reference: Phase 5 production hardening request from the project owner.
- Decisions: Add a non-destructive Alembic baseline, keep weakness severity optional inside existing JSON, do not infer legacy severity, and defer idempotency keys because the current client has no retry-key contract and already prevents concurrent submissions. Add Docker files with a persistent SQLite volume and controlled startup migration.
- Problems and fixes: The project has no Git metadata, Python package installer, or Docker executable. Frontend linting required a stable hook dependency fix in `HistoryPage`; the test dependency tree was upgraded to a vulnerability-free Vitest release.
- Validation outcome: Frontend typecheck, ESLint, 15 Vitest tests, production build, and dependency audit passed. Backend compileall passed. Backend pytest, Alembic runtime upgrade tests, FastAPI startup, live endpoint checks, and Docker build remain unexecuted because required tools are unavailable. No live OpenAI request was made.

## Phase 6: Backend verification, live AI testing, and integration reliability

- Objective: Resolve Python tooling blockers, run backend/API/migration verification, add safe request observability, and conditionally verify live OpenAI behavior.
- Prompt reference: Phase 6 backend verification request from the project owner.
- Implementation: Completed the existing project virtual environment without sudo using locally extracted distro tooling, installed backend requirements, added request-ID JSON middleware, categorized provider timeout/authentication/rate-limit errors, and retained the no-idempotency-key decision.
- Automated verification: Backend imports passed; `backend/.venv/bin/pytest -q` passed 11 tests; new database Alembic upgrade and read/write checks passed; existing-schema baseline preserved existing data; local health/history API checks passed; CORS and request ID behavior passed.
- Live provider result: Skipped because `OPENAI_API_KEY` is not configured. No API key or prompt content was logged.
- Remaining limitation: Docker is not installed. Pytest emitted one Starlette deprecation warning about the current `httpx` TestClient integration; it did not fail the suite.

## Frontend-only presentation demo

- Objective: Remove the frontend's runtime dependency on FastAPI, OpenAI, SQLite, Docker, and backend environment variables so PromptLab works independently for a presentation.
- Prompt reference: Urgent frontend-only demo conversion request from the project owner.
- Implementation: Added `services/localPromptAnalyzer.ts` with deterministic six-criterion scoring, conditional weakness/recommendation templates, three selectable examples, and placeholder-based improved prompts. Added `services/localAnalysisHistory.ts` using safe, capped localStorage persistence. Rewired analyzer, history, detail, and dashboard flows to local services and removed obsolete frontend Axios/API client usage.
- Decisions: Keep backend files untouched for future integration. Use local model metadata (`local-rule-engine`) and rubric version (`local-1.0`) to make demo output transparent. Preserve legacy result components and visual layout.
- Validation outcome: `npm run lint`, `npm run typecheck`, `npm test -- --run`, and `npm run build` all passed. Seven Vitest files and 15 tests passed. A prior detail-page test failed because a mounted MemoryRouter does not replace its initial route; the test was isolated with unmount/remount and passed on the final run. No external API requests are made by the frontend flow.

## MCP architecture and integration

- Objective: Implement functional MCP tools and demonstrate PromptLab integration with an AI host.
- Prompt reference: MCP Architecture & Integration implementation request from the project owner.
- Decisions: Use the official Python MCP SDK with stdio transport, keep MCP separate from FastAPI, reuse existing evaluation/database services, and expose analysis plus rubric/history tools without exposing provider credentials.
- Validation outcome: Frontend lint, typecheck, 15 tests, and production build passed; backend pytest passed with the MCP test skipped because the environment has no `mcp` package or pip installer. Python compileall and diff checks passed. MCP protocol execution remains pending dependency installation.
## OpenCode implementation — Full-stack AI application

- Audit: the repository contained a React/Vite demo, localStorage analysis history, and a separate FastAPI/SQLite backend. No authentication or prompt-management domain existed.
- Implementation: added `backend-node/` with Express, TypeScript, MongoDB/Mongoose models, HTTP-only JWT authentication, prompt CRUD, immutable versions, AI execution/improvement, quota enforcement, execution history, comparison, and dashboard endpoints. Added frontend API/auth/query integration while preserving the existing UI structure.
- Validation: pending frontend and backend TypeScript/build verification.
## Gemini provider integration

- Replaced the Node backend's OpenAI-only call path with the official `@google/genai` SDK.
- Added server-only `GEMINI_API_KEY` and `GEMINI_MODEL` configuration, defaulting to `gemini-2.5-flash`.
- Added validated structured `/api/v1/ai/analyze` output, Gemini provider error mapping, AI request rate limiting, and per-user daily quotas.
- The Analyze Prompt frontend now consumes Gemini analysis directly; no local scoring is used for submitted analysis.
- Validation: pending build and automated checks; live Gemini verification requires a configured key and MongoDB.
## Gemini configuration diagnostic

- Confirmed `backend-node/src/config.ts` loads `backend-node/.env` before provider initialization.
- Confirmed `AI_PROVIDER` defaults to and validates as `gemini`; `GEMINI_MODEL` defaults to `gemini-2.5-flash`.
- Added a safe `aiConfigured` health field and startup log that expose only configuration status, never the key.
- The workspace has no `backend-node/.env`, so live Analyze verification remains blocked until `GEMINI_API_KEY` is added there.
- Validation: backend build passed; configuration status checks passed with and without a test environment key.
## Gemini model availability fix

- Queried the configured API project with the official `@google/genai` model-list API.
- Confirmed `gemini-2.5-flash-lite` returns a real 404 for this key because it is unavailable to new users, while `gemini-3.1-flash-lite` supports `generateContent` and structured JSON.
- Updated the backend default and local backend environment to `gemini-3.1-flash-lite`.
- Added safe provider logging and distinct authentication, permission, model, quota, and temporary-provider-busy errors.
- Real structured analysis succeeded with six dimensions, an improved prompt, and token usage metadata.
## Cleanup

- Removed the unused OpenAI dependency from `backend-node`; Gemini is now the only active Node AI provider.
- Retained local analyzer/history modules because they are still referenced by tests, history views, and demo examples; removed the obsolete Python backend and its Docker/architecture files.
- Retained generated build and dependency directories as ignored local artifacts rather than deleting user workspace caches.
