---
name: prompt-evaluation
description: Evaluates coding prompts with the PromptLab rubric and produces structured, non-inventive improvement recommendations. Use when reviewing prompt quality or improving coding instructions.
---

# Prompt Evaluation

Use this workflow when a user asks to assess or improve a coding prompt:

1. Extract only facts explicitly provided by the prompt.
2. Determine which requirements are relevant to the requested task.
3. Score clarity, specificity, context, completeness, constraints, and expected output using `docs/evaluation-rubric.md`.
4. List weaknesses and relevant missing requirements separately.
5. Recommend improvements and explain the benefit of each one.
6. Rewrite the prompt without inventing project context or unsupported requirements.
7. Check that the dimension scores use the documented maximums and that their total is between 0 and 100.

Missing irrelevant requirements are not weaknesses. Scores are heuristic and should be described as such. The improved prompt should preserve the user's intent and known constraints.
