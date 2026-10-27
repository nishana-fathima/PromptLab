from functools import lru_cache

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str = "sqlite:///./promptlab.db"
    openai_api_key: str | None = None
    openai_model: str = "gpt-4o-mini"
    openai_timeout_seconds: float = 60.0
    frontend_origins: str = "http://localhost:5173"
    app_environment: str = "development"
    max_prompt_length: int = Field(default=20_000, ge=10, le=100_000)

    @field_validator("openai_timeout_seconds")
    @classmethod
    def timeout_must_be_reasonable(cls, value: float) -> float:
        if value <= 0 or value > 300:
            raise ValueError("OPENAI_TIMEOUT_SECONDS must be greater than 0 and no more than 300")
        return value

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.frontend_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
