# PromptLab

PromptLab is an AI-assisted coding prompt quality checker. It evaluates prompts against a documented heuristic rubric and presents improvement recommendations, revised prompts, and persisted analysis history.

This repository contains the PromptLab React frontend and the production-oriented Express/MongoDB API in `backend-node/`.

## Stack

- React, Vite, TypeScript, Tailwind CSS
- React Router, Lucide React
- Express, MongoDB, Mongoose, JWT cookies, and Zod (`backend-node/`)
- Google Gemini via the official `@google/genai` SDK

## Full-stack setup

```bash
cd backend-node
npm install
cp .env.example .env
npm run dev

# In a second terminal
cd frontend
npm install
npm run dev
```

Start MongoDB locally or set `MONGODB_URI` to a reachable MongoDB instance. Set `GEMINI_API_KEY` to enable AI execution and improvement. The default `GEMINI_MODEL` is `gemini-3.1-flash-lite`, selected from the models exposed by the configured API project. Availability and free-tier quota are controlled by Google. Run `npm run models:list` inside `backend-node` to inspect the models exposed by your key. The API returns a clear configuration error when the key is absent; it does not fabricate AI responses.

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

## Legacy Demo Mode

The legacy local analyzer remains in the source for compatibility and test coverage, but the active analyzer requests prompt improvement through the authenticated backend.

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

## Gemini configuration

Set `GEMINI_API_KEY` only in `backend-node/.env`. The key is server-side only.
Use `npm run models:list` from `backend-node` to inspect models available to the configured API project.
