from datetime import datetime

from sqlalchemy import DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import JSON

from .database import Base


class Analysis(Base):
    __tablename__ = "analyses"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    original_prompt: Mapped[str] = mapped_column(Text, nullable=False)
    improved_prompt: Mapped[str] = mapped_column(Text, nullable=False)
    total_score: Mapped[int] = mapped_column(Integer, nullable=False)
    dimensions: Mapped[list] = mapped_column(JSON, nullable=False)
    # JSON keeps legacy string weaknesses and newer severity objects compatible.
    weaknesses: Mapped[list] = mapped_column(JSON, nullable=False)
    missing_requirements: Mapped[list[str]] = mapped_column(JSON, nullable=False)
    recommendations: Mapped[list] = mapped_column(JSON, nullable=False)
    model_name: Mapped[str] = mapped_column(String(100), nullable=False)
    rubric_version: Mapped[str] = mapped_column(String(20), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
