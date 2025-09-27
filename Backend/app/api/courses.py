from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional, Any
from app.core.database import get_db
from app.core.security import get_current_user
from app.schemas.user import User
from app.schemas.course import Course, CourseCreate, CourseUpdate
from app.services import course_service

router = APIRouter()

@router.get("/", response_model=List[Course])
def read_courses(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    search: Optional[str] = Query(None, description="Search courses by title, description, or instructor"),
    difficulty: Optional[str] = Query(None, description="Filter by difficulty level"),
    duration_min: Optional[int] = Query(None, description="Minimum duration in hours"),
    duration_max: Optional[int] = Query(None, description="Maximum duration in hours"),
) -> Any:
    """
    Retrieve courses with optional filtering and search
    """
    courses = course_service.get_courses(
        db=db,
        skip=skip,
        limit=limit,
        search=search,
        difficulty=difficulty,
        duration_min=duration_min,
        duration_max=duration_max,
    )
    return courses

@router.get("/{course_id}", response_model=Course)
def read_course(
    course_id: int,
    db: Session = Depends(get_db),
) -> Any:
    """
    Get a specific course by ID
    """
    course = course_service.get(db, id=course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.post("/", response_model=Course)
def create_course(
    *,
    db: Session = Depends(get_db),
    course_in: CourseCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Create new course (admin only)
    """
    # In a real app, you'd check if user is admin
    course = course_service.create(db, obj_in=course_in)
    return course

@router.put("/{course_id}", response_model=Course)
def update_course(
    *,
    db: Session = Depends(get_db),
    course_id: int,
    course_in: CourseUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Update a course (admin only)
    """
    course = course_service.get(db, id=course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    course = course_service.update(db, db_obj=course, obj_in=course_in)
    return course

@router.delete("/{course_id}")
def delete_course(
    *,
    db: Session = Depends(get_db),
    course_id: int,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Delete a course (admin only)
    """
    course = course_service.get(db, id=course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    course_service.remove(db, id=course_id)
    return {"message": "Course deleted successfully"}
