import pytest

mcp = pytest.importorskip("mcp")

from app.mcp_server import get_rubric, list_analyses


def test_rubric_tool_exposes_all_dimensions():
    rubric = get_rubric()

    assert rubric["total_possible"] == 100
    assert [dimension["name"] for dimension in rubric["dimensions"]] == [
        "clarity",
        "specificity",
        "context",
        "completeness",
        "constraints",
        "expected_output",
    ]


def test_list_tool_rejects_invalid_limit():
    with pytest.raises(ValueError, match="limit must be between"):
        list_analyses(limit=101)
