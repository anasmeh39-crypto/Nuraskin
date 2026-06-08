from datetime import datetime, timedelta, timezone
from typing import Dict, Optional
from urllib.parse import parse_qs, urlparse

from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.db.session import get_db
from app.services.settings_service import (
    MASKED_KEYS,
    get_all_settings,
    mask_settings,
    upsert_settings,
)

router = APIRouter(prefix="/admin", tags=["admin"])


async def verify_admin(x_admin_key: Optional[str] = Header(default=None)):
    settings = get_settings()
    if not settings.ADMIN_API_KEY or x_admin_key != settings.ADMIN_API_KEY:
        raise HTTPException(status_code=401, detail="Unauthorized")


def _since(days: int) -> datetime:
    return datetime.now(timezone.utc).replace(tzinfo=None) - timedelta(days=days)


def _parse_utm(source_url: str | None) -> dict:
    if not source_url:
        return {"source": "direct", "campaign": None}
    try:
        qs = parse_qs(urlparse(source_url).query)
        return {
            "source": (qs.get("utm_source") or ["direct"])[0],
            "campaign": (qs.get("utm_campaign") or [None])[0],
        }
    except Exception:
        return {"source": "direct", "campaign": None}


@router.get("/stats/overview")
async def overview_stats(
    days: int = 30,
    db: AsyncSession = Depends(get_db),
    _=Depends(verify_admin),
):
    result = await db.execute(
        text("""
            SELECT
                COUNT(*) AS total,
                COUNT(*) FILTER (WHERE status = 'confirmed')  AS confirmed,
                COUNT(*) FILTER (WHERE status = 'shipped')    AS shipped,
                COUNT(*) FILTER (WHERE status = 'delivered')  AS delivered,
                COUNT(*) FILTER (WHERE status = 'cancelled')  AS cancelled,
                COALESCE(SUM(total) FILTER (WHERE status != 'cancelled'), 0)                             AS revenue,
                COALESCE(SUM(total) FILTER (WHERE status = 'delivered'), 0)                              AS collected_cash,
                COALESCE(SUM(total) FILTER (WHERE status IN ('pending','confirmed','shipped')), 0)       AS pending_cash
            FROM orders
            WHERE created_at >= :since
        """),
        {"since": _since(days)},
    )
    row = result.mappings().one()
    return {
        "period_days": days,
        "total_orders": int(row["total"]),
        "confirmed_orders": int(row["confirmed"]),
        "shipped_orders": int(row["shipped"]),
        "delivered_orders": int(row["delivered"]),
        "cancelled_orders": int(row["cancelled"]),
        "revenue": float(row["revenue"]),
        "collected_cash": float(row["collected_cash"]),
        "pending_cash": float(row["pending_cash"]),
    }


@router.get("/stats/products")
async def products_stats(
    days: int = 30,
    db: AsyncSession = Depends(get_db),
    _=Depends(verify_admin),
):
    since = _since(days)

    products_result = await db.execute(
        text("""
            SELECT
                oi.product_slug,
                oi.product_name,
                SUM(oi.quantity)                    AS total_qty,
                COUNT(DISTINCT o.id)                AS order_count,
                SUM(oi.quantity * oi.unit_price)    AS total_revenue
            FROM order_items oi
            JOIN orders o ON o.id = oi.order_id
            WHERE o.created_at >= :since
              AND o.status != 'cancelled'
            GROUP BY oi.product_slug, oi.product_name
            ORDER BY total_qty DESC
            LIMIT 10
        """),
        {"since": since},
    )
    products = list(products_result.mappings())

    bundles_result = await db.execute(
        text("""
            SELECT
                oi.bundle_name,
                SUM(oi.quantity)        AS total_qty,
                COUNT(DISTINCT o.id)    AS order_count
            FROM order_items oi
            JOIN orders o ON o.id = oi.order_id
            WHERE o.created_at >= :since
              AND o.status != 'cancelled'
              AND oi.bundle_name IS NOT NULL
            GROUP BY oi.bundle_name
            ORDER BY total_qty DESC
            LIMIT 10
        """),
        {"since": since},
    )
    bundles = list(bundles_result.mappings())

    aov_result = await db.execute(
        text("""
            SELECT
                COALESCE(AVG(total), 0) AS aov,
                COUNT(*)                AS order_count
            FROM orders
            WHERE created_at >= :since
              AND status != 'cancelled'
        """),
        {"since": since},
    )
    aov_row = aov_result.mappings().one()

    return {
        "period_days": days,
        "best_selling_products": [
            {
                "slug": p["product_slug"],
                "name": p["product_name"],
                "quantity": int(p["total_qty"]),
                "order_count": int(p["order_count"]),
                "revenue": float(p["total_revenue"]),
            }
            for p in products
        ],
        "best_selling_bundles": [
            {
                "name": b["bundle_name"],
                "quantity": int(b["total_qty"]),
                "order_count": int(b["order_count"]),
            }
            for b in bundles
        ],
        "average_order_value": float(aov_row["aov"]),
        "order_count": int(aov_row["order_count"]),
    }


@router.get("/stats/cod")
async def cod_stats(
    days: int = 30,
    db: AsyncSession = Depends(get_db),
    _=Depends(verify_admin),
):
    result = await db.execute(
        text("""
            SELECT
                COUNT(*) AS total,
                COUNT(*) FILTER (WHERE status IN ('confirmed','shipped','delivered')) AS confirmed_count,
                COUNT(*) FILTER (WHERE status = 'delivered')                         AS delivered_count,
                COUNT(*) FILTER (WHERE status = 'cancelled')                         AS cancelled_count
            FROM orders
            WHERE created_at >= :since
        """),
        {"since": _since(days)},
    )
    row = result.mappings().one()

    total = int(row["total"]) or 1
    confirmed = int(row["confirmed_count"])
    delivered = int(row["delivered_count"])
    cancelled = int(row["cancelled_count"])

    return {
        "period_days": days,
        "total_orders": int(row["total"]),
        "confirmation_rate": round(confirmed / total * 100, 1),
        "delivery_rate": round(delivered / total * 100, 1),
        "refusal_rate": round(cancelled / total * 100, 1),
        "confirmed_count": confirmed,
        "delivered_count": delivered,
        "cancelled_count": cancelled,
    }


@router.get("/stats/marketing")
async def marketing_stats(
    days: int = 30,
    db: AsyncSession = Depends(get_db),
    _=Depends(verify_admin),
):
    result = await db.execute(
        text("""
            SELECT source_url, COUNT(*) AS order_count, SUM(total) AS revenue
            FROM orders
            WHERE created_at >= :since
              AND status != 'cancelled'
            GROUP BY source_url
            ORDER BY order_count DESC
        """),
        {"since": _since(days)},
    )
    rows = list(result.mappings())

    sources: dict = {}
    for row in rows:
        utm = _parse_utm(row["source_url"])
        key = utm["source"]
        if key not in sources:
            sources[key] = {"source": key, "campaigns": {}, "order_count": 0, "revenue": 0.0}
        sources[key]["order_count"] += int(row["order_count"])
        sources[key]["revenue"] += float(row["revenue"] or 0)
        campaign = utm["campaign"] or "unknown"
        if campaign not in sources[key]["campaigns"]:
            sources[key]["campaigns"][campaign] = {"order_count": 0, "revenue": 0.0}
        sources[key]["campaigns"][campaign]["order_count"] += int(row["order_count"])
        sources[key]["campaigns"][campaign]["revenue"] += float(row["revenue"] or 0)

    source_list = sorted(sources.values(), key=lambda x: x["order_count"], reverse=True)
    for s in source_list:
        s["campaigns"] = [
            {"name": k, **v}
            for k, v in sorted(
                s["campaigns"].items(), key=lambda x: x[1]["order_count"], reverse=True
            )
        ]

    return {
        "period_days": days,
        "by_source": source_list,
        "ad_spend": None,
        "cost_per_order": None,
        "cost_per_delivered_order": None,
        "roas": None,
        "note": "Ad spend metrics require Ads API integration — not yet connected.",
    }


@router.get("/settings")
async def get_settings_endpoint(
    db: AsyncSession = Depends(get_db),
    _=Depends(verify_admin),
):
    """Return current CAPI settings (tokens masked)."""
    settings = await get_all_settings(db)
    return mask_settings(settings)


@router.patch("/settings")
async def update_settings_endpoint(
    body: Dict[str, str],
    db: AsyncSession = Depends(get_db),
    _=Depends(verify_admin),
):
    """Update one or more CAPI settings. Send only the keys you want to change."""
    # Never allow saving a masked placeholder back
    filtered = {
        k: v for k, v in body.items()
        if not (k in MASKED_KEYS and "••" in v)
    }
    if filtered:
        await upsert_settings(db, filtered)
    return {"status": "saved"}
