from datetime import UTC, date, datetime
from enum import Enum
from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import Column, DateTime
from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .daily_goal import DailyGoal
    from .session_counter import SessionCounter
    from .study_block import StudyBlock
    from .study_category import StudyCategory
    from .time_settings import TimeSettings


class Gender(str, Enum):
    MALE = "MALE"
    FEMALE = "FEMALE"
    OTHER = "OTHER"
    NOT_SPECIFIED = "NOT_SPECIFIED"


class SocialProvider(str, Enum):
    GITHUB = "GITHUB"
    GOOGLE = "GOOGLE"
    FACEBOOK = "FACEBOOK"
    TWITTER = "TWITTER"
    LINKEDIN = "LINKEDIN"
    APPLE = "APPLE"
    MICROSOFT = "MICROSOFT"


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    hashed_password: Optional[str] = None
    bio: Optional[str] = None
    date_of_birth: Optional[date] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    gender: Optional[Gender] = None
    profile_photo_key: Optional[str] = None
    is_active: bool = Field(default=True)
    is_email_verified: bool = Field(default=False)
    email_verification_token: Optional[str] = None
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True)),
        default_factory=lambda: datetime.now(UTC),
    )

    # Social login fields
    social_provider: Optional[SocialProvider] = None
    social_id: Optional[str] = None

    # Relationships
    study_blocks: List["StudyBlock"] = Relationship(
        back_populates="user", sa_relationship_kwargs={"cascade": "delete"}
    )
    daily_goals: List["DailyGoal"] = Relationship(
        back_populates="user", sa_relationship_kwargs={"cascade": "delete"}
    )
    study_categories: List["StudyCategory"] = Relationship(
        back_populates="user", sa_relationship_kwargs={"cascade": "delete"}
    )
    time_settings: List["TimeSettings"] = Relationship(
        back_populates="user", sa_relationship_kwargs={"cascade": "delete"}
    )
    session_counters: List["SessionCounter"] = Relationship(
        back_populates="user", sa_relationship_kwargs={"cascade": "delete"}
    )


User.update_forward_refs()
