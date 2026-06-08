from sqlmodel import SQLModel, Field
from datetime import datetime, timezone


def utc_now_naive() -> datetime:
    return datetime.now(timezone.utc).replace(tzinfo=None)


class AppSetting(SQLModel, table=True):
    __tablename__ = "app_settings"

    key: str = Field(primary_key=True, max_length=100)
    value: str = Field(default="", sa_column_kwargs={"nullable": False})
    updated_at: datetime = Field(default_factory=utc_now_naive)
