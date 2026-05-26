import asyncio
import logging
from typing import Any

import httpx

from app.core.config import get_settings
from app.models.order import Order

logger = logging.getLogger(__name__)

WEBHOOK_TIMEOUT_SECONDS = 12
WEBHOOK_MAX_ATTEMPTS = 3


def build_sheets_webhook_payload(order: Order) -> dict[str, Any]:
    """Map an Order to the Google Apps Script webhook JSON schema."""
    items = order.items or []

    product_names: list[str] = []
    skus: list[str] = []
    pack_names: list[str] = []
    seen_products: set[str] = set()
    seen_skus: set[str] = set()
    seen_packs: set[str] = set()

    for item in items:
        if item.product_name not in seen_products:
            product_names.append(item.product_name)
            seen_products.add(item.product_name)
        if item.product_slug not in seen_skus:
            skus.append(item.product_slug)
            seen_skus.add(item.product_slug)
        if item.bundle_name and item.bundle_name not in seen_packs:
            pack_names.append(item.bundle_name)
            seen_packs.add(item.bundle_name)

    return {
        "orderId": order.order_number,
        "city": order.customer_city or "",
        "name": order.customer_name,
        "phone": order.customer_phone,
        "product": ", ".join(product_names),
        "sku": ", ".join(skus),
        "totalQty": sum(item.quantity for item in items),
        "pack": ", ".join(pack_names),
        "totalPrice": order.total,
        "status": "New",
    }


def _sync_order_to_webhook_sync(order: Order) -> None:
    """POST order payload to Google Apps Script webhook (runs in thread pool)."""
    settings = get_settings()
    webhook_url = (settings.GOOGLE_SHEETS_WEBHOOK_URL or "").strip()
    if not webhook_url:
        logger.warning(
            "GOOGLE_SHEETS_WEBHOOK_URL not configured — skipping Sheets sync for order %s",
            order.order_number,
        )
        return

    payload = build_sheets_webhook_payload(order)

    for attempt in range(WEBHOOK_MAX_ATTEMPTS):
        try:
            with httpx.Client(timeout=WEBHOOK_TIMEOUT_SECONDS, follow_redirects=True) as client:
                response = client.post(
                    webhook_url,
                    json=payload,
                    headers={"Content-Type": "application/json"},
                )
                response.raise_for_status()
            logger.info(
                "Order %s synced to Google Sheets webhook (status=%s)",
                order.order_number,
                response.status_code,
            )
            return
        except Exception as exc:
            logger.warning(
                "Sheets webhook attempt %s/%s failed for order %s: %s",
                attempt + 1,
                WEBHOOK_MAX_ATTEMPTS,
                order.order_number,
                exc,
            )
            if attempt < WEBHOOK_MAX_ATTEMPTS - 1:
                import time

                time.sleep(1)

    logger.error(
        "All Sheets webhook attempts failed for order %s — order was still saved",
        order.order_number,
    )


async def sync_order_to_sheets_safe(order: Order) -> None:
    """Best-effort async Sheets sync — never raises, runs in thread pool."""
    try:
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(None, _sync_order_to_webhook_sync, order)
    except Exception as exc:
        logger.error(
            "Sheets sync error for order %s: %s — order was still saved",
            order.order_number,
            exc,
        )
