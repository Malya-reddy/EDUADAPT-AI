from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Any, List
from app.core.database import get_db
from app.core.security import get_current_user
from app.schemas.user import User
from app.schemas.course import ContentFormat
from app.services import aws_service

router = APIRouter()

@router.get("/{course_id}/{topic_id}", response_model=List[ContentFormat])
def get_content_formats(
    course_id: int,
    topic_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get available content formats for a specific topic
    """
    # This would typically fetch from database and generate missing formats
    content_formats = aws_service.get_content_formats(
        db=db,
        course_id=course_id,
        topic_id=topic_id,
        user_id=current_user.id
    )
    return content_formats

@router.post("/generate")
def generate_content(
    *,
    content_type: str,
    topic: str,
    user_preferences: dict,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Generate personalized content using AI
    """
    content = aws_service.generate_content(
        content_type=content_type,
        topic=topic,
        user_preferences=user_preferences
    )
    return content
