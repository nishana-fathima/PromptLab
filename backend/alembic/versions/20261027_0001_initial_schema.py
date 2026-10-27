"""Create or safely baseline the analyses table.

Revision ID: 20261027_0001
Revises:
"""
from alembic import op
import sqlalchemy as sa

revision = "20261027_0001"
down_revision = None
branch_labels = None


REQUIRED_COLUMNS = {
    "id",
    "original_prompt",
    "improved_prompt",
    "total_score",
    "dimensions",
    "weaknesses",
    "missing_requirements",
    "recommendations",
    "model_name",
    "rubric_version",
    "created_at",
}


def upgrade() -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    if "analyses" in inspector.get_table_names():
        existing_columns = {column["name"] for column in inspector.get_columns("analyses")}
        missing = REQUIRED_COLUMNS - existing_columns
        if missing:
            raise RuntimeError(f"Existing analyses table is missing required columns: {sorted(missing)}")
        return

    op.create_table(
        "analyses",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("original_prompt", sa.Text(), nullable=False),
        sa.Column("improved_prompt", sa.Text(), nullable=False),
        sa.Column("total_score", sa.Integer(), nullable=False),
        sa.Column("dimensions", sa.JSON(), nullable=False),
        sa.Column("weaknesses", sa.JSON(), nullable=False),
        sa.Column("missing_requirements", sa.JSON(), nullable=False),
        sa.Column("recommendations", sa.JSON(), nullable=False),
        sa.Column("model_name", sa.String(length=100), nullable=False),
        sa.Column("rubric_version", sa.String(length=20), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )


def downgrade() -> None:
    # This baseline is intentionally non-destructive. Never drop user history automatically.
    pass
