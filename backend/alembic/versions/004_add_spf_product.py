"""Add SPF product

Revision ID: 004
Revises: 003
Create Date: 2026-05-19 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op

revision: str = "004"
down_revision: Union[str, None] = "003"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        INSERT INTO products (slug, name_ar, name_en, description_ar, meta_description_ar, price, stock, is_active, sort_order, created_at)
        VALUES (
            'nura-spf-50',
            'واقي الشمس اليومي SPF 50',
            'NURA SKIN Daily Sunscreen SPF 50',
            'واقي شمس يومي خفيف يساعد على حماية البشرة من أشعة الشمس ويحافظ على إشراقة الروتين اليومي.',
            'واقي الشمس اليومي SPF 50 — 199 درهم، الدفع عند الاستلام وتوصيل مجاني',
            199,
            999,
            true,
            4,
            NOW()
        )
        ON CONFLICT (slug) DO UPDATE SET
            name_ar = EXCLUDED.name_ar,
            name_en = EXCLUDED.name_en,
            description_ar = EXCLUDED.description_ar,
            meta_description_ar = EXCLUDED.meta_description_ar,
            price = EXCLUDED.price,
            stock = EXCLUDED.stock,
            is_active = EXCLUDED.is_active,
            sort_order = EXCLUDED.sort_order
    """)


def downgrade() -> None:
    op.execute("DELETE FROM products WHERE slug = 'nura-spf-50'")
