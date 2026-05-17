import hashlib
import logging
import time
from typing import Any, Dict, List, Optional
import httpx

from app.core.config import get_settings
from app.schemas.tracking import TrackingEventRequest

logger = logging.getLogger(__name__)


def hash_pii(value: str) -> str:
    """SHA-256 hash of normalized PII."""
    return hashlib.sha256(value.strip().lower().encode()).hexdigest()


def normalize_phone(phone: str) -> str:
    """Convert Moroccan phone to international format."""
    phone = phone.replace(" ", "").replace("-", "")
    if phone.startswith("0"):
        return "+212" + phone[1:]
    return phone


async def send_meta_capi_event(event: TrackingEventRequest) -> bool:
    """Send event to Meta Conversions API."""
    settings = get_settings()
    if not settings.META_PIXEL_ID or not settings.META_ACCESS_TOKEN:
        logger.debug("Meta CAPI not configured, skipping")
        return False

    user_data: Dict[str, Any] = {
        "client_ip_address": event.user_data.client_ip_address,
        "client_user_agent": event.user_data.client_user_agent,
        "country": ["ma"],
    }

    if event.user_data.phone:
        hashed = hash_pii(normalize_phone(event.user_data.phone))
        user_data["ph"] = [hashed]

    payload: Dict[str, Any] = {
        "data": [{
            "event_name": event.event_name,
            "event_time": event.event_time,
            "event_id": event.event_id,
            "action_source": "website",
            "event_source_url": event.page_url,
            "user_data": user_data,
            "custom_data": event.custom_data,
        }],
        "access_token": settings.META_ACCESS_TOKEN,
    }

    if settings.META_TEST_EVENT_CODE:
        payload["test_event_code"] = settings.META_TEST_EVENT_CODE

    url = f"https://graph.facebook.com/v19.0/{settings.META_PIXEL_ID}/events"

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, json=payload)
            if resp.status_code == 200:
                logger.info(f"Meta CAPI event sent: {event.event_name} [{event.event_id}]")
                return True
            else:
                logger.warning(f"Meta CAPI error: {resp.status_code} — {resp.text}")
                return False
    except Exception as e:
        logger.error(f"Meta CAPI request failed: {e}")
        return False


async def send_tiktok_event(event: TrackingEventRequest) -> bool:
    """Send event to TikTok Events API."""
    settings = get_settings()
    if not settings.TIKTOK_PIXEL_ID or not settings.TIKTOK_ACCESS_TOKEN:
        logger.debug("TikTok Events API not configured, skipping")
        return False

    context: Dict[str, Any] = {
        "ip": event.user_data.client_ip_address,
        "user_agent": event.user_data.client_user_agent,
        "page": {"url": event.page_url},
    }

    if event.user_data.phone:
        context["user"] = {
            "phone_number": hash_pii(normalize_phone(event.user_data.phone))
        }

    payload = {
        "pixel_code": settings.TIKTOK_PIXEL_ID,
        "event": event.event_name,
        "event_id": event.event_id,
        "timestamp": time.strftime(
            "%Y-%m-%dT%H:%M:%S+00:00", time.gmtime(event.event_time)
        ),
        "context": context,
        "properties": event.custom_data,
    }

    url = "https://business-api.tiktok.com/open_api/v1.3/event/track/"

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(
                url,
                json=payload,
                headers={"Access-Token": settings.TIKTOK_ACCESS_TOKEN},
            )
            if resp.status_code == 200:
                logger.info(f"TikTok event sent: {event.event_name} [{event.event_id}]")
                return True
            else:
                logger.warning(f"TikTok Events API error: {resp.status_code} — {resp.text}")
                return False
    except Exception as e:
        logger.error(f"TikTok Events API request failed: {e}")
        return False


async def send_tracking_event_safe(event: TrackingEventRequest) -> None:
    """Send tracking event to all requested channels — non-blocking, best-effort."""
    import asyncio

    tasks = []
    if "meta" in event.channels:
        tasks.append(send_meta_capi_event(event))
    if "tiktok" in event.channels:
        tasks.append(send_tiktok_event(event))

    if tasks:
        results = await asyncio.gather(*tasks, return_exceptions=True)
        for r in results:
            if isinstance(r, Exception):
                logger.error(f"Tracking task failed: {r}")
