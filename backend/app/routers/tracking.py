import asyncio
from fastapi import APIRouter, Request
from app.schemas.tracking import TrackingEventRequest
from app.services.tracking_service import send_tracking_event_safe

router = APIRouter(prefix="/tracking", tags=["tracking"])


@router.post("/event")
async def track_event(event: TrackingEventRequest, request: Request):
    """Server-side pixel event endpoint. Non-blocking — returns immediately."""
    # Enrich with server IP if not provided
    if not event.user_data.client_ip_address:
        client_ip = request.headers.get("X-Forwarded-For", "").split(",")[0].strip()
        if not client_ip:
            client_ip = request.client.host if request.client else ""
        event.user_data.client_ip_address = client_ip

    if not event.user_data.client_user_agent:
        event.user_data.client_user_agent = request.headers.get("User-Agent", "")

    asyncio.create_task(send_tracking_event_safe(event))

    return {"status": "queued", "event_id": event.event_id}
