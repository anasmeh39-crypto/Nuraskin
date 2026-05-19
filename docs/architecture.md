# Nura Skin — System Architecture

## Overview

Nura Skin is a premium Moroccan DTC skincare brand operating under the Nama Beauty signature. The system is a decoupled, production-grade ecommerce stack optimized for the Moroccan COD (Cash on Delivery) market.

---

## Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | Next.js 14 App Router | SSR/SSG, SEO, performance |
| Styling | TailwindCSS + custom design tokens | RTL, mobile-first, premium feel |
| Language | TypeScript | Type safety, scalability |
| State | Zustand | Lightweight cart + UI state |
| Backend | Python FastAPI | Async, fast, clean |
| ORM | SQLModel | Pydantic + SQLAlchemy unified |
| Migrations | Alembic | Auto-run on startup |
| Database | PostgreSQL | Relational, reliable |
| Sheets | Google Sheets API v4 | Ops team order visibility |
| Containers | Docker + Docker Compose | Portability, EasyPanel deployment |
| Reverse Proxy | Caddy (via EasyPanel) | TLS, routing |

---

## Domain Structure

```
nuraskin.cc          → Next.js frontend
api.nuraskin.cc      → FastAPI backend
```

---

## High-Level Architecture

```
Browser (Mobile-first)
    │
    ├─ Next.js App (nuraskin.cc)
    │   ├─ Static pages: Home, Collection, About, Contact, Policies
    │   ├─ Dynamic: Product pages /products/[slug]
    │   ├─ Client components: CartDrawer, CheckoutPopup, UpsellModal
    │   └─ Server components: Metadata, structured data, OG tags
    │
    └─ API calls → FastAPI (api.nuraskin.cc)
            ├─ POST /orders          → Create order
            ├─ POST /orders/{id}/upsell → Accept upsell
            ├─ GET  /products        → Product catalog
            ├─ POST /tracking/event  → Server-side pixel events
            └─ Webhooks (future: delivery status)
                    │
                    ├─ PostgreSQL (orders, products, upsells)
                    └─ Google Sheets (ops mirror)
```

---

## Data Flow

### Checkout Flow
```
Product Page → Add to Cart → Cart Drawer → Open Checkout Popup
→ Fill name + phone → Validate Morocco number → POST /orders
→ Redirect to Upsell Popup/Page (no countdown)
→ Accept? → POST /orders/{id}/upsell → Redirect to Thank-You
→ Decline? → Redirect to Thank-You
```

### Order State Machine
```
PENDING → CONFIRMED → SHIPPED → DELIVERED
                  └→ CANCELLED
```

---

## Frontend Architecture

### App Router Structure
```
app/
  layout.tsx            Root layout (RTL, fonts, analytics scripts)
  page.tsx              Home page (SSG)
  products/
    page.tsx            Collection page
    [slug]/page.tsx     Product detail page (generateStaticParams)
  about/page.tsx
  contact/page.tsx
  checkout/
    page.tsx            Checkout redirect handler
    upsell/page.tsx     Post-checkout upsell (client component)
  thank-you/page.tsx
  policies/
    returns/page.tsx
    privacy/page.tsx
    terms/page.tsx
```

### State Management
- **Cart**: Zustand store with localStorage persistence
- **Checkout**: Local component state (form fields)
- **UI**: Zustand for drawer/popup open state
- **Tracking**: Module-level singleton, deferred initialization

---

## Backend Architecture

### Clean Layered Structure
```
routers/    → HTTP handlers, request validation
services/   → Business logic (pure functions)
models/     → SQLModel table definitions
schemas/    → Pydantic request/response shapes
db/         → Session factory, connection
core/       → Config, dependencies, security
```

### Auto-Migration on Startup
```python
# main.py startup event
@app.on_event("startup")
async def startup():
    run_alembic_migrations()  # alembic upgrade head
    await init_db()
```

---

## Tracking Architecture

### Client-Side (Deferred)
- Meta Pixel → `fbq()` initialized after page load
- TikTok Pixel → `ttq()` deferred
- Snapchat Pixel → `snaptr()` deferred
- Event deduplication via `event_id` (UUID per event)

### Server-Side (CAPI)
- Meta Conversions API → `/tracking/event` endpoint
- TikTok Events API → same endpoint, different channel
- PII hashed server-side (SHA-256: email, phone, name)
- Deduplication: same `event_id` sent client + server

---

## Deployment

### EasyPanel (Recommended)
- Frontend service: Node.js / Docker, port 3000
- Backend service: Python / Docker, port 8000
- PostgreSQL: managed EasyPanel database
- Domain routing via EasyPanel Caddy proxy

### Environment
- All secrets in `.env` files mounted at runtime
- No secrets in source code or Docker images
- `DATABASE_URL` only in `env/backend.env`

---

## Security Considerations
- CORS restricted to `nuraskin.cc` origin
- No authentication required (COD, no user accounts)
- Rate limiting on `/orders` endpoint (future: Redis)
- PII hashed before sending to tracking platforms
- SQL injection prevention via SQLModel ORM
