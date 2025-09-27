from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Any
from app.core.database import get_db
from app.core.security import get_current_user
from app.schemas.user import User
from app.schemas.quiz import Quiz, QuizCreate, QuizSubmission, QuizResult
from app.services import quiz_service

router = APIRouter()

@router.get("/{course_id}", response_model=Quiz)
def get_quiz(
    course_id: int,
    db: Session = Depends(get_db),
) -> Any:
    """
    Get quiz for a specific course
    """
    quiz = quiz_service.get_by_course(db, course_id=course_id)
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz

@router.post("/submit", response_model=QuizResult)
def submit_quiz(
    *,
    db: Session = Depends(get_db),
    quiz_submission: QuizSubmission,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Submit quiz answers and get results
    """
    result = quiz_service.submit_quiz(
        db=db,
        user_id=current_user.id,
        quiz_submission=quiz_submission
    )
    return result
