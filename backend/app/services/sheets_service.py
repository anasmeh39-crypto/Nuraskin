import logging
import json
from typing import Any
import asyncio
from app.core.config import get_settings
from app.models.order import Order

logger = logging.getLogger(__name__)


def _build_sheets_service():
    """Build Google Sheets API service from service account JSON."""
    try:
        from google.oauth2.service_account import Credentials
        from googleapiclient.discovery import build

        settings = get_settings()
        if not settings.GOOGLE_SERVICE_ACCOUNT_JSON or not settings.GOOGLE_SHEET_ID:
            logger.warning("Google Sheets not configured — skipping sync")
            return None, None

        creds_dict = json.loads(settings.GOOGLE_SERVICE_ACCOUNT_JSON)
        creds = Credentials.from_service_account_info(
            creds_dict,
            scopes=["https://www.googleapis.com/auth/spreadsheets"],
        )
        service = build("sheets", "v4", credentials=creds)
        return service, settings.GOOGLE_SHEET_ID

    except Exception as e:
        logger.error(f"Failed to build Sheets service: {e}")
        return None, None


def _sync_order_to_sheets_sync(order: Order) -> None:
    """Synchronous Sheets write — run in thread pool."""
    service, sheet_id = _build_sheets_service()
    if not service:
        return

    items = order.items or []
    items_str = ", ".join(
        f"{item.product_name} x{item.quantity}" for item in items
    )
    item_prices_str = ", ".join(
        f"{item.product_name}: {item.unit_price} MAD x{item.quantity}" for item in items
    )
    compare_prices_str = ", ".join(
        f"{item.product_name}: {item.compare_at_price} MAD"
        for item in items
        if item.compare_at_price is not None
    )
    bundle_names_str = ", ".join(
        f"{item.product_name}: {item.bundle_name}"
        for item in items
        if item.bundle_name
    )
    discount_amounts_str = ", ".join(
        f"{item.product_name}: {item.discount_amount} MAD"
        for item in items
        if item.discount_amount is not None
    )

    row = [[
        order.order_number,
        order.created_at.isoformat() if order.created_at else "",
        order.customer_name,
        order.customer_phone,
        items_str,
        str(order.total),
        str(order.shipping_cost),
        order.status,
        order.source_url or "",
        str(order.upsell_accepted),
        order.notes or "",
        item_prices_str,
        compare_prices_str,
        bundle_names_str,
        discount_amounts_str,
    ]]

    for attempt in range(3):
        try:
            service.spreadsheets().values().append(
                spreadsheetId=sheet_id,
                range="Orders!A:O",
                valueInputOption="RAW",
                insertDataOption="INSERT_ROWS",
                body={"values": row},
            ).execute()
            logger.info(f"Order {order.order_number} synced to Sheets")
            return
        except Exception as e:
            logger.warning(f"Sheets sync attempt {attempt + 1} failed: {e}")
            if attempt < 2:
                import time
                time.sleep(1)

    logger.error(f"All Sheets sync attempts failed for order {order.order_number}")


async def sync_order_to_sheets_safe(order: Order) -> None:
    """Best-effort async Sheets sync — never raises, runs in thread pool."""
    try:
        loop = asyncio.get_event_loop()
        await loop.run_in_executor(None, _sync_order_to_sheets_sync, order)
    except Exception as e:
        logger.error(f"Sheets sync error for order {order.order_number}: {e}")
