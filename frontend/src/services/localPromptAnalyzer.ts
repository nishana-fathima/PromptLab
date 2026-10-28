import type {
  AnalyzePromptResponse,
  CriterionName,
  CriterionScore,
  PromptRecommendation,
  PromptWeakness,
} from "../types/analysis";

export const DEMO_EXAMPLES = [
  {
    label: "Basic",
    prompt: "Create a login page.",
  },
  {
    label: "Intermediate",
    prompt: "Build a React login page with email and password validation.",
  },
  {
    label: "Advanced",
    prompt: "Build a responsive React login page using TypeScript and Tailwind CSS. Include email/password validation, accessible form controls, loading states, error handling, reusable components, and unit tests.",
  },
] as const;

export const LOCAL_RUBRIC = {
  clarity: 20,
  specificity: 20,
  context: 15,
  completeness: 20,
  constraints: 15,
  expected_output: 10,
} as const satisfies Record<CriterionName, number>;

const TECHNICAL_SIGNALS = /\b(react|vue|angular|typescript|javascript|python|fastapi|sqlalchemy|sqlite|tailwind|css|html|node|next\.js|vite)\b/i;
const UI_SIGNALS = /\b(page|screen|dashboard|form|component|button|layout|responsive|mobile|desktop|design|ui|ux)\b/i;
const BEHAVIOR_SIGNALS = /\b(include|support|handle|allow|validate|display|save|load|submit|filter|sort|create|update|delete|authenticate)\b/i;
const ERROR_SIGNALS = /\b(error|failure|invalid|empty|loading|timeout|retry|edge case|fallback)\b/i;
const ACCESSIBILITY_SIGNALS = /\b(accessib|aria|keyboard|screen reader|semantic|label)\b/i;
const TESTING_SIGNALS = /\b(test|testing|unit test|integration test|coverage)\b/i;
const DELIVERABLE_SIGNALS = /\b(provide|return|output|deliver|include|show|generate|write|implementation|code|files?)\b/i;
const ACCEPTANCE_SIGNALS = /\b(acceptance criteria|must pass|done when|success criteria|expected result)\b/i;
const CONTEXT_SIGNALS = /\b(existing|current|repository|repo|codebase|project|application|user|customer|domain|database|api)\b/i;

function hasSignal(prompt: string, signal: RegExp): boolean {
  return signal.test(prompt);
}

function clamp(score: number, maximum: number): number {
  return Math.max(0, Math.min(maximum, Math.round(score)));
}

function scoreInterpretation(score: number): string {
  if (score <= 20) return "Very weak";
  if (score <= 40) return "Weak";
  if (score <= 60) return "Needs clarification";
  if (score <= 80) return "Good";
  return "Strong";
}

function severityForGap(gap: number): "high" | "medium" | "low" {
  if (gap >= 12) return "high";
  if (gap >= 6) return "medium";
  return "low";
}

function addWeakness(
  weaknesses: PromptWeakness[],
  recommendations: PromptRecommendation[],
  condition: boolean,
  title: string,
  description: string,
  reason: string,
  gap: number,
) {
  if (!condition) return;
  const severity = severityForGap(gap);
  weaknesses.push({ title, description, severity, explanation: reason });
  recommendations.push({ title, description: `Add this detail to the prompt: ${description}`, reason });
}

function improvePrompt(prompt: string, scores: Record<CriterionName, number>): string {
  const technicalDetails = hasSignal(prompt, TECHNICAL_SIGNALS)
    ? "Preserve the technologies and tools named in the original request."
    : "[Name the relevant language, framework, or tools if implementation choices matter].";
  const behaviorDetails = hasSignal(prompt, BEHAVIOR_SIGNALS)
    ? "Preserve the requested behaviors and user interactions from the original request."
    : "[List the core behaviors the implementation must support].";
  const qualityDetails = [
    hasSignal(prompt, ERROR_SIGNALS) ? "Keep the requested loading, error, or validation behavior." : "[Add relevant validation, loading, and error behavior].",
    hasSignal(prompt, ACCESSIBILITY_SIGNALS) ? "Keep the accessibility requirements already specified." : "[Add accessibility requirements when this is a user-facing interface].",
    hasSignal(prompt, TESTING_SIGNALS) ? "Include the testing requirement already specified." : "[Specify relevant tests or acceptance checks].",
  ];
  const deliverables = hasSignal(prompt, DELIVERABLE_SIGNALS)
    ? "Return the deliverables requested in the original prompt."
    : "[Specify the files, code, explanation, or other deliverables expected].";
  const acceptance = hasSignal(prompt, ACCEPTANCE_SIGNALS)
    ? "Use the acceptance criteria already provided."
    : "[Define how a reviewer can verify that the task is complete].";

  return [
    "# Template-based improved prompt",
    "",
    "## Task",
    prompt,
    "",
    "## Known details",
    `- ${technicalDetails}`,
    `- ${behaviorDetails}`,
    "",
    "## Relevant quality requirements",
    ...qualityDetails.map((detail) => `- ${detail}`),
    "",
    "## Deliverables",
    `- ${deliverables}`,
    "",
    "## Acceptance criteria",
    `- ${acceptance}`,
    "",
    "## Clarifications to resolve",
    `- [Clarify the remaining ${scores.context < LOCAL_RUBRIC.context / 2 ? "project context and " : ""}implementation decisions without assuming facts not included above].`,
  ].join("\n");
}

function buildDimensions(prompt: string): CriterionScore[] {
  const words = prompt.trim().split(/\s+/).filter(Boolean);
  const hasAction = /\b(build|create|implement|design|develop|add|fix|update|make|write)\b/i.test(prompt);
  const hasConcreteObject = words.length >= 3 && !/^create\s+(a|an|the)\s+\w+\.?$/i.test(prompt.trim());
  const clarity = clamp(4 + (hasAction ? 8 : 0) + (hasConcreteObject ? 5 : 0) + (words.length >= 12 ? 3 : 0), LOCAL_RUBRIC.clarity);
  const specificity = clamp(
    2 + (hasSignal(prompt, TECHNICAL_SIGNALS) ? 6 : 0) + (hasSignal(prompt, UI_SIGNALS) ? 4 : 0) + (hasSignal(prompt, BEHAVIOR_SIGNALS) ? 5 : 0) + (words.length >= 20 ? 3 : 0),
    LOCAL_RUBRIC.specificity,
  );
  const context = clamp(
    2 + (hasSignal(prompt, CONTEXT_SIGNALS) ? 5 : 0) + (words.length >= 18 ? 4 : 0) + (hasSignal(prompt, /\bfor users?\b/i) ? 2 : 0),
    LOCAL_RUBRIC.context,
  );
  const completeness = clamp(
    3 + (hasSignal(prompt, BEHAVIOR_SIGNALS) ? 5 : 0) + (hasSignal(prompt, ERROR_SIGNALS) ? 4 : 0) + (hasSignal(prompt, ACCEPTANCE_SIGNALS) ? 5 : 0) + (hasSignal(prompt, DELIVERABLE_SIGNALS) ? 3 : 0),
    LOCAL_RUBRIC.completeness,
  );
  const constraints = clamp(
    2 + (hasSignal(prompt, TECHNICAL_SIGNALS) ? 5 : 0) + (hasSignal(prompt, ACCESSIBILITY_SIGNALS) ? 3 : 0) + (hasSignal(prompt, TESTING_SIGNALS) ? 3 : 0) + (hasSignal(prompt, /\b(performance|security|compatib|browser|responsive|mobile|desktop)\b/i) ? 2 : 0),
    LOCAL_RUBRIC.constraints,
  );
  const expectedOutput = clamp(2 + (hasSignal(prompt, DELIVERABLE_SIGNALS) ? 4 : 0) + (hasSignal(prompt, ACCEPTANCE_SIGNALS) ? 3 : 0) + (hasSignal(prompt, /\b(format|structure|files|components|steps)\b/i) ? 1 : 0), LOCAL_RUBRIC.expected_output);

  return [
    { name: "clarity", score: clarity, max_score: LOCAL_RUBRIC.clarity, assessment: clarity >= 14 ? "The requested outcome is reasonably clear." : "The requested outcome needs more precision." },
    { name: "specificity", score: specificity, max_score: LOCAL_RUBRIC.specificity, assessment: specificity >= 14 ? "Concrete implementation details are present." : "More concrete implementation details would reduce ambiguity." },
    { name: "context", score: context, max_score: LOCAL_RUBRIC.context, assessment: context >= 10 ? "Relevant project or task context is included." : "Relevant project context is limited." },
    { name: "completeness", score: completeness, max_score: LOCAL_RUBRIC.completeness, assessment: completeness >= 14 ? "Several task behaviors and quality checks are covered." : "Important task behavior or completion details are missing." },
    { name: "constraints", score: constraints, max_score: LOCAL_RUBRIC.constraints, assessment: constraints >= 10 ? "Relevant technical or quality constraints are stated." : "Few relevant constraints are stated." },
    { name: "expected_output", score: expectedOutput, max_score: LOCAL_RUBRIC.expected_output, assessment: expectedOutput >= 7 ? "The expected deliverable is reasonably clear." : "The expected deliverable should be made explicit." },
  ];
}

export function analyzePromptLocally(prompt: string): AnalyzePromptResponse {
  const normalizedPrompt = prompt.trim();
  const dimensions = buildDimensions(normalizedPrompt);
  const scores = Object.fromEntries(dimensions.map((dimension) => [dimension.name, dimension.score])) as Record<CriterionName, number>;
  const totalScore = dimensions.reduce((total, dimension) => total + dimension.score, 0);
  const weaknesses: PromptWeakness[] = [];
  const recommendations: PromptRecommendation[] = [];
  const missingRequirements: string[] = [];

  addWeakness(weaknesses, recommendations, scores.clarity < 12, "Clarify the requested outcome", "State the concrete result the implementation should produce.", "A precise outcome gives the implementer a reliable target.", LOCAL_RUBRIC.clarity - scores.clarity);
  addWeakness(weaknesses, recommendations, scores.specificity < 12, "Add implementation details", "Name relevant technologies, components, behaviors, or boundaries that are already important to the task.", "Specific details reduce the number of unsupported assumptions.", LOCAL_RUBRIC.specificity - scores.specificity);
  addWeakness(weaknesses, recommendations, scores.context < 8 && normalizedPrompt.split(/\s+/).length > 5, "Add relevant context", "Describe the existing project, users, or surrounding system only where that context affects the requested work.", "Relevant context helps the implementer fit the change into its intended environment.", LOCAL_RUBRIC.context - scores.context);
  addWeakness(weaknesses, recommendations, scores.completeness < 12, "Define important behavior", "List the core behavior, validation, states, or edge cases that matter for this task.", "Behavioral detail makes the result easier to implement and review.", LOCAL_RUBRIC.completeness - scores.completeness);
  addWeakness(weaknesses, recommendations, scores.constraints < 9, "State relevant constraints", "Specify applicable framework, accessibility, compatibility, security, performance, or testing constraints.", "Relevant constraints keep a technically plausible solution aligned with the project.", LOCAL_RUBRIC.constraints - scores.constraints);
  addWeakness(weaknesses, recommendations, scores.expected_output < 6, "Specify deliverables", "Say whether the response should include code, files, architecture, tests, steps, or another concrete output.", "An explicit output format makes the response more useful and reviewable.", LOCAL_RUBRIC.expected_output - scores.expected_output);

  if (scores.completeness < 12 && hasSignal(normalizedPrompt, UI_SIGNALS) && !hasSignal(normalizedPrompt, ERROR_SIGNALS)) missingRequirements.push("Relevant loading, validation, and error states");
  if (scores.constraints < 9 && hasSignal(normalizedPrompt, UI_SIGNALS) && !hasSignal(normalizedPrompt, ACCESSIBILITY_SIGNALS)) missingRequirements.push("Accessibility expectations");
  if (scores.expected_output < 6) missingRequirements.push("Expected deliverables and acceptance checks");

  return {
    id: Date.now(),
    original_prompt: normalizedPrompt,
    improved_prompt: improvePrompt(normalizedPrompt, scores),
    total_score: totalScore,
    score_interpretation: scoreInterpretation(totalScore),
    dimensions,
    weaknesses,
    missing_requirements: missingRequirements,
    recommendations,
    rubric_version: "local-1.0",
    model_name: "local-rule-engine",
    created_at: new Date().toISOString(),
  };
}
