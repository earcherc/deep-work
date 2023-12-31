"""Study category update

Revision ID: ecc14a1d7c99
Revises: b08e9c9e9dbc
Create Date: 2023-12-13 01:05:17.519391

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
import sqlmodel.sql.sqltypes


# revision identifiers, used by Alembic.
revision: str = "ecc14a1d7c99"
down_revision: Union[str, None] = "b08e9c9e9dbc"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("usercategorylink")
    op.add_column("studycategory", sa.Column("user_id", sa.Integer(), nullable=False))
    op.create_unique_constraint(None, "studycategory", ["title", "user_id"])
    op.create_foreign_key(None, "studycategory", "user", ["user_id"], ["id"])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, "studycategory", type_="foreignkey")
    op.drop_constraint(None, "studycategory", type_="unique")
    op.drop_column("studycategory", "user_id")
    op.create_table(
        "usercategorylink",
        sa.Column("user_id", sa.INTEGER(), autoincrement=False, nullable=False),
        sa.Column(
            "study_category_id", sa.INTEGER(), autoincrement=False, nullable=False
        ),
        sa.ForeignKeyConstraint(
            ["study_category_id"],
            ["studycategory.id"],
            name="usercategorylink_study_category_id_fkey",
        ),
        sa.ForeignKeyConstraint(
            ["user_id"], ["user.id"], name="usercategorylink_user_id_fkey"
        ),
        sa.PrimaryKeyConstraint(
            "user_id", "study_category_id", name="usercategorylink_pkey"
        ),
    )
    # ### end Alembic commands ###
