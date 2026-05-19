from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select
from typing import List
from pydantic import BaseModel

from app.db.session import get_db
from app.models.product import Product

router = APIRouter(prefix="/products", tags=["products"])


class ProductOut(BaseModel):
    slug: str
    name_ar: str
    name_en: str | None
    description_ar: str | None
    price: float
    compare_at_price: float | None = None
    stock: int


@router.get("", response_model=List[ProductOut])
async def list_products(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Product)
        .where(Product.is_active == True)
        .order_by(Product.sort_order)
    )
    return result.scalars().all()


@router.get("/{slug}", response_model=ProductOut)
async def get_product(slug: str, db: AsyncSession = Depends(get_db)):
    from fastapi import HTTPException
    result = await db.execute(
        select(Product).where(Product.slug == slug, Product.is_active == True)
    )
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="المنتج غير موجود")
    return product
