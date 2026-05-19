from pydantic import BaseModel, field_validator
import re
from typing import List, Optional


MOROCCO_PHONE_RE = re.compile(r'^0[67]\d{8}$')


class OrderItemIn(BaseModel):
    product_slug: str
    quantity: int = 1
    unit_price: Optional[float] = None
    compare_at_price: Optional[float] = None
    bundle_name: Optional[str] = None
    discount_amount: Optional[float] = None


class CreateOrderRequest(BaseModel):
    customer_name: str
    customer_phone: str
    customer_address: Optional[str] = None
    customer_city: Optional[str] = None
    items: List[OrderItemIn]
    total: float
    shipping_cost: float = 30.0
    source_url: Optional[str] = None
    event_id: Optional[str] = None

    @field_validator("customer_phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        phone = v.replace(" ", "").replace("-", "")
        if not MOROCCO_PHONE_RE.match(phone):
            raise ValueError("رقم الهاتف غير صحيح، يجب أن يبدأ بـ 06 أو 07 ويتكون من 10 أرقام")
        return phone

    @field_validator("customer_name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("الاسم قصير جداً")
        return v


class UpsellProductOut(BaseModel):
    slug: str
    name_ar: str
    price: float
    discounted_price: float
    discount_percent: int


class OrderItemOut(BaseModel):
    product_slug: str
    product_name: str
    quantity: int
    unit_price: float
    is_upsell: bool
    compare_at_price: Optional[float] = None
    bundle_name: Optional[str] = None
    discount_amount: Optional[float] = None


class CreateOrderResponse(BaseModel):
    order_id: str
    order_number: str
    status: str
    total: float
    shipping_cost: float
    upsell_eligible: bool
    upsell_product: Optional[UpsellProductOut] = None


class AcceptUpsellRequest(BaseModel):
    upsell_product_slug: str
    upsell_price: float


class AcceptUpsellResponse(BaseModel):
    order_number: str
    new_total: float
    status: str


class OrderDetailResponse(BaseModel):
    order_number: str
    status: str
    customer_name: str
    customer_address: Optional[str] = None
    customer_city: Optional[str] = None
    total: float
    shipping_cost: float
    items: List[OrderItemOut]
    upsell_accepted: bool
