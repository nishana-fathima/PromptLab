from pathlib import Path

from alembic import command
from alembic.config import Config
from sqlalchemy import create_engine, inspect, text

from app.database import Base
from app.models import Analysis


ALEMBIC_INI = Path(__file__).parents[1] / "alembic.ini"


def run_upgrade(database_url: str) -> None:
    config = Config(str(ALEMBIC_INI))
    config.set_main_option("sqlalchemy.url", database_url)
    command.upgrade(config, "head")


def test_migration_creates_schema_and_tracks_revision(tmp_path):
    database_url = f"sqlite:///{tmp_path / 'migration.db'}"
    run_upgrade(database_url)
    engine = create_engine(database_url)
    inspector = inspect(engine)
    assert {"analyses", "alembic_version"}.issubset(inspector.get_table_names())
    with engine.connect() as connection:
        assert connection.execute(text("SELECT version_num FROM alembic_version")).scalar_one() == "20261027_0001"


def test_migration_baselines_existing_data_without_recreating_table(tmp_path):
    database_url = f"sqlite:///{tmp_path / 'existing.db'}"
    engine = create_engine(database_url)
    Base.metadata.create_all(engine)
    with engine.begin() as connection:
        connection.execute(
            text(
                "INSERT INTO analyses (original_prompt, improved_prompt, total_score, dimensions, weaknesses, "
                "missing_requirements, recommendations, model_name, rubric_version) "
                "VALUES ('legacy', 'improved', 40, '[]', '[\"legacy\"]', '[]', '[]', 'test', '1.0')"
            )
        )

    run_upgrade(database_url)

    with engine.connect() as connection:
        assert connection.execute(text("SELECT original_prompt FROM analyses")).scalar_one() == "legacy"
