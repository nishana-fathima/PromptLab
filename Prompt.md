Prompt 001 — Requirement Analysis & Architecture

You are a senior AI engineer, full-stack architect, and prompt engineering specialist.

I am building a small but professional project called:

**PromptLab — AI Prompt Quality Checker**

The primary purpose of this project is to demonstrate AI-assisted software development, prompt engineering, prompt evaluation, custom agents, reusable skills, and context management.

**Technology stack**
- React + Vite + TypeScript
- Tailwind CSS
- Python FastAPI
- SQLite with SQLAlchemy
- OpenAI API

**Core requirements**

1. Users can enter coding prompts.
2. AI evaluates each prompt for clarity, specificity, context, completeness, constraints, and expected output.
3. Display a quality score from 0 to 100 using a documented scoring rubric.
4. Identify weaknesses and missing requirements.
5. Generate an improved version of the original prompt.
6. Display original and improved prompts side by side.
7. Save prompt analysis history in SQLite.
8. Allow users to view previous analyses.
9. Provide a clean, responsive, professional UI.

**Important evaluation rules**
- Do not penalize a prompt for missing irrelevant requirements.
- Do not invent project context that the user has not provided.
- Explain why each improvement is recommended.
- Treat scores as heuristic evaluations, not objective guarantees.
- Keep AI-generated scores consistent with the documented rubric.
- Validate AI responses using structured schemas.

**AI-assisted development requirements**
- Use AGENTS.md for project-wide coding instructions.
- Create a custom prompt-reviewer agent.
- Create a reusable prompt-evaluation skill.
- Maintain a development prompt history.
- Document context management and compaction techniques.
- Use incremental implementation and testing.

**Important development instructions**

Do not generate the entire project in one step.

First perform only the following:

1. Analyze the requirements.
2. Define the MVP scope.
3. Design the project architecture.
4. Propose the folder structure.
5. Define the SQLite database schema.
6. Design all necessary REST API endpoints.
7. Provide sample API request and response JSON.
8. Define the prompt evaluation scoring rubric.
9. Identify dependencies and potential implementation risks.
10. Create a phased development plan.

Do not start writing application code yet.

Keep the architecture simple enough to implement within one day.

When finished, summarize the plan and explain what should be implemented in Phase 2.


Prompt 002 — Project Setup & Folder Structure

You are a senior full-stack developer specializing in React, FastAPI, and AI-assisted software development.

We are building **PromptLab — AI Prompt Quality Checker**.

This is Phase 2 of our development process. Phase 1 (requirements analysis and architecture planning) has already been completed.

## Objective

Set up a clean, scalable, and runnable full-stack project foundation based on the architecture defined in Phase 1.

Do not implement the complete application yet.

## Step 1 — Review Existing Context

Before making changes:

1. Inspect the current project directory.
2. Review the architecture and implementation plan created in Phase 1.
3. Identify existing files and dependencies.
4. Follow the established technology stack and architectural decisions.
5. Preserve existing work. Do not overwrite files unnecessarily.
6. If the Phase 1 plan is unavailable, identify the missing information and use the requirements in this prompt as the baseline.

## Step 2 — Frontend Setup

Initialize the frontend using:

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router
- Axios
- Lucide React icons

Create a professional project structure separating:

- Pages
- Reusable UI components
- Layout components
- API services
- Hooks
- Types
- Utilities

Configure:

- Environment variables
- API base URL
- Routing
- Global styling
- Responsive application layout
- Basic loading and error states

Create placeholder routes for:

1. Dashboard — `/`
2. Prompt Analyzer — `/analyze`
3. Prompt History — `/history`

Use a clean, modern SaaS-style UI foundation.

Do not implement the actual AI analysis interface yet. That will be handled in Prompt 003.

## Step 3 — Backend Setup

Initialize a FastAPI backend with:

- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic
- pydantic-settings
- SQLite
- OpenAI Python SDK
- pytest
- httpx

Create a modular backend structure for:

- API routes
- Database configuration
- Models
- Schemas
- Services
- AI integration
- Application settings
- Tests

Implement:

1. FastAPI application initialization.
2. SQLite database configuration.
3. Environment variable loading.
4. CORS configuration using explicitly configured frontend origins.
5. Global API error handling.
6. Database session management.
7. A health-check endpoint:

   `GET /api/health`

Expected response:

```json
{
  "status": "ok",
  "service": "PromptLab API"
}
```

Do not implement AI prompt analysis yet.

## Step 4 — Project Documentation

Create the following files:

- `README.md`
- `.gitignore`
- `.env.example`
- `AGENTS.md`
- `docs/architecture.md`
- `docs/context-management.md`
- `docs/evaluation-rubric.md`
- `prompts/prompt-history.md`

AGENTS.md should define:

- Coding conventions
- Technology stack
- Project architecture
- Error-handling rules
- API security requirements
- Testing expectations
- Documentation standards
- Instructions to avoid unnecessary code changes
- Instructions to validate changes before reporting completion

In `prompts/prompt-history.md`, document Phase 1 and Phase 2, including the objective, prompt references, implementation decisions, and validation outcomes. Do not invent results for phases that have not been executed.

## Step 5 — Custom Agent and Skill Foundations

Create appropriate OpenCode-compatible custom agent and skill structures.

Custom agent:

`prompt-reviewer`

Responsibilities:

- Evaluate coding prompt quality.
- Identify ambiguity.
- Detect missing context.
- Suggest improvements.
- Follow the documented evaluation rubric.

Reusable skill:

`prompt-evaluation`

Responsibilities:

- Define the evaluation workflow.
- Apply a consistent scoring rubric.
- Generate structured recommendations.
- Avoid inventing missing requirements.

Check the actual OpenCode agent and skill conventions before creating configuration files. Do not invent unsupported configuration formats.

Only create agent and skill definitions during this phase. Do not implement the AI analysis service.

## Step 6 — Environment Configuration

Create separate environment configuration for frontend and backend.

Frontend example:

`VITE_API_BASE_URL=http://localhost:8000`

Backend example:

`DATABASE_URL=sqlite:///./promptlab.db`

`OPENAI_API_KEY=`

`OPENAI_MODEL=`

`FRONTEND_ORIGINS=http://localhost:5173`

Never expose the OpenAI API key in the frontend.

Ensure real `.env` files and SQLite database files are ignored by Git.

Do not commit secrets or generate fake production credentials.

## Step 7 — Validation

After implementation:

1. Install frontend dependencies.
2. Install backend dependencies in a Python virtual environment.
3. Verify frontend compilation.
4. Start or validate the FastAPI application.
5. Verify the health-check endpoint.
6. Verify SQLite initialization.
7. Run available tests.
8. Check for missing imports and configuration errors.
9. Confirm frontend and backend can run independently.
10. Verify that agent and skill configurations match the installed OpenCode version.

Fix any errors caused by this phase before finishing.

## Step 8 — Final Report

Provide:

1. Complete folder structure.
2. List of created files.
3. Dependencies installed.
4. Environment setup instructions.
5. Commands to run frontend and backend.
6. Actual validation results.
7. Any remaining issues or blockers.
8. Files changed during this phase.
9. Recommended next implementation step.

## Strict Rules

- Implement only Phase 2.
- Do not build the full Prompt Analyzer UI.
- Do not integrate the real OpenAI API yet.
- Do not implement prompt history CRUD yet.
- Do not hardcode fake AI results.
- Avoid unnecessary dependencies.
- Preserve established architecture decisions.
- Do not claim tests passed unless they actually ran.
- Keep code understandable and maintainable.
- Ensure the project is runnable before proceeding.

**Start implementing Phase 2 now. Do not stop at planning.**


Prompt 003 — Prompt Analyzer Interface (Frontend Implementation)

You are a senior React developer, UI/UX engineer, and frontend architect.

We are building **PromptLab — AI Prompt Quality Checker**.

Phase 1: Requirements and architecture planning.
Phase 2: Project setup, frontend, backend foundation, AGENTS.md, agents, and skills.

Now implement **Phase 3 — Professional Prompt Analyzer Interface**.

## 1. Review Existing Project

Before coding:

- Inspect the current React project, routes, components, styles, and installed dependencies.
- Read AGENTS.md and architecture documentation.
- Follow existing TypeScript, React, and Tailwind conventions.
- Reuse existing layout components.
- Preserve existing functionality.
- Do not rebuild the project or change unrelated code.

## 2. Prompt Analyzer Page

Implement the `/analyze` route as a polished, responsive AI-powered prompt analysis workspace.

Design direction:
- Modern SaaS dashboard.
- Clean, professional typography.
- Light theme with subtle blue/indigo accents.
- Spacious layout.
- Rounded cards, soft borders, and minimal shadows.
- Smooth, subtle transitions.
- Responsive desktop, tablet, and mobile layouts.
- Avoid excessive gradients and animations.

### Main Layout

Desktop:
- Existing sidebar navigation.
- Page heading and short description.
- Main prompt editor.
- Analyze button.
- Results dashboard.
- Original vs improved comparison.

Mobile:
- Single-column stacked layout.
- Full-width actions.
- No horizontal overflow.

## 3. Prompt Input Editor

Create a reusable PromptEditor component.

Include:
- Multiline textarea for coding prompts.
- Placeholder with a meaningful example.
- Character count.
- Clear prompt button.
- Paste-friendly editor.
- Optional example prompt selection.
- Input validation.
- Disabled submit button for empty or whitespace-only input.

Primary action:

"Analyze Prompt"

Submit flow:
1. Validate input.
2. Enter loading state.
3. Call the centralized prompt analysis API service.
4. Validate and normalize the response.
5. Display analysis results.
6. Handle errors gracefully.

Prevent duplicate submissions.

## 4. Loading and Error States

Loading UI:
- Analyze button spinner.
- Button label changes to "Analyzing Prompt..."
- Skeleton placeholders for analysis cards.
- Accessible status message.

Error UI:
- Clear error description.
- Retry action.
- Preserve the user's original prompt.
- Handle network errors, server errors, request timeouts, and malformed responses.
- Never show fake success results.

Include appropriate empty states before analysis.

## 5. Prompt Quality Score

Create a reusable ScoreCard component.

Display:
- Overall score between 0 and 100.
- Circular progress visualization.
- Quality label.
- Short explanation of the score.
- Individual scoring criteria.

Criteria:
- Clarity
- Specificity
- Context
- Completeness
- Constraints
- Expected output

All scores must come from the validated analysis response.

Use clearly documented, consistent score thresholds.

Do not calculate arbitrary frontend scores.

## 6. Weaknesses Section

Create a WeaknessList component.

Each weakness should display:
- Title
- Description
- Severity: high, medium, or low
- Explanation of why it affects the prompt

Use subtle severity indicators.

Handle empty weakness lists.

Do not display hardcoded weaknesses.

## 7. Recommendations Section

Create a RecommendationList component.

Each recommendation should display:
- Recommendation title
- Description
- Reason for the suggested improvement

Make recommendations easy to read and understand.

Recommendations must come from API response data.

## 8. Original vs Improved Prompt Comparison

Create a PromptComparison component.

Desktop:
- Two-column comparison view.

Left:
- Original prompt.
- Copy button.

Right:
- AI-improved prompt.
- Copy button.

Mobile:
- Stack both panels vertically.

Additional requirements:
- Preserve multiline formatting.
- Provide copy-to-clipboard functionality.
- Display copy-success feedback.
- Support long prompts.
- Keep both panels visually balanced.
- Use accessible buttons and labels.

Do not invent an improved prompt if the API has not returned one.

## 9. Reusable Component Architecture

Prefer reusable components such as:

- PromptAnalyzerPage
- PromptEditor
- AnalyzeButton
- AnalysisResults
- ScoreCard
- CriteriaScoreList
- WeaknessList
- RecommendationList
- PromptComparison
- AnalysisSkeleton
- AnalysisErrorState

Choose file locations that match the existing architecture.

Avoid oversized components and unnecessary abstraction.

## 10. TypeScript Types and API Preparation

Define strict TypeScript interfaces for:

- AnalyzePromptRequest
- AnalyzePromptResponse
- CriterionScore
- PromptWeakness
- PromptRecommendation

Ensure response fields are consistent with the architecture and API contracts from Phase 1.

Create a centralized frontend API service.

Important:
- Inspect existing API contracts before choosing endpoint paths.
- Do not invent incompatible backend endpoints.
- Connect to the existing analysis endpoint only if it is already implemented.
- If the backend analysis API does not exist yet, prepare the service integration and display a meaningful unavailable/error state.
- Do not create hardcoded AI results to simulate a successful API call.
- Do not implement backend AI functionality during this phase.

## 11. State Management

Use React hooks for local state.

Manage:
- Prompt input
- Validation errors
- Submission status
- Analysis response
- API errors
- Copy feedback

Keep state predictable.

Handle component unmounts and stale requests appropriately.

Avoid unnecessary global state libraries.

## 12. Accessibility and UX

Implement:
- Keyboard-accessible controls.
- Visible focus indicators.
- Proper form labels.
- Accessible loading/error announcements.
- Readable contrast.
- Responsive layouts.
- Clear user feedback.

Ensure the results are easy to understand for developers and nontechnical reviewers.

## 13. Testing and Validation

After implementation:

1. Run TypeScript validation.
2. Run the frontend build.
3. Run available lint checks.
4. Test empty prompt validation.
5. Test submit loading behavior.
6. Test API error handling.
7. Test malformed responses.
8. Test successful response rendering using test fixtures in automated tests only.
9. Test copy functionality.
10. Verify responsive layouts.

Fix errors caused by this phase.

Do not claim a successful real AI analysis unless the backend endpoint actually exists and works.

## 14. Documentation

Update:

- prompts/prompt-history.md
- docs/architecture.md, only if necessary

Document:
- Phase 3 objective.
- Files created and modified.
- Important implementation decisions.
- Actual validation results.
- Remaining integration dependencies.

Preserve the existing Phase 1 and Phase 2 documentation.

## Final Report

Provide:
1. Summary of completed work.
2. Component structure.
3. Files created and modified.
4. State management and submit flow explanation.
5. API contract used.
6. Test and build results.
7. Known issues or blockers.
8. Exact commands to run the frontend.
9. What remains for Phase 4.

## Strict Rules

- Implement only Phase 3.
- Do not change backend business logic.
- Do not add fake AI analysis results.
- Do not expose API credentials.
- Do not break existing routes.
- Follow AGENTS.md.
- Keep components reusable and maintainable.
- Do not rewrite unrelated files.
- Prioritize working functionality over unnecessary visual complexity.

**Start implementing Phase 3 now. Do not stop after writing a plan.**

Prompt 004 — Backend Integration, Prompt History & Testing
You are a senior full-stack engineer specializing in React, TypeScript, FastAPI, SQLAlchemy, SQLite, and AI application development.

We are developing **PromptLab — AI Prompt Quality Checker**.

Phases 1–3 have already been implemented or planned. Now implement Phase 4 based on the existing codebase and actual API contracts.

## Phase 4 — Backend Integration, Analysis History, Detail Views & Testing

### Step 1 — Inspect the Existing Project

Before modifying any code:

1. Read AGENTS.md.
2. Inspect the frontend and backend architecture.
3. Review existing API routes, services, database models, schemas, and tests.
4. Review the previous development documentation.
5. Identify which functionality already exists and which remains incomplete.
6. Preserve all working functionality.

Do not assume that previously planned features are already implemented.

## Step 2 — Backend Dependency Setup

- Check the existing backend dependency configuration.
- Install missing dependencies inside the existing Python virtual environment, or create one if necessary.
- Verify FastAPI application startup.
- Verify SQLite database connection and table initialization.
- Confirm environment variables load correctly.
- Ensure OpenAI API credentials remain backend-only.

Do not overwrite existing environment configurations.

## Step 3 — Verify Prompt Analysis API

Inspect and verify the existing endpoint:

POST /api/v1/analyses

Ensure it accepts a coding prompt, performs genuine AI-powered analysis, validates the AI response, persists the result, and returns structured JSON.

Expected response capabilities:

- Analysis ID
- Original prompt
- Overall quality score
- Individual criteria scores
- Weaknesses
- Recommendations
- Improved prompt
- Analysis timestamp

Reuse the existing API response schema.

Do not rename existing response fields without updating all dependent frontend code and tests.

If the endpoint is incomplete, implement only the missing functionality.

Ensure:
- Input validation
- Appropriate HTTP status codes
- Safe error responses
- OpenAI API timeout handling
- Failure handling for malformed AI responses
- No hardcoded success results
- No API credentials exposed to the frontend

If real API credentials are unavailable, use mocked AI responses only inside automated tests and report that live integration remains unverified.

## Step 4 — Frontend API Integration

Connect the existing Prompt Analyzer page to POST /api/v1/analyses.

Submit flow:

1. User enters a coding prompt.
2. Frontend validates input.
3. User clicks Analyze Prompt.
4. Show loading state.
5. Submit the request to FastAPI.
6. Receive and validate the response.
7. Display the quality score, weaknesses, recommendations, and improved prompt.
8. Save the analysis through the backend's existing persistence flow.
9. Display a helpful error message when the request fails.

Prevent duplicate requests.

Preserve the user's input when requests fail.

Avoid duplicate database insertions caused by frontend retries or multiple submissions.

## Step 5 — Prompt History API Integration

Inspect and integrate:

GET /api/v1/analyses

Create or complete the Prompt History page.

Display:
- Analysis ID
- Original prompt preview
- Quality score
- Quality classification
- Date and time
- View Details action

Requirements:
- Fetch history from the backend.
- Show loading, empty, and error states.
- Support the existing pagination API if available.
- Display newest analyses first.
- Make the layout responsive.
- Never use hardcoded history data.

Do not invent unsupported filtering or pagination parameters.

## Step 6 — Analysis Detail View

Inspect whether the backend already supports retrieving an analysis by ID.

If the detail endpoint exists, reuse it.

If missing, implement a consistent REST endpoint:

GET /api/v1/analyses/{id}

Create a frontend route:

/history/:id

Display:
- Original prompt
- Overall quality score
- Detailed criteria scores
- Identified weaknesses
- AI recommendations
- Improved prompt
- Created timestamp
- Copy original prompt
- Copy improved prompt
- Back to history navigation

Handle invalid IDs, missing records, loading states, and server errors.

Do not request a new AI analysis when opening an existing record.

Always retrieve persisted analysis data.

## Step 7 — Weakness Severity Schema

Inspect the current weakness data structure.

If severity metadata is already available, use it.

If severity is missing and required by the existing frontend:

- Extend the schema with high, medium, and low severity values.
- Update AI response validation.
- Update database serialization and persistence where necessary.
- Maintain compatibility with previously stored analyses.
- Add tests covering older data.

Do not blindly modify database tables or discard existing SQLite data.

If backward compatibility requires a migration, implement and document a safe migration.

Do not infer actual severity from array position or UI color.

## Step 8 — Frontend Automated Tests

Use the existing frontend testing framework, or add Vitest and React Testing Library if no framework is configured.

Write tests for:

1. Empty prompt validation.
2. Whitespace-only prompt validation.
3. Successful prompt submission.
4. Loading state during submission.
5. Duplicate submit prevention.
6. API network failures.
7. Backend error responses.
8. Malformed API responses.
9. Quality score rendering.
10. Weaknesses and recommendations rendering.
11. Original and improved prompt comparison.
12. Clipboard copy success and failure.
13. History loading and empty states.
14. History list rendering.
15. Analysis detail loading.
16. Analysis not-found handling.

Use deterministic mocked API responses only inside tests.

## Step 9 — Backend Automated Tests

Add or improve pytest tests for:

- Health-check endpoint
- Valid prompt analysis
- Invalid and empty prompt inputs
- AI provider failure
- Malformed AI response
- Database persistence
- History retrieval
- Analysis retrieval by ID
- Missing analysis ID
- Response schema validation

Use an isolated test database.

Never send real OpenAI API requests from automated unit tests.

## Step 10 — Final Validation

Run all applicable validation commands:

Frontend:
- TypeScript checking
- ESLint
- Production build
- Automated tests

Backend:
- Dependency verification
- Application import/startup checks
- Pytest
- Database verification
- API endpoint verification

If valid credentials are configured, test one real AI analysis end to end.

Do not expose credentials or private prompt content in logs.

Fix issues introduced or discovered during this phase where they are within scope.

## Step 11 — Update Documentation

Update:
- README.md
- docs/architecture.md
- docs/context-management.md, if relevant
- prompts/prompt-history.md

Document:
- Phase 4 objectives
- API integration decisions
- Files created and modified
- Test commands
- Actual test results
- Any remaining limitations

Preserve previous prompt history.

## Final Report

After implementation, provide:

1. Completed features.
2. Backend endpoints verified.
3. Frontend pages integrated.
4. Database behavior.
5. Test results with passed/failed counts.
6. Build status.
7. Files modified.
8. Remaining issues.
9. Exact commands to run both applications.
10. Recommendations for Phase 5.

## Strict Implementation Rules

- Implement the changes, not just a plan.
- Inspect before editing.
- Follow AGENTS.md.
- Preserve existing API contracts.
- Do not rewrite working components unnecessarily.
- Do not hardcode analysis or history data.
- Do not expose API keys.
- Do not delete SQLite data.
- Do not claim live AI verification without actually testing it.
- Keep changes minimal, maintainable, and testable.

Start implementing Phase 4 now. Complete all feasible tasks, run validation, and report actual results.

Prompt 005 — Production Hardening, Database Migration & Live AI Verification
gh auth loginYou are a senior full-stack engineer, AI integration specialist, database architect, and software quality engineer.

We are developing **PromptLab — AI Prompt Quality Checker**.

Phases 1–4 have already been completed or partially implemented.

Now implement:

# Phase 5 — Production Hardening & Reliability

The primary objective is to make the existing application reliable, secure, testable, and deployment-ready without breaking working features.

Technology stack:

- React + Vite + TypeScript
- Tailwind CSS
- Python FastAPI
- SQLAlchemy + SQLite
- OpenAI API
- OpenCode custom agents and skills

## 1. Inspect Before Implementation

Before changing code:

1. Read AGENTS.md.
2. Review the complete existing frontend and backend architecture.
3. Inspect the implemented API endpoints.
4. Review current database models and schemas.
5. Review environment configuration.
6. Review existing tests and scripts.
7. Check the current Git status.
8. Review prompt history and previous architectural decisions.

Identify:

- Completed functionality
- Missing functionality
- Existing issues
- Potential breaking changes
- Production readiness risks

Preserve existing work.

Do not rebuild the application from scratch.

## 2. Verify Live Backend and OpenAI Integration

Verify the existing endpoint:

POST /api/v1/analyses

Check the complete request flow:

Frontend → FastAPI → OpenAI API → Response Validation → SQLite → Frontend Results

Requirements:

- Verify environment variable loading.
- Verify configured OpenAI model.
- Confirm the API key is accessed only from the backend.
- Validate API request and response structures.
- Use structured outputs where supported.
- Enforce a documented scoring rubric.
- Ensure quality scores are between 0 and 100.
- Prevent invalid AI responses from being stored.
- Handle AI request timeouts.
- Handle authentication and rate-limit errors.
- Handle malformed structured responses.
- Add reasonable input length limits.
- Avoid logging secrets or sensitive prompt content.
- Return safe, useful API errors.

Perform a live end-to-end AI analysis only when valid credentials are available.

Never print or expose the actual API key.

If credentials are missing, do not invent success results. Run mocked integration tests and clearly report live verification as blocked.

## 3. Database Migrations

Introduce Alembic for SQLAlchemy database migrations.

Requirements:

1. Inspect existing SQLite database models.
2. Inspect existing tables and stored data.
3. Configure Alembic correctly.
4. Create an initial schema migration.
5. Safely baseline existing databases without recreating existing tables.
6. Ensure new databases can be initialized through migrations.
7. Verify upgrades on a temporary copy of the existing database.
8. Preserve all existing analysis history.
9. Document migration commands.

Important:

- Never delete or recreate the existing production database.
- Never automatically stamp an unknown or mismatched schema.
- Do not use destructive migrations.
- Back up existing databases before applying migrations.
- Ensure migrations are repeatable and version-controlled.
- Prefer explicit migrations over automatic table creation in deployed environments.

## 4. Weakness Severity Enhancement

Inspect the existing weakness response schema.

If severity already exists, verify its functionality and tests.

If it does not exist, add optional severity metadata with supported values:

- high
- medium
- low

Requirements:

- Maintain compatibility with previously stored analyses.
- Support older JSON records without severity.
- Provide a neutral fallback display for legacy data.
- Update Pydantic schemas.
- Update frontend TypeScript interfaces.
- Update the AI evaluation schema.
- Persist severity safely.
- Add backward-compatible migrations only if the database structure requires them.
- Test old and new analysis records.

Do not infer high severity by default for old records.

Do not modify unrelated scoring behavior.

## 5. Request Idempotency

Inspect whether analysis creation supports duplicate request protection.

If retry-safe creation is required, implement an optional Idempotency-Key mechanism for:

POST /api/v1/analyses

Requirements:

1. Accept an optional client-generated idempotency key.
2. Associate the key with the request payload.
3. Return the previously completed analysis for a valid retry using the same key and payload.
4. Reject the same key with a different payload using HTTP 409.
5. Prevent concurrent duplicate creation using database uniqueness and transaction handling.
6. Define safe behavior for in-progress and failed requests.
7. Document retention and retry semantics.
8. Avoid exposing idempotency internals unnecessarily.

Only implement this if the architecture benefits from retry-safe analysis creation.

Do not add complexity without a clear use case.

## 6. ESLint and Frontend Quality

Configure or improve ESLint for React + TypeScript.

Include:

- TypeScript ESLint rules
- React Hooks rules
- Appropriate React and Vite configuration
- Consistent unused-variable detection
- No unsafe suppression of important errors

Add package scripts for:

- lint
- typecheck
- test
- build

Run all checks and fix relevant errors.

Avoid broad formatting changes to unrelated files.

## 7. Broader Frontend Integration Tests

Use Vitest + React Testing Library if compatible with the existing project.

Add tests for:

Prompt Analyzer:

- Input validation
- Valid prompt submission
- Loading behavior
- Duplicate request prevention
- Successful analysis rendering
- API failure handling
- Malformed response handling
- Copy functionality

Prompt History:

- Loading and empty states
- Successful history retrieval
- API failure handling
- History navigation

Analysis Detail:

- Valid analysis ID
- Invalid analysis ID
- Missing record
- Correct persisted result rendering
- Copy original and improved prompts
- Back navigation

Use mocked network responses in automated tests.

Do not make real OpenAI requests from unit or integration tests.

## 8. Backend Testing

Expand pytest coverage for:

- Health endpoint
- Valid analysis creation
- Invalid prompt validation
- OpenAI provider failure
- OpenAI timeout handling
- Invalid AI response
- Score boundary validation
- SQLite persistence
- Analysis history
- Analysis detail retrieval
- Legacy weaknesses without severity
- Weakness severity validation
- Idempotency behavior, if implemented
- Database migration compatibility

Use an isolated temporary database for tests.

Ensure tests do not modify user data.

## 9. Environment Validation

Use Pydantic Settings or existing configuration mechanisms.

Validate:

- DATABASE_URL
- OPENAI_API_KEY
- OPENAI_MODEL
- FRONTEND_ORIGINS
- Application environment
- Request timeout
- Maximum prompt length

Provide clear startup errors for invalid required configuration.

Allow test environments to use mocked AI providers without production credentials.

Avoid permissive production CORS configurations.

Update .env.example without including real secrets.

## 10. Deployment Configuration

Prepare a minimal, practical deployment setup.

Prefer Docker-based deployment if appropriate for the current architecture.

Create or update:

- Backend Dockerfile
- Frontend Dockerfile
- docker-compose.yml
- .dockerignore
- .env.example
- Deployment instructions in README

Requirements:

- Use production-appropriate frontend serving.
- Avoid using the Vite development server in production.
- Avoid exposing SQLite database files publicly.
- Persist database data using appropriate volumes.
- Use runtime secrets or environment variables.
- Avoid embedding secrets into frontend builds.
- Provide container health checks where practical.
- Ensure startup migrations are controlled and safe.
- Document separate development and production commands.

Do not deploy to an external server.

Do not modify existing infrastructure without authorization.

## 11. Security and Reliability Review

Review:

- Input validation
- API error responses
- Secret management
- CORS restrictions
- Dependency configuration
- SQLAlchemy query safety
- AI response schema validation
- Database persistence behavior
- Request timeouts
- Frontend failure recovery

Fix security and reliability issues discovered within the scope of this phase.

Treat submitted prompts and AI responses as untrusted content.

Do not execute user-submitted code or prompt content.

## 12. Final Validation

Run all applicable checks:

Frontend:

- npm run lint
- npm run typecheck
- npm run test
- npm run build

Backend:

- pytest
- FastAPI startup verification
- Health endpoint verification
- Analysis endpoint verification
- Migration upgrade test

Deployment:

- Docker configuration validation
- Container build verification where Docker is available

If live OpenAI credentials are configured, perform one safe, low-cost end-to-end analysis request.

Report actual results.

Do not mark unexecuted checks as passed.

## 13. Documentation and Context Management

Update:

- README.md
- AGENTS.md, only when necessary
- docs/architecture.md
- docs/context-management.md
- docs/evaluation-rubric.md, if changed
- prompts/prompt-history.md

Add a Phase 5 development record containing:

- Objective
- Prompt reference
- Implementation summary
- Architectural decisions
- Problems encountered
- Fixes applied
- Test results
- Remaining limitations

Do not rewrite earlier prompt history.

Create a concise context handoff summary for future OpenCode sessions.

## 14. Final Delivery Report

Provide:

1. Production hardening summary.
2. Files created and modified.
3. API endpoints verified.
4. Database migration status.
5. Weakness severity implementation status.
6. Idempotency implementation decision.
7. Frontend test results.
8. Backend test results.
9. Live OpenAI verification status.
10. Deployment configuration status.
11. Security improvements.
12. Remaining blockers.
13. Exact commands to run the project.
14. Recommended next steps.

## Strict Rules

- Implement actual changes, not just recommendations.
- Inspect the repository before modifying files.
- Never delete existing SQLite data.
- Never expose environment secrets.
- Never hardcode AI evaluation responses.
- Never claim success without executing validation.
- Preserve existing frontend and backend contracts.
- Avoid unnecessary dependencies.
- Use backward-compatible schema changes.
- Do not make unrelated architectural changes.
- Keep the project small and presentation-ready.
- Do not deploy to external infrastructure.

Start Phase 5 implementation now.

Prioritize in this order:

1. Working live analysis and environment validation.
2. Database migration safety.
3. Automated tests and ESLint.
4. Backward-compatible severity improvements.
5. Retry safety where necessary.
6. Deployment configuration.

Complete as much as possible, verify results, and clearly document anything remaining.


Prompt 006 — Backend Verification, Live AI Testing & Final Integration
You are a senior Python backend engineer, FastAPI specialist, AI integration engineer, and software quality engineer.

Project: **PromptLab — AI Prompt Quality Checker**

We have completed development through Phase 5, but some backend verification steps remain blocked.

Now implement **Phase 6 — Backend Verification, Live AI Testing, and Integration Reliability**.

## 1. Inspect the Existing Project

Before making changes:

- Read AGENTS.md.
- Inspect the FastAPI backend structure.
- Review existing requirements and environment configuration.
- Inspect SQLAlchemy models and Alembic migrations.
- Review existing pytest tests.
- Inspect OpenAI integration code.
- Check operating system and available Python tooling.
- Check Git status.

Do not recreate the project or overwrite working functionality.

## 2. Resolve Python Environment Blockers

Verify the availability of:

- python3
- pip
- venv

If missing, identify the operating system and install the required tooling using the appropriate package manager, where permitted.

Do not use sudo or change system packages without authorization.

Create or reuse the backend virtual environment.

Install the existing backend dependencies.

Verify all required Python imports.

If package installation cannot be completed, report the exact error and provide the necessary commands.

## 3. Verify Database and Alembic

Use a temporary SQLite database for migration testing.

Tasks:

1. Inspect existing Alembic configuration.
2. Verify the migration history.
3. Run migrations against an isolated temporary database.
4. Confirm the expected tables are created.
5. Verify migration version tracking.
6. Test database read and write operations.
7. Confirm existing application data is never modified during migration tests.

Do not delete the existing database.

Do not automatically stamp incompatible schemas.

## 4. Run Backend Automated Tests

Run the existing pytest suite.

Verify:

- Health endpoint
- Prompt validation
- Analysis creation
- AI provider error handling
- Invalid AI responses
- Score validation
- SQLite persistence
- History retrieval
- Analysis detail retrieval
- Weakness severity compatibility

Fix failures caused by implementation defects.

Do not change correct tests merely to make them pass.

Report passed, failed, and skipped test counts.

## 5. Add API-Level Integration Tests

Implement FastAPI integration tests using an isolated SQLite test database.

Use httpx and pytest.

Test:

- POST /api/v1/analyses
- GET /api/v1/analyses
- GET /api/v1/analyses/{id}

Verify the complete application flow:

Request → AI service abstraction → Response validation → Database persistence → API response.

Mock the external AI provider in automated tests.

Verify that creating an analysis makes it available through the history and detail endpoints.

Test failure behavior and database isolation.

## 6. Verify Live OpenAI Integration

Inspect the existing OpenAI integration.

Validate:

- API key configuration.
- Model configuration.
- Structured output parsing.
- Quality score calculation.
- Weakness generation.
- Recommendation generation.
- Improved prompt generation.
- Error handling.
- Request timeout.

Never display or log the API key.

If valid credentials are configured, perform one low-cost live analysis using:

"Create a responsive React login form with email and password validation."

Verify that:
- A valid response is received.
- The score is within 0–100.
- Weaknesses and recommendations follow the expected schema.
- An improved prompt is returned.
- The result is persisted.
- The saved analysis can be retrieved by ID.

Do not repeatedly retry paid API requests.

If credentials are missing, skip the live test and clearly report the blocker.

## 7. Request Idempotency Review

Review the current analysis creation flow.

Determine whether automatic frontend retries or duplicate submissions can create unnecessary duplicate AI requests.

If retry-safe request creation is required, implement a minimal, tested Idempotency-Key mechanism.

Ensure concurrent requests are handled safely.

Avoid unnecessary complexity if existing duplicate-submit prevention is sufficient for the MVP.

Document the decision.

## 8. Observability and Structured Logging

Introduce lightweight structured backend logging.

Include:

- Request ID
- HTTP method
- Request path
- HTTP status
- Duration
- Error category

Requirements:

- Never log API keys.
- Never log complete submitted prompts.
- Never log private AI responses.
- Avoid sensitive query parameters.
- Use consistent request IDs for error tracing.
- Do not add a complex external monitoring platform.

## 9. Docker Validation

Check whether Docker is installed and available.

If available:

- Validate docker-compose configuration.
- Verify backend container build.
- Verify frontend container build.
- Check container startup.
- Verify health endpoint.

If Docker is unavailable, do not attempt unsafe system installation.

Report the limitation and document the necessary installation steps.

Docker validation must not block local MVP verification.

## 10. Final Application Verification

Start the backend locally.

Verify:

GET /api/health

POST /api/v1/analyses

GET /api/v1/analyses

GET /api/v1/analyses/{id}

Confirm the frontend's configured API base URL matches the running backend.

Check CORS configuration.

Verify that saved analyses remain available after application restart.

## 11. Documentation

Update:

- README.md
- docs/architecture.md
- docs/context-management.md
- prompts/prompt-history.md

Document Phase 6:

- Objective
- Implementation changes
- Environment setup
- Testing approach
- Actual verification results
- Remaining blockers
- Commands needed to reproduce the tests

Keep existing documentation intact.

## 12. Final Report

Provide a structured report containing:

1. Python environment status.
2. Dependency installation status.
3. Alembic migration results.
4. Backend pytest results.
5. API integration test results.
6. Live OpenAI test status.
7. Idempotency decision.
8. Logging implementation.
9. Docker verification status.
10. Files modified.
11. Remaining issues.
12. Exact startup commands.
13. Final MVP readiness assessment.

## Strict Rules

- Implement and verify rather than only describing changes.
- Preserve working functionality.
- Never delete existing databases.
- Never expose API credentials.
- Do not hardcode AI results.
- Do not call the real OpenAI API in automated tests.
- Do not claim validation success unless tests actually ran.
- Do not modify unrelated files.
- Follow AGENTS.md.
- Prioritize a working presentation-ready application.

Start Phase 6 now. Resolve the existing blockers first, then run actual backend and API verification.

OpenCode Prompt 007 — Convert PromptLab to Frontend-Only Demo
You are a senior React + TypeScript developer.

URGENT TASK: Convert my existing PromptLab — AI Prompt Quality Checker project into a fully functional FRONTEND-ONLY DEMO application.

I have very limited time and need the project ready for a presentation.

The existing frontend is already designed and working, but prompt analysis currently fails because OPENAI_API_KEY is not configured.

I DO NOT want to configure OpenAI API, FastAPI, Python, SQLite, or Docker.

## PRIMARY GOAL

Make the entire existing React application work independently without any backend or external API.

IMPORTANT: Preserve the current frontend design exactly as much as possible.

Do not rebuild the application from scratch.

## 1. Remove Backend Dependency From Frontend

- Inspect the existing frontend architecture.
- Identify every API call used by the analyzer, history, and detail pages.
- Replace backend calls with local TypeScript services.
- Ensure the frontend runs using only `npm run dev`.
- Do not require an API key.
- Do not require a running FastAPI server.
- Do not delete the existing backend folder.
- Keep the backend code untouched for future integration.
- Do not modify unrelated project files.

## 2. Implement Local Prompt Analysis

Create a TypeScript service:

`src/services/localPromptAnalyzer.ts`

Use rule-based prompt evaluation instead of real AI.

Analyze coding prompts using these criteria:

- Clarity: 20 points
- Specificity: 20 points
- Context: 15 points
- Completeness: 20 points
- Constraints: 15 points
- Expected output: 10 points

Total: 100 points.

Detect relevant information such as:

- Technology stack
- Framework
- UI requirements
- Functional requirements
- Validation
- Error handling
- Accessibility
- Testing
- API integration
- Responsive design
- Expected deliverables

Implement deterministic scoring with clear, documented rules.

Do not penalize prompts for irrelevant missing requirements.

Avoid giving high scores simply because a prompt contains many keywords.

## 3. Generate Weaknesses and Recommendations

Based on the actual prompt, generate appropriate weaknesses and recommendations.

Each weakness should contain:

- Title
- Description
- Severity

Each recommendation should contain:

- Title
- Description
- Reason

Use predefined recommendation templates with conditional logic.

Avoid displaying the same weaknesses for every prompt.

Use severity values:
- high
- medium
- low

Make results consistent and explainable.

## 4. Generate an Improved Prompt

Create an improved version of the user's original coding prompt using local TypeScript logic.

The improved prompt should:

- Preserve the user's original intention.
- Organize requirements into clear sections.
- Include relevant technical details already provided.
- Identify missing decisions using placeholders rather than inventing requirements.
- Suggest error handling, validation, accessibility, and testing only when relevant.
- Include clear deliverables and acceptance criteria.
- Avoid repeating the same generic template for every input.

The improved prompt must be copyable.

Clearly label the generated result as:

"Template-based improved prompt"

Do not claim this is generated by a live AI model.

## 5. Keep Existing Analyzer UI

Preserve the current design, layout, colors, typography, cards, buttons, and responsive behavior.

Ensure these features work:

1. Enter prompt.
2. Click Analyze Prompt.
3. Show loading animation briefly.
4. Display quality score.
5. Display criteria scores.
6. Display weaknesses.
7. Display recommendations.
8. Display improved prompt.
9. Compare original and improved prompts.
10. Copy prompts.
11. Analyze another prompt.

Remove the existing OPENAI_API_KEY error from the frontend-only flow.

The application should never request a backend endpoint during demo analysis.

## 6. Implement Local Prompt History

Replace backend history calls with browser localStorage.

Features:

- Save every completed analysis.
- Show previous analyses in the History page.
- Store original prompt, scores, weaknesses, recommendations, improved prompt, and timestamp.
- Open analysis details.
- Copy previous prompts.
- Clear history with confirmation.
- Preserve history after refreshing the browser.

Use safe JSON parsing and handle invalid stored data.

Add a reasonable storage limit.

Do not store secrets.

## 7. Demo Examples

Provide three selectable example coding prompts:

Example 1 — Basic:
"Create a login page."

Example 2 — Intermediate:
"Build a React login page with email and password validation."

Example 3 — Advanced:
"Build a responsive React login page using TypeScript and Tailwind CSS. Include email/password validation, accessible form controls, loading states, error handling, reusable components, and unit tests."

Ensure each prompt produces a meaningful and explainable analysis.

Do not hardcode the score for individual examples.

Scores must be calculated by the same local evaluation engine used for user-entered prompts.

## 8. Transparent Demo Mode

Add a small, professional label near the analyzer heading:

"Demo Mode — Local Rule-Based Analysis"

Add a tooltip or brief description:

"This prototype evaluates prompts using local scoring rules and predefined improvement templates. No external AI API is used."

Keep this label subtle and visually consistent.

## 9. Remove Unnecessary Frontend API Configuration

- Ensure missing VITE_API_BASE_URL does not break the frontend.
- Remove runtime dependence on OPENAI_API_KEY.
- Do not expose or read backend secrets.
- Preserve the backend for future development.
- Update frontend environment documentation.

## 10. Testing

Run:

- npm run lint
- npm run typecheck, if available
- npm run test, if available
- npm run build

Verify:

- No backend requests.
- No API key errors.
- Analyzer works with user-entered prompts.
- Different prompts generate different relevant results.
- History persists after browser refresh.
- Analysis detail pages work.
- Copy buttons work.
- Existing routes work.
- Mobile layout remains responsive.

Fix errors before completion.

## 11. Documentation

Update README.md with:

- Frontend-only setup
- Demo mode explanation
- Local scoring methodology
- Project limitations
- Startup instructions

Update prompts/prompt-history.md with this development phase.

Do not claim the application uses live AI.

## 12. Final Report

Provide:

1. Files modified.
2. Local analysis logic implemented.
3. History implementation.
4. Existing backend dependencies removed from frontend.
5. Validation results.
6. Exact frontend startup command.
7. Demo examples.
8. Remaining limitations.

## STRICT RULES

- Do not ask for an OpenAI API key.
- Do not use FastAPI.
- Do not require SQLite.
- Do not require Docker.
- Do not make external API requests.
- Do not replace the existing UI design.
- Do not delete the backend.
- Do not add unnecessary dependencies.
- Do not stop after planning.
- Implement the changes immediately.
- Prioritize a fully working presentation demo.

START IMPLEMENTATION NOW.