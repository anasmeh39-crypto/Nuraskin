import asyncio
import logging
import time
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.schemas.order import (
    CreateOrderRequest,
    CreateOrderResponse,
    AcceptUpsellRequest,
    AcceptUpsellResponse,
    OrderDetailResponse,
    OrderItemOut,
)
from app.schemas.tracking import TrackingEventRequest, UserDataIn
from app.services import order_service
from app.services.sheets_service import sync_order_to_sheets_safe
from app.services.tracking_service import send_tracking_event_safe

router = APIRouter(prefix="/orders", tags=["orders"])
logger = logging.getLogger(__name__)


@router.post("", response_model=CreateOrderResponse, status_code=201)
async def create_order(
    data: CreateOrderRequest,
    db: AsyncSession = Depends(get_db),
):
    order, upsell = await order_service.create_order(db, data)
    await db.commit()
    await db.refresh(order)

    # Reload items for sheets sync
    order_with_items = await order_service.get_order_by_number(db, order.order_number)

    # Background: Sheets sync + server-side tracking (non-blocking)
    asyncio.create_task(sync_order_to_sheets_safe(order_with_items))

    if data.event_id:
        tracking_event = TrackingEventRequest(
            event_name="Purchase",
            event_id=data.event_id,
            event_time=int(time.time()),
            user_data=UserDataIn(phone=data.customer_phone),
            custom_data={
                "value": data.total,
                "currency": "MAD",
                "content_ids": [item.product_slug for item in data.items],
                "content_type": "product",
                "order_id": order.order_number,
            },
            page_url=data.source_url,
            channels=["meta", "tiktok"],
        )
        asyncio.create_task(send_tracking_event_safe(tracking_event))

    return CreateOrderResponse(
        order_id=str(order.id),
        order_number=order.order_number,
        status=order.status,
        total=order_service.money_to_float(order.total),
        shipping_cost=order_service.money_to_float(order.shipping_cost),
        upsell_eligible=upsell is not None,
        upsell_product=upsell,
    )


@router.post("/{order_number}/upsell", response_model=AcceptUpsellResponse)
async def accept_upsell(
    order_number: str,
    data: AcceptUpsellRequest,
    db: AsyncSession = Depends(get_db),
):
    order = await order_service.accept_upsell(
        db, order_number, data.upsell_product_slug, data.upsell_price
    )
    if not order:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")

    await db.commit()

    order_with_items = await order_service.get_order_by_number(db, order_number)
    asyncio.create_task(sync_order_to_sheets_safe(order_with_items))

    return AcceptUpsellResponse(
        order_number=order.order_number,
        new_total=order_service.money_to_float(order.total),
        status=order.status,
    )


@router.get("/{order_number}", response_model=OrderDetailResponse)
async def get_order(
    order_number: str,
    db: AsyncSession = Depends(get_db),
):
    order = await order_service.get_order_by_number(db, order_number)
    if not order:
        raise HTTPException(status_code=404, detail="الطلب غير موجود")

    return OrderDetailResponse(
        order_number=order.order_number,
        status=order.status,
        customer_name=order.customer_name,
        customer_address=order.customer_address,
        customer_city=order.customer_city,
        total=order_service.money_to_float(order.total),
        shipping_cost=order_service.money_to_float(order.shipping_cost),
        items=[
            OrderItemOut(
                product_slug=i.product_slug,
                product_name=i.product_name,
                quantity=i.quantity,
                unit_price=order_service.money_to_float(i.unit_price),
                is_upsell=i.is_upsell,
            )
            for i in (order.items or [])
        ],
        upsell_accepted=order.upsell_accepted,
    )
