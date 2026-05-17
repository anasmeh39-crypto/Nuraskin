# Nura Skin — Backend Rules

## Core Principles

### 1. No Hardcoded Secrets
- All configuration via environment variables
- `core/config.py` loads with Pydantic BaseSettings
- `.env` files never committed to git
- DATABASE_URL only in environment, never in source

### 2. Clean Architecture Layers
```
routers/   → HTTP, validation, response shaping
services/  → Business logic, pure functions
models/    → SQLModel table definitions
schemas/   → Pydantic request/response shapes  
db/        → Session management only
core/      → Config, dependencies
```

### 3. Auto-Migration on Startup
```python
# main.py
from alembic.config import Config
from alembic import command

def run_migrations():
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")
```

### 4. Dependency Injection
- Database session via `Depends(get_db)`
- Config via `Depends(get_settings)`
- Never instantiate DB connections in business logic

### 5. Async-First
- All route handlers are `async def`
- Use `asyncpg` driver for PostgreSQL
- External HTTP calls (CAPI, Sheets) use `httpx` async client

---

## API Standards

### Response Format
```json
// Success
{"data": {...}, "message": "ok"}

// Error
{"detail": "Arabic error message", "code": "ERROR_CODE"}
```

### HTTP Status Codes
- 200: Success
- 201: Created (orders)
- 400: Bad request (validation)
- 404: Not found
- 409: Conflict (duplicate order)
- 422: Validation error (Pydantic)
- 503: Service unavailable (DB down)

### Phone Validation
```python
import re

MOROCCO_PHONE_REGEX = re.compile(r'^0[67]\d{8}$')

def validate_morocco_phone(phone: str) -> str:
    phone_clean = phone.replace(' ', '').replace('-', '')
    if not MOROCCO_PHONE_REGEX.match(phone_clean):
        raise ValueError("رقم الهاتف غير صحيح")
    return phone_clean
```

---

## Error Handling

### Custom Exception Classes
```python
class NuraSkinException(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code

class OrderNotFoundException(NuraSkinException):
    def __init__(self):
        super().__init__("الطلب غير موجود", 404)

class DuplicateOrderException(NuraSkinException):
    def __init__(self):
        super().__init__("طلبك موجود بالفعل، تحقق من هاتفك", 409)
```

### Global Handler
```python
@app.exception_handler(NuraSkinException)
async def nuraskin_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.message}
    )
```

---

## Google Sheets Rules

1. Sheets sync is best-effort — failure must not block order creation
2. Run in background after order is saved to DB
3. Use service account credentials (JSON key in environment)
4. Retry logic: 3 attempts with 1s backoff
5. Log failures to application logs

```python
async def sync_to_sheets_safe(order: Order):
    """Best-effort Sheets sync — never raises."""
    try:
        await sync_order_to_sheets(order)
    except Exception as e:
        logger.error(f"Sheets sync failed for order {order.order_number}: {e}")
```

---

## Tracking Rules

1. Server-side events must not block order API response
2. Hash all PII before sending to Meta/TikTok
3. Use the `event_id` from the request for deduplication
4. Log all tracking calls with outcome (success/fail)
5. Never log raw PII in application logs

---

## Security Rules

1. CORS: Restrict to `nuraskin.cc` in production
2. Rate limiting: Implement on `/orders` (max 10/minute per IP)
3. Input sanitization: Pydantic handles automatically
4. SQL injection: SQLModel ORM prevents by default
5. No sensitive data in logs (phone numbers, etc.)

---

## Code Style

- Black formatting (line length 88)
- isort for imports
- Type hints on all functions
- Docstrings on all service functions
- No bare `except:` — always catch specific exceptions

## Forbidden Patterns

- No raw SQL strings (use SQLModel/SQLAlchemy)
- No `print()` statements (use `logging`)
- No secrets in config defaults
- No synchronous HTTP calls in async handlers
- No business logic in `main.py`
- No direct DB session in routers (use service layer)
