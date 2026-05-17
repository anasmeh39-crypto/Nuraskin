from pydantic import BaseModel
from typing import Optional, List, Dict, Any


class UserDataIn(BaseModel):
    phone: Optional[str] = None
    client_ip_address: Optional[str] = None
    client_user_agent: Optional[str] = None


class TrackingEventRequest(BaseModel):
    event_name: str
    event_id: str
    event_time: int  # Unix timestamp
    user_data: UserDataIn
    custom_data: Dict[str, Any] = {}
    page_url: Optional[str] = None
    channels: List[str] = ["meta"]  # "meta", "tiktok"
