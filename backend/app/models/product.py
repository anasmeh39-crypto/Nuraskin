from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime, timezone


class Product(SQLModel, table=True):
    __tablename__ = "products"

    id: Optional[int] = Field(default=None, primary_key=True)
    slug: str = Field(max_length=50, unique=True, index=True)
    name_ar: str = Field(max_length=150)
    name_en: Optional[str] = Field(default=None, max_length=150)
    description_ar: Optional[str] = Field(default=None)
    meta_description_ar: Optional[str] = Field(default=None, max_length=300)
    price: float = Field(ge=0)
    stock: int = Field(default=999, ge=0)
    is_active: bool = Field(default=True)
    sort_order: int = Field(default=0)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
