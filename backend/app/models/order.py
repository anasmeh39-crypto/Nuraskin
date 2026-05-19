from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime, timezone
from enum import Enum


def utc_now_naive() -> datetime:
    return datetime.now(timezone.utc).replace(tzinfo=None)


class OrderStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"


class OrderItem(SQLModel, table=True):
    __tablename__ = "order_items"

    id: Optional[int] = Field(default=None, primary_key=True)
    order_id: int = Field(foreign_key="orders.id", index=True)
    product_slug: str = Field(max_length=50)
    product_name: str = Field(max_length=150)
    quantity: int = Field(default=1, ge=1)
    unit_price: float = Field(ge=0)
    is_upsell: bool = Field(default=False)

    order: Optional["Order"] = Relationship(back_populates="items")


class Order(SQLModel, table=True):
    __tablename__ = "orders"

    id: Optional[int] = Field(default=None, primary_key=True)
    order_number: str = Field(max_length=30, unique=True, index=True)
    status: str = Field(default=OrderStatus.PENDING.value, max_length=20)
    customer_name: str = Field(max_length=100)
    customer_phone: str = Field(max_length=15)
    customer_address: Optional[str] = Field(default=None, max_length=255)
    customer_city: Optional[str] = Field(default=None, max_length=80)
    total: float = Field(ge=0)
    shipping_cost: float = Field(default=30.0, ge=0)
    source_url: Optional[str] = Field(default=None)
    notes: Optional[str] = Field(default=None)
    event_id: Optional[str] = Field(default=None, max_length=36)
    upsell_accepted: bool = Field(default=False)
    created_at: datetime = Field(default_factory=utc_now_naive)
    updated_at: datetime = Field(default_factory=utc_now_naive)

    items: List[OrderItem] = Relationship(back_populates="order")
