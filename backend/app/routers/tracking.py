import asyncio
from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.schemas.tracking import TrackingEventRequest
from app.services.settings_service import get_all_settings
from app.services.tracking_service import send_tracking_event_safe

router = APIRouter(prefix="/tracking", tags=["tracking"])


@router.post("/event")
async def track_event(event: TrackingEventRequest, request: Request, db: AsyncSession = Depends(get_db)):
    """Server-side CAPI endpoint. Returns immediately; fires events in background."""
    if not event.user_data.client_ip_address:
        client_ip = request.headers.get("X-Forwarded-For", "").split(",")[0].strip()
        if not client_ip:
            client_ip = request.client.host if request.client else ""
        event.user_data.client_ip_address = client_ip

    if not event.user_data.client_user_agent:
        event.user_data.client_user_agent = request.headers.get("User-Agent", "")

    # Fetch settings now (in-request) so the background task has them without needing DB
    cfg = await get_all_settings(db)

    asyncio.create_task(send_tracking_event_safe(event, cfg))

    return {"status": "queued", "event_id": event.event_id}
