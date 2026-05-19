"""Update SPF product copy

Revision ID: 005
Revises: 004
Create Date: 2026-05-19 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op

revision: str = "005"
down_revision: Union[str, None] = "004"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        UPDATE products
        SET
            name_ar = 'واقي الشمس اليومي SPF 50',
            name_en = 'NURA SKIN Daily Sunscreen SPF 50',
            description_ar = 'واقي شمسي مبتكر يوفر حماية عالية من أشعة الشمس الضارة مع تركيبة خفيفة مرطبة وسريعة الامتصاص ولمسة غير دهنية.',
            meta_description_ar = 'واقي الشمس اليومي SPF 50 بحماية UVA/UVB ولمسة خفيفة غير دهنية — 199 درهم، الدفع عند الاستلام وتوصيل مجاني',
            price = 199,
            is_active = true,
            sort_order = 4
        WHERE slug = 'nura-spf-50'
    """)


def downgrade() -> None:
    pass
