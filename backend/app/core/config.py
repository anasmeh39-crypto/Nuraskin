import os
from urllib.parse import quote_plus

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Database — loaded from env only, never hardcoded
    DATABASE_URL: str = Field(default="")

    @field_validator("DATABASE_URL", mode="before")
    @classmethod
    def normalize_database_url(cls, value: str | None) -> str:
        value = (value or "").strip()
        if not value:
            value = (
                os.getenv("POSTGRES_URL")
                or os.getenv("POSTGRESQL_URL")
                or os.getenv("DATABASE_PRIVATE_URL")
                or os.getenv("DATABASE_PUBLIC_URL")
                or ""
            ).strip()
        if not value:
            host = os.getenv("POSTGRES_HOST") or os.getenv("POSTGRESQL_HOST")
            user = os.getenv("POSTGRES_USER") or os.getenv("POSTGRESQL_USER")
            password = os.getenv("POSTGRES_PASSWORD") or os.getenv("POSTGRESQL_PASSWORD")
            database = (
                os.getenv("POSTGRES_DB")
                or os.getenv("POSTGRES_DATABASE")
                or os.getenv("POSTGRESQL_DATABASE")
            )
            port = os.getenv("POSTGRES_PORT") or os.getenv("POSTGRESQL_PORT") or "5432"
            if host and user and password and database:
                value = (
                    f"postgresql://{quote_plus(user)}:{quote_plus(password)}"
                    f"@{host}:{port}/{database}"
                )
        if not value:
            raise ValueError(
                "DATABASE_URL is missing. In EasyPanel backend environment, set "
                "DATABASE_URL to your PostgreSQL internal connection string."
            )
        # EasyPanel/Postgres often exposes postgresql:// URLs, while this app uses
        # SQLAlchemy's asyncpg driver.
        if value.startswith("postgresql://"):
            return value.replace("postgresql://", "postgresql+asyncpg://", 1)
        return value

    # Server
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    ENVIRONMENT: str = "production"
    DEBUG: bool = False

    # CORS
    CORS_ORIGINS: str = "https://nuraskin.cc"

    @property
    def cors_origins_list(self) -> List[str]:
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]

    # Meta CAPI
    META_PIXEL_ID: str = ""
    META_ACCESS_TOKEN: str = ""
    META_TEST_EVENT_CODE: str = ""

    # TikTok Events API
    TIKTOK_PIXEL_ID: str = ""
    TIKTOK_ACCESS_TOKEN: str = ""

    # Google Sheets
    GOOGLE_SERVICE_ACCOUNT_JSON: str = ""
    GOOGLE_SHEET_ID: str = ""

    # Logging
    LOG_LEVEL: str = "INFO"

    # Security
    SECRET_KEY: str = ""


_settings: Settings | None = None


def get_settings() -> Settings:
    global _settings
    if _settings is None:
        _settings = Settings()
    return _settings
