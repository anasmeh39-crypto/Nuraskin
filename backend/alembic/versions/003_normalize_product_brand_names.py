"""Normalize product brand names

Revision ID: 003
Revises: 002
Create Date: 2026-05-19 12:55:00.000000

"""
from typing import Sequence, Union

from alembic import op

revision: str = "003"
down_revision: Union[str, None] = "002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        UPDATE products
        SET
            name_ar = 'سيروم توازن وإشراقة البشرة بالنياسيناميد',
            name_en = 'NURA SKIN Balance Serum',
            meta_description_ar = 'سيروم توازن وإشراقة البشرة بالنياسيناميد — 249 درهم، الدفع عند الاستلام وتوصيل مجاني'
        WHERE slug = 'nura-balance'
    """)
    op.execute("""
        UPDATE products
        SET
            name_ar = 'كريم التجديد الليلي للبشرة',
            name_en = 'NURA SKIN Night Renewal',
            meta_description_ar = 'كريم التجديد الليلي للبشرة — 269 درهم، الدفع عند الاستلام وتوصيل مجاني'
        WHERE slug = 'nura-night-renewal'
    """)
    op.execute("""
        UPDATE products
        SET
            name_ar = 'سيروم نضارة محيط العين',
            name_en = 'NURA SKIN Eye Serum',
            meta_description_ar = 'سيروم نضارة محيط العين — 249 درهم، الدفع عند الاستلام وتوصيل مجاني'
        WHERE slug = 'nura-eye-revive'
    """)


def downgrade() -> None:
    pass
