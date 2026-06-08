import asyncio
import hashlib
import logging
import time
from typing import Any, Dict

import httpx

from app.schemas.tracking import TrackingEventRequest

logger = logging.getLogger(__name__)


def hash_pii(value: str) -> str:
    return hashlib.sha256(value.strip().lower().encode()).hexdigest()


def normalize_phone(phone: str) -> str:
    phone = phone.replace(" ", "").replace("-", "")
    if phone.startswith("0"):
        return "+212" + phone[1:]
    return phone


def _is_enabled(cfg: Dict[str, str], key: str) -> bool:
    return cfg.get(key, "true").lower() not in ("false", "0", "no")


async def send_meta_capi_event(event: TrackingEventRequest, cfg: Dict[str, str]) -> bool:
    if not _is_enabled(cfg, "ENABLE_META_CAPI"):
        return False

    pixel_id = cfg.get("META_PIXEL_ID", "")
    access_token = cfg.get("META_ACCESS_TOKEN", "")
    if not pixel_id or not access_token:
        logger.debug("Meta CAPI not configured, skipping")
        return False

    user_data: Dict[str, Any] = {
        "client_ip_address": event.user_data.client_ip_address,
        "client_user_agent": event.user_data.client_user_agent,
        "country": ["sa"],
    }
    if event.user_data.phone:
        user_data["ph"] = [hash_pii(normalize_phone(event.user_data.phone))]

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
        "access_token": access_token,
    }

    version = cfg.get("META_API_VERSION") or "v20.0"
    url = f"https://graph.facebook.com/{version}/{pixel_id}/events"

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, json=payload)
            if resp.status_code == 200:
                logger.info(f"Meta CAPI sent: {event.event_name} [{event.event_id}]")
                return True
            logger.warning(f"Meta CAPI error {resp.status_code}: {resp.text}")
            return False
    except Exception as e:
        logger.error(f"Meta CAPI request failed: {e}")
        return False


async def send_tiktok_event(event: TrackingEventRequest, cfg: Dict[str, str]) -> bool:
    if not _is_enabled(cfg, "ENABLE_TIKTOK_CAPI"):
        return False

    pixel_code = cfg.get("TIKTOK_PIXEL_CODE", "")
    access_token = cfg.get("TIKTOK_ACCESS_TOKEN", "")
    if not pixel_code or not access_token:
        logger.debug("TikTok Events API not configured, skipping")
        return False

    context: Dict[str, Any] = {
        "ip": event.user_data.client_ip_address,
        "user_agent": event.user_data.client_user_agent,
        "page": {"url": event.page_url},
    }
    if event.user_data.phone:
        context["user"] = {"phone_number": hash_pii(normalize_phone(event.user_data.phone))}

    version = cfg.get("TIKTOK_API_VERSION") or "v1.3"
    payload = {
        "pixel_code": pixel_code,
        "event": event.event_name,
        "event_id": event.event_id,
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S+00:00", time.gmtime(event.event_time)),
        "context": context,
        "properties": event.custom_data,
    }

    url = f"https://business-api.tiktok.com/open_api/{version}/event/track/"

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.post(url, json=payload, headers={"Access-Token": access_token})
            if resp.status_code == 200:
                logger.info(f"TikTok CAPI sent: {event.event_name} [{event.event_id}]")
                return True
            logger.warning(f"TikTok CAPI error {resp.status_code}: {resp.text}")
            return False
    except Exception as e:
        logger.error(f"TikTok CAPI request failed: {e}")
        return False


async def send_tracking_event_safe(event: TrackingEventRequest, cfg: Dict[str, str]) -> None:
    """Fire CAPI events to all requested channels — best-effort, non-blocking."""
    if not _is_enabled(cfg, "ENABLE_CAPI"):
        return

    tasks = []
    if "meta" in event.channels:
        tasks.append(send_meta_capi_event(event, cfg))
    if "tiktok" in event.channels:
        tasks.append(send_tiktok_event(event, cfg))

    if tasks:
        results = await asyncio.gather(*tasks, return_exceptions=True)
        for r in results:
            if isinstance(r, Exception):
                logger.error(f"Tracking task failed: {r}")
