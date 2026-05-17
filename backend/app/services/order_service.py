import logging
from datetime import datetime, timezone, date
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from app.models.order import Order, OrderItem, OrderStatus
from app.models.product import Product
from app.schemas.order import CreateOrderRequest, UpsellProductOut
import asyncio

logger = logging.getLogger(__name__)

# Upsell logic: ordered slugs → upsell product + discount
UPSELL_RULES = [
    ({"nura-balance", "nura-eye-revive"}, "nura-night-renewal", 30),
    ({"nura-balance", "nura-night-renewal"}, "nura-eye-revive", 20),
    ({"nura-night-renewal", "nura-eye-revive"}, "nura-balance", 20),
    ({"nura-balance"}, "nura-eye-revive", 25),
    ({"nura-night-renewal"}, "nura-balance", 25),
    ({"nura-eye-revive"}, "nura-balance", 25),
]


async def generate_order_number(session: AsyncSession) -> str:
    today = date.today()
    prefix = f"ORD-{today.strftime('%Y%m%d')}"

    result = await session.execute(
        select(Order).where(Order.order_number.like(f"{prefix}%"))
    )
    count = len(result.scalars().all())
    return f"{prefix}-{str(count + 1).zfill(3)}"


async def get_product_by_slug(session: AsyncSession, slug: str) -> Product | None:
    result = await session.execute(
        select(Product).where(Product.slug == slug, Product.is_active == True)
    )
    return result.scalar_one_or_none()


async def resolve_upsell(
    ordered_slugs: set[str], session: AsyncSession
) -> UpsellProductOut | None:
    """Determine the best upsell product based on what was ordered."""
    # No upsell if all 3 products are in the order
    if ordered_slugs >= {"nura-balance", "nura-night-renewal", "nura-eye-revive"}:
        return None

    for rule_slugs, upsell_slug, discount_pct in UPSELL_RULES:
        if rule_slugs == ordered_slugs:
            product = await get_product_by_slug(session, upsell_slug)
            if product:
                discounted = round(product.price * (1 - discount_pct / 100))
                return UpsellProductOut(
                    slug=product.slug,
                    name_ar=product.name_ar,
                    price=product.price,
                    discounted_price=discounted,
                    discount_percent=discount_pct,
                )

    return None


async def create_order(
    session: AsyncSession, data: CreateOrderRequest
) -> tuple[Order, UpsellProductOut | None]:
    order_number = await generate_order_number(session)

    order = Order(
        order_number=order_number,
        status=OrderStatus.PENDING,
        customer_name=data.customer_name,
        customer_phone=data.customer_phone,
        total=data.total,
        shipping_cost=data.shipping_cost,
        source_url=data.source_url,
        event_id=data.event_id,
    )
    session.add(order)
    await session.flush()  # Get the ID

    ordered_slugs: set[str] = set()

    for item_in in data.items:
        product = await get_product_by_slug(session, item_in.product_slug)
        product_name = product.name_ar if product else item_in.product_slug
        unit_price = product.price if product else 0.0

        order_item = OrderItem(
            order_id=order.id,
            product_slug=item_in.product_slug,
            product_name=product_name,
            quantity=item_in.quantity,
            unit_price=unit_price,
        )
        session.add(order_item)
        ordered_slugs.add(item_in.product_slug)

    await session.flush()

    upsell = await resolve_upsell(ordered_slugs, session)

    logger.info(f"Order created: {order_number}, phone: {data.customer_phone[:4]}****")
    return order, upsell


async def accept_upsell(
    session: AsyncSession, order_number: str, upsell_slug: str, upsell_price: float
) -> Order | None:
    result = await session.execute(
        select(Order).where(Order.order_number == order_number)
    )
    order = result.scalar_one_or_none()

    if not order:
        return None

    product = await get_product_by_slug(session, upsell_slug)
    product_name = product.name_ar if product else upsell_slug

    upsell_item = OrderItem(
        order_id=order.id,
        product_slug=upsell_slug,
        product_name=product_name,
        quantity=1,
        unit_price=upsell_price,
        is_upsell=True,
    )
    session.add(upsell_item)

    order.total += upsell_price
    order.upsell_accepted = True
    order.updated_at = datetime.now(timezone.utc)
    session.add(order)

    logger.info(f"Upsell accepted for order {order_number}: {upsell_slug} @ {upsell_price} MAD")
    return order


async def get_order_by_number(session: AsyncSession, order_number: str) -> Order | None:
    result = await session.execute(
        select(Order).where(Order.order_number == order_number)
    )
    order = result.scalar_one_or_none()
    if order:
        # Load items
        items_result = await session.execute(
            select(OrderItem).where(OrderItem.order_id == order.id)
        )
        order.items = items_result.scalars().all()
    return order
