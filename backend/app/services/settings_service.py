import logging
from datetime import datetime, timezone
from typing import Dict, Optional

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings

logger = logging.getLogger(__name__)

# Keys managed through the admin settings panel
CAPI_KEYS = [
    "ENABLE_CAPI",
    "ENABLE_META_CAPI",
    "META_PIXEL_ID",
    "META_ACCESS_TOKEN",
    "META_API_VERSION",
    "ENABLE_TIKTOK_CAPI",
    "TIKTOK_PIXEL_CODE",
    "TIKTOK_ACCESS_TOKEN",
    "TIKTOK_API_VERSION",
]

MASKED_KEYS = {"META_ACCESS_TOKEN", "TIKTOK_ACCESS_TOKEN"}


async def get_all_settings(db: AsyncSession) -> Dict[str, str]:
    """Return all CAPI settings, merging env defaults with DB overrides."""
    env = get_settings()
    defaults: Dict[str, str] = {
        "ENABLE_CAPI": str(env.ENABLE_CAPI).lower(),
        "ENABLE_META_CAPI": str(env.ENABLE_META_CAPI).lower(),
        "META_PIXEL_ID": env.META_PIXEL_ID,
        "META_ACCESS_TOKEN": env.META_ACCESS_TOKEN,
        "META_API_VERSION": env.META_API_VERSION or "v20.0",
        "ENABLE_TIKTOK_CAPI": str(env.ENABLE_TIKTOK_CAPI).lower(),
        "TIKTOK_PIXEL_CODE": env.TIKTOK_PIXEL_CODE or env.TIKTOK_PIXEL_ID,
        "TIKTOK_ACCESS_TOKEN": env.TIKTOK_ACCESS_TOKEN,
        "TIKTOK_API_VERSION": env.TIKTOK_API_VERSION or "v1.3",
    }

    try:
        result = await db.execute(
            text("SELECT key, value FROM app_settings WHERE key = ANY(:keys)"),
            {"keys": CAPI_KEYS},
        )
        for row in result.mappings():
            defaults[row["key"]] = row["value"]
    except Exception as e:
        logger.warning(f"Could not read app_settings from DB: {e}")

    return defaults


async def get_setting(db: AsyncSession, key: str) -> Optional[str]:
    settings = await get_all_settings(db)
    return settings.get(key)


async def upsert_settings(db: AsyncSession, updates: Dict[str, str]) -> None:
    now = datetime.now(timezone.utc).replace(tzinfo=None)
    for key, value in updates.items():
        if key not in CAPI_KEYS:
            continue
        await db.execute(
            text("""
                INSERT INTO app_settings (key, value, updated_at)
                VALUES (:key, :value, :now)
                ON CONFLICT (key) DO UPDATE
                  SET value = EXCLUDED.value,
                      updated_at = EXCLUDED.updated_at
            """),
            {"key": key, "value": value, "now": now},
        )
    await db.commit()


def mask_settings(settings: Dict[str, str]) -> Dict[str, str]:
    """Return settings safe for the frontend — tokens shown as masked."""
    masked = {}
    for k, v in settings.items():
        if k in MASKED_KEYS and v:
            masked[k] = v[:6] + "••••••••••••" + v[-4:] if len(v) > 10 else "••••••••"
        else:
            masked[k] = v
    return masked
