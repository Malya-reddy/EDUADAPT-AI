from typing import Optional, List  # ✅ Added List
from pydantic import BaseModel
from datetime import datetime

class ProgressBase(BaseModel):
    course_id: int
    topic_id: Optional[int] = None
    quiz_id: Optional[int] = None
    is_completed: bool = False
    score: Optional[float] = None
    time_spent: int = 0
    attempts: int = 0
    preferred_format: Optional[str] = None
    difficulty_rating: Optional[float] = None
    comprehension_rating: Optional[float] = None

class ProgressCreate(ProgressBase):
    pass

class ProgressUpdate(BaseModel):
    is_completed: Optional[bool] = None
    score: Optional[float] = None
    time_spent: Optional[int] = None
    attempts: Optional[int] = None
    preferred_format: Optional[str] = None
    difficulty_rating: Optional[float] = None
    comprehension_rating: Optional[float] = None

class Progress(ProgressBase):
    id: int
    user_id: int
    started_at: datetime
    completed_at: Optional[datetime] = None
    last_accessed: datetime

    class Config:
        from_attributes = True

class LearningAnalytics(BaseModel):
    preferred_formats: dict
    weekly_progress: List[dict]  # ✅ Fixed by importing List
    streak_history: List[dict]   # ✅ Fixed by importing List
    total_time_spent: int
    completed_lessons: int
    average_score: float
    current_streak: int

class DashboardData(BaseModel):
    user_id: int
    progress: List[Progress]          # ✅ Fixed by importing List
    learning_analytics: LearningAnalytics
    recommended_courses: List[dict]  # ✅ Fixed by importing List

