from ..schemas import DIMENSION_LIMITS, DimensionScore


def validate_and_total_dimensions(dimensions: list[DimensionScore]) -> int:
    by_name = {dimension.name: dimension for dimension in dimensions}
    if set(by_name) != set(DIMENSION_LIMITS):
        raise ValueError("Evaluation must contain exactly one score for each rubric dimension")

    total = 0
    for name, maximum in DIMENSION_LIMITS.items():
        dimension = by_name[name]
        if dimension.max_score != maximum:
            raise ValueError(f"Dimension {name} must have max_score {maximum}")
        if dimension.score > maximum:
            raise ValueError(f"Dimension {name} exceeds its maximum score")
        total += dimension.score
    return total


def score_interpretation(score: int) -> str:
    if score <= 20:
        return "Very weak"
    if score <= 40:
        return "Weak"
    if score <= 60:
        return "Needs clarification"
    if score <= 80:
        return "Good"
    return "Strong"
