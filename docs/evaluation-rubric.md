# Prompt Evaluation Rubric

Scores are heuristic assessments, not objective guarantees. A prompt is evaluated only against requirements relevant to its stated task. Missing irrelevant details must not reduce its score.

| Dimension | Maximum |
| --- | ---: |
| Clarity | 15 |
| Specificity | 15 |
| Context | 20 |
| Completeness | 20 |
| Constraints | 15 |
| Expected output | 15 |
| **Total** | **100** |

The evaluator must not invent repositories, frameworks, APIs, user personas, constraints, or acceptance criteria. Recommendations must explain why each addition is relevant. Improved prompts may make implied needs explicit, but must not fabricate facts.

Interpretation bands:

- 0-20: Very weak
- 21-40: Weak
- 41-60: Needs clarification
- 61-80: Good
- 81-100: Strong

The backend must validate structured provider output and calculate the total from the six dimension scores.
