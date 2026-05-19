"""Initial schema: orders, order_items, products

Revision ID: 001
Revises: 
Create Date: 2024-01-01 00:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
import sqlmodel

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "products",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("slug", sqlmodel.AutoString(50), nullable=False, unique=True),
        sa.Column("name_ar", sqlmodel.AutoString(150), nullable=False),
        sa.Column("name_en", sqlmodel.AutoString(150), nullable=True),
        sa.Column("description_ar", sa.Text, nullable=True),
        sa.Column("meta_description_ar", sqlmodel.AutoString(300), nullable=True),
        sa.Column("price", sa.Numeric(10, 2), nullable=False),
        sa.Column("stock", sa.Integer, default=999),
        sa.Column("is_active", sa.Boolean, default=True),
        sa.Column("sort_order", sa.Integer, default=0),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index("ix_products_slug", "products", ["slug"])

    op.create_table(
        "orders",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("order_number", sqlmodel.AutoString(30), nullable=False, unique=True),
        sa.Column("status", sqlmodel.AutoString(20), default="pending"),
        sa.Column("customer_name", sqlmodel.AutoString(100), nullable=False),
        sa.Column("customer_phone", sqlmodel.AutoString(15), nullable=False),
        sa.Column("total", sa.Numeric(10, 2), nullable=False),
        sa.Column("shipping_cost", sa.Numeric(10, 2), default=30),
        sa.Column("source_url", sa.Text, nullable=True),
        sa.Column("notes", sa.Text, nullable=True),
        sa.Column("event_id", sqlmodel.AutoString(36), nullable=True),
        sa.Column("upsell_accepted", sa.Boolean, default=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index("ix_orders_order_number", "orders", ["order_number"])

    op.create_table(
        "order_items",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("order_id", sa.Integer, sa.ForeignKey("orders.id"), nullable=False),
        sa.Column("product_slug", sqlmodel.AutoString(50), nullable=False),
        sa.Column("product_name", sqlmodel.AutoString(150), nullable=False),
        sa.Column("quantity", sa.Integer, default=1),
        sa.Column("unit_price", sa.Numeric(10, 2), nullable=False),
        sa.Column("is_upsell", sa.Boolean, default=False),
    )
    op.create_index("ix_order_items_order_id", "order_items", ["order_id"])

    # Seed default products
    op.execute("""
        INSERT INTO products (slug, name_ar, name_en, description_ar, meta_description_ar, price, stock, is_active, sort_order, created_at)
        VALUES
        ('nura-balance', 'سيروم توازن وإشراقة البشرة بالنياسيناميد', 'NURA SKIN Balance Serum', 
         'مركّز يساعد على توحيد مظهر البشرة وتخفيف اللمعان وتضييق مظهر المسام بفضل الناياسيناميد 10%',
         'سيروم توازن وإشراقة البشرة بالنياسيناميد — 189 درهم، الدفع عند الاستلام وتوصيل مجاني',
         189, 999, true, 1, NOW()),
        ('nura-night-renewal', 'كريم التجديد الليلي للبشرة', 'NURA SKIN Night Renewal',
         'كريم ليلي يساعد على تجديد مظهر البشرة أثناء النوم لنعومة وإشراقة أكبر',
         'كريم التجديد الليلي للبشرة — 229 درهم، الدفع عند الاستلام وتوصيل مجاني',
         229, 999, true, 2, NOW()),
        ('nura-eye-revive', 'سيروم نضارة محيط العين', 'NURA SKIN Eye Serum',
         'سيروم يساعد على تخفيف مظهر الهالات والانتفاخات تحت العين لعيون أكثر إشراقاً',
         'سيروم نضارة محيط العين — 199 درهم، الدفع عند الاستلام وتوصيل مجاني',
         199, 999, true, 3, NOW())
    """)


def downgrade() -> None:
    op.drop_table("order_items")
    op.drop_table("orders")
    op.drop_table("products")
