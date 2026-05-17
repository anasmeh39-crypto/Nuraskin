import logging
import subprocess
import sys
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import get_settings
from app.routers import orders, products, tracking

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
logger = logging.getLogger(__name__)


def run_alembic_migrations() -> None:
    """Run Alembic migrations on startup."""
    try:
        result = subprocess.run(
            ["alembic", "upgrade", "head"],
            capture_output=True,
            text=True,
            timeout=120,
        )
        if result.returncode == 0:
            logger.info("Alembic migrations applied successfully")
        else:
            logger.error(f"Alembic migration failed: {result.stderr}")
    except Exception as e:
        logger.error(f"Failed to run migrations: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    run_alembic_migrations()
    logger.info("Nura Skin API starting up...")
    yield
    logger.info("Nura Skin API shutting down...")


settings = get_settings()

app = FastAPI(
    title="Nura Skin API",
    version="1.0.0",
    description="Backend API for Nura Skin — Nama Beauty",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url=None,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=False,
    allow_methods=["GET", "POST", "PATCH", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

app.include_router(orders.router)
app.include_router(products.router)
app.include_router(tracking.router)


@app.get("/health")
async def health_check():
    from app.db.session import get_engine
    try:
        engine = get_engine()
        async with engine.connect() as conn:
            await conn.execute(__import__("sqlalchemy").text("SELECT 1"))
        return {"status": "ok", "db": "connected"}
    except Exception as e:
        return JSONResponse(
            status_code=503,
            content={"status": "error", "db": str(e)},
        )


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "حدث خطأ غير متوقع، يرجى المحاولة مجدداً"},
    )
