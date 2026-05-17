# Nura Skin — Nama Beauty

> Premium Moroccan DTC Skincare Brand

**Domain:** nuraskin.cc  
**API:** api.nuraskin.cc  
**Market:** Morocco (COD)  
**Language:** Arabic Darija-first

---

## Stack

- **Frontend:** Next.js 14 App Router + TailwindCSS + TypeScript + Zustand
- **Backend:** Python FastAPI + SQLModel + Alembic + PostgreSQL
- **Infra:** Docker + EasyPanel

## Quick Start

### Frontend (development)
```bash
cd frontend
cp ../env/frontend.env.example .env.local
# Fill in .env.local with real values
npm install
npm run dev
```

### Backend (development)
```bash
cd backend
cp ../env/backend.env.example .env
# Fill in .env with DATABASE_URL and other values
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

### Docker (full stack)
```bash
# Copy and fill env files first
cp env/backend.env.example env/backend.env
# Edit env/backend.env with real values

docker-compose up --build
```

## Project Structure

```
nuraskin/
├── frontend/          Next.js App Router
├── backend/           FastAPI backend
├── docs/              Architecture & strategy docs
├── sheets/            CSV templates for ops
├── env/               Environment variable examples
├── docker/            Dockerfiles
└── docker-compose.yml Production compose
```

## Documentation

| File | Description |
|---|---|
| docs/architecture.md | System architecture |
| docs/brand-strategy.md | Brand identity & voice |
| docs/icp-psychology.md | Customer psychology |
| docs/moroccan-cod-psychology.md | COD market dynamics |
| docs/product-positioning.md | Product strategy |
| docs/cro-strategy.md | Conversion optimization |
| docs/tracking-analytics.md | Pixel & CAPI setup |
| docs/order-flow.md | Order lifecycle |
| docs/deployment.md | EasyPanel deployment guide |
| docs/qa-checklist.md | Pre-launch checklist |

## Products

1. **مركّز نيورا بالانس** (Nura Balance) — 189 MAD — Niacinamide 10%
2. **كريم نيورا رينيو الليلي** (Nura Night Renewal) — 229 MAD — Bakuchiol
3. **سيروم نيورا آي ريفايف** (Nura Eye Revive) — 199 MAD — Caffeine + Peptides

## Secrets Policy

**Never commit:**
- `env/frontend.env` (real values)
- `env/backend.env` (real values)
- `backend/.env`
- `frontend/.env.local`

Only commit `.env.example` files with empty values.

---

Built for Morocco. COD-first. Premium by design.
