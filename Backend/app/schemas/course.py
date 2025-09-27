from typing import Optional, List
from pydantic import BaseModel
from datetime import datetime

class ContentFormatBase(BaseModel):
    format_type: str
    content: Optional[str] = None
    url: Optional[str] = None
    duration: Optional[int] = None
    is_available: bool = True

class ContentFormatCreate(ContentFormatBase):
    pass

class ContentFormat(ContentFormatBase):
    id: int
    topic_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class TopicBase(BaseModel):
    title: str
    description: Optional[str] = None
    order: int = 0

class TopicCreate(TopicBase):
    content_formats: List[ContentFormatCreate] = []

class Topic(TopicBase):
    id: int
    course_id: int
    content_formats: List[ContentFormat] = []
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    instructor: str
    duration: int = 0
    difficulty: str = "beginner"
    rating: float = 0.0
    students_count: int = 0
    thumbnail: Optional[str] = None
    is_published: bool = False

class CourseCreate(CourseBase):
    topics: List[TopicCreate] = []

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    instructor: Optional[str] = None
    duration: Optional[int] = None
    difficulty: Optional[str] = None
    rating: Optional[float] = None
    students_count: Optional[int] = None
    thumbnail: Optional[str] = None
    is_published: Optional[bool] = None

class Course(CourseBase):
    id: int
    topics: List[Topic] = []
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
