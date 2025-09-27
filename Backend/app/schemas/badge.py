from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class BadgeBase(BaseModel):
    name: str
    description: Optional[str] = None
    icon: Optional[str] = None
    category: str = "achievement"
    points_required: int = 0
    is_active: bool = True

class BadgeCreate(BadgeBase):
    pass

class BadgeUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    category: Optional[str] = None
    points_required: Optional[int] = None
    is_active: Optional[bool] = None

class Badge(BadgeBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class UserBadgeBase(BaseModel):
    user_id: int
    badge_id: int

class UserBadgeCreate(UserBadgeBase):
    pass

class UserBadge(UserBadgeBase):
    id: int
    earned_at: datetime
    badge: Badge

    class Config:
        from_attributes = True
