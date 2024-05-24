"""change movies.c.plot type

Revision ID: 57ce67d1bcb2
Revises: 708103cb542d
Create Date: 2024-05-09 20:42:16.884909

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '57ce67d1bcb2'
down_revision: Union[str, None] = '708103cb542d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('movies', 'plot',
               existing_type=sa.VARCHAR(length=250),
               type_=sa.Text(),
               existing_nullable=True)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('movies', 'plot',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(length=250),
               existing_nullable=True)
    # ### end Alembic commands ###