# Context Management

PromptLab uses repository documents as durable context so implementation prompts remain small and consistent.

## Durable context

- `AGENTS.md` contains project-wide coding and validation rules.
- `docs/architecture.md` records boundaries and deferred decisions.
- `docs/evaluation-rubric.md` is the source of truth for prompt scoring.
- `prompts/prompt-history.md` records development objectives and outcomes.

## Incremental work

Each phase should implement one vertical slice, run focused validation, and document the result before the next phase. Avoid asking an agent to rebuild the entire project in one request.

## Compaction technique

Before compacting a long development session, preserve:

- Files changed and files intentionally untouched.
- API contracts and schema versions.
- Decisions that were made and alternatives rejected.
- Commands run and their actual results.
- Remaining blockers and the next concrete task.

After compaction, re-read `AGENTS.md`, the architecture document, and the current phase entry in the prompt history before editing.

## Phase 5 handoff

The current production-hardening boundary is documented in `docs/context-handoff.md`. It records migration safety, the legacy/new weakness JSON contract, the idempotency decision, and environment validation blockers so future sessions do not repeat repository inspection.

Phase 6 verification results belong in `prompts/prompt-history.md` with the exact command outcome. Do not summarize a blocked live provider or Docker check as a pass.
