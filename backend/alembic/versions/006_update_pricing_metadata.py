"""Update product pricing and order item pricing metadata

Revision ID: 006
Revises: 005
Create Date: 2026-05-19 14:20:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel

revision: str = "006"
down_revision: Union[str, None] = "005"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def _add_column_if_missing(table: str, column: sa.Column) -> None:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    columns = {item["name"] for item in inspector.get_columns(table)}
    if column.name not in columns:
        op.add_column(table, column)


def upgrade() -> None:
    _add_column_if_missing("products", sa.Column("compare_at_price", sa.Numeric(10, 2), nullable=True))
    _add_column_if_missing("order_items", sa.Column("compare_at_price", sa.Numeric(10, 2), nullable=True))
    _add_column_if_missing("order_items", sa.Column("bundle_name", sqlmodel.AutoString(150), nullable=True))
    _add_column_if_missing("order_items", sa.Column("discount_amount", sa.Numeric(10, 2), nullable=True))

    op.execute("""
        UPDATE products
        SET
            price = 249,
            compare_at_price = 319,
            meta_description_ar = 'سيروم توازن وإشراقة البشرة بالنياسيناميد — 249 درهم، الدفع عند الاستلام وتوصيل مجاني'
        WHERE slug = 'nura-balance'
    """)
    op.execute("""
        UPDATE products
        SET
            price = 269,
            compare_at_price = 349,
            meta_description_ar = 'كريم التجديد الليلي للبشرة — 269 درهم، الدفع عند الاستلام وتوصيل مجاني'
        WHERE slug = 'nura-night-renewal'
    """)
    op.execute("""
        UPDATE products
        SET
            price = 249,
            compare_at_price = 319,
            meta_description_ar = 'سيروم نضارة محيط العين — 249 درهم، الدفع عند الاستلام وتوصيل مجاني'
        WHERE slug = 'nura-eye-revive'
    """)
    op.execute("""
        UPDATE products
        SET
            price = 279,
            compare_at_price = 359,
            meta_description_ar = 'واقي الشمس اليومي SPF 50 بحماية UVA/UVB ولمسة خفيفة غير دهنية — 279 درهم، الدفع عند الاستلام وتوصيل مجاني'
        WHERE slug = 'nura-spf-50'
    """)


def downgrade() -> None:
    pass
