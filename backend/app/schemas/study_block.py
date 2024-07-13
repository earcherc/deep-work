from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class StudyBlockBase(BaseModel):
    start: datetime
    end: Optional[datetime] = None
    rating: Optional[float] = Field(None, ge=0, le=5)
    is_countdown: bool = True


class StudyBlockCreate(StudyBlockBase):
    daily_goal_id: int
    study_category_id: int


class StudyBlockUpdate(BaseModel):
    end: Optional[datetime] = None
    rating: Optional[float] = Field(None, ge=0, le=5)


class StudyBlock(StudyBlockBase):
    id: int
    user_id: int
    daily_goal_id: int
    study_category_id: int

    class Config:
        orm_mode = True


class StudyBlockQuery(BaseModel):
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    skip: Optional[int] = Field(default=0, ge=0)
    limit: Optional[int] = Field(default=100, ge=1, le=1000)
