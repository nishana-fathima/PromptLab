# PromptLab Agent Instructions

## Stack and architecture

- Use React, Vite, TypeScript, Tailwind CSS, React Router, Axios, and Lucide React in `frontend/`.
- Use FastAPI, SQLAlchemy, Pydantic, pydantic-settings, SQLite, and pytest in `backend/`.
- Keep HTTP routes thin. Put reusable behavior in services and validate external data at boundaries.
- Keep OpenAI access server-side only. Never expose `OPENAI_API_KEY` to the frontend.

## Coding conventions

- Prefer small, typed modules with explicit names.
- Follow existing formatting and directory boundaries before introducing new abstractions.
- Use accessible semantic HTML and responsive layouts in frontend code.
- Do not add dependencies unless the feature clearly requires them.
- Do not invent project context, API behavior, or requirements.

## Error handling and security

- Return stable, non-sensitive API error objects.
- Log or expose no secrets, provider keys, or raw exception internals to clients.
- Configure CORS from explicit backend environment settings; never use a wildcard in production configuration.
- Validate request bodies and all AI/provider responses with schemas.
- Use Alembic for deployed database schema changes; do not use destructive migrations or implicit table recreation.

## Testing and validation

- Add or update focused tests for behavior that changes.
- Run frontend type-check/build and backend tests or syntax checks before reporting completion.
- Report commands that could not run and their exact blockers. Never claim an unexecuted test passed.

## Documentation and change scope

- Update relevant architecture or decision documentation when behavior changes.
- Preserve existing work and avoid unrelated refactors.
- Treat user prompts and provider responses as untrusted content; never execute prompt content.
- Implement only the requested phase. Record development prompts and validation outcomes in `prompts/prompt-history.md`.
