# Nura Skin — Deployment Guide

## Infrastructure Overview

| Service | Provider | Plan |
|---|---|---|
| Frontend | EasyPanel (Docker) | Starter |
| Backend | EasyPanel (Docker) | Starter |
| Database | EasyPanel PostgreSQL | Managed |
| Domain | Registrar → EasyPanel DNS | nuraskin.cc |
| SSL | EasyPanel Caddy (auto) | Free |
| CDN | Cloudflare (optional) | Free |

---

## EasyPanel Deployment

### 1. Database
1. In EasyPanel: Services → + New → PostgreSQL
2. Name: `nuraskin-db`
3. Copy the internal connection string
4. Add to backend environment: `DATABASE_URL=postgresql://...`
   - The backend normalizes `postgresql://` to `postgresql+asyncpg://` automatically.

### 2. Backend Service
1. Services → + New → App
2. Source: GitHub repo (or Docker image)
3. Build: Dockerfile at `backend/Dockerfile`
   - If EasyPanel asks for a build context/root directory, use `backend`.
4. Port: `8000`
5. Domain: `api.nuraskin.cc`
6. Environment: paste from `env/backend.env.example` with real values

### 3. Frontend Service
1. Services → + New → App
2. Source: GitHub repo
3. Build: Dockerfile at `frontend/Dockerfile`
   - If EasyPanel asks for a build context/root directory, use `frontend`.
4. Port: `3000`
5. Domain: `nuraskin.cc`
6. Environment: paste from `env/frontend.env.example` with real values

---

## Docker Configuration

### Backend Dockerfile
```dockerfile
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Run migrations then start API
CMD ["sh", "-c", "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000"]
```

### Frontend Dockerfile
```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

---

## Environment Variable Management

### Security Rules
1. Never commit `.env` files to git
2. All secrets via EasyPanel environment injection
3. `backend.env.example` and `frontend.env.example` in git (no values)
4. Database URL only in backend environment, never in frontend

### EasyPanel Environment Injection
1. Service → Environment tab
2. Paste key=value pairs
3. Redeploy to apply

---

## CI/CD (GitHub Actions — Optional)

```yaml
# .github/workflows/deploy.yml
name: Deploy to EasyPanel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy Backend
        run: |
          curl -X POST "${{ secrets.EASYPANEL_WEBHOOK_BACKEND }}"
      
      - name: Deploy Frontend
        run: |
          curl -X POST "${{ secrets.EASYPANEL_WEBHOOK_FRONTEND }}"
```

---

## Database Migrations

### Auto-run on startup (built into Docker CMD):
```bash
alembic upgrade head
```

### Manual migration creation:
```bash
# Inside backend container or dev environment
alembic revision --autogenerate -m "description of change"
alembic upgrade head
```

### Rollback:
```bash
alembic downgrade -1
```

---

## Health Checks

### Backend
```
GET https://api.nuraskin.cc/health
Response: {"status": "ok", "db": "connected"}
```

### Frontend
```
GET https://nuraskin.cc/
Response: 200 OK
```

### EasyPanel Health Check Config:
- Backend path: `/health`
- Frontend path: `/`
- Interval: 30s
- Timeout: 5s

---

## Monitoring

### Logs
- EasyPanel built-in log viewer
- Filter by service: backend, frontend

### Error Tracking (Future)
- Sentry for Python backend
- Sentry for Next.js frontend

### Performance
- Vercel Speed Insights alternative: self-hosted Plausible (optional)
- Core Web Vitals: Google Search Console

---

## Backup Strategy

### Database
- EasyPanel PostgreSQL: daily backups (7-day retention)
- Manual export: `pg_dump` weekly

### Google Sheets
- Acts as ops-level backup for order data
- All orders mirrored in real-time

---

## Domain Setup

### DNS Configuration
```
A     nuraskin.cc        → EasyPanel IP
A     api.nuraskin.cc    → EasyPanel IP
CNAME www.nuraskin.cc    → nuraskin.cc
```

### SSL
- EasyPanel Caddy handles SSL via Let's Encrypt automatically
- No manual certificate management needed

---

## Production Checklist

- [ ] Environment variables set in EasyPanel (not in code)
- [ ] DATABASE_URL points to production PostgreSQL
- [ ] META_PIXEL_ID is production (not test)
- [ ] META_ACCESS_TOKEN is production CAPI token
- [ ] GOOGLE_SHEET_ID is production orders sheet
- [ ] CORS_ORIGINS set to `https://nuraskin.cc`
- [ ] Test order end-to-end before launching ads
- [ ] Google Sheets receiving orders
- [ ] Meta Events Manager showing server events
- [ ] TikTok Events Manager showing server events
- [ ] Health check endpoint returning 200
- [ ] Alembic migrations applied successfully
- [ ] noindex on /thank-you and /checkout/upsell
- [ ] SSL certificates active on both domains
