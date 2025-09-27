from typing import Any, Dict, Optional, Union, List
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from app.models.course import Course, Topic, ContentFormat
from app.schemas.course import CourseCreate, CourseUpdate, TopicCreate, ContentFormatCreate

class CourseService:
    def get(self, db: Session, *, id: int) -> Optional[Course]:
        return db.query(Course).filter(Course.id == id).first()

    def get_courses(
        self,
        db: Session,
        *,
        skip: int = 0,
        limit: int = 100,
        search: Optional[str] = None,
        difficulty: Optional[str] = None,
        duration_min: Optional[int] = None,
        duration_max: Optional[int] = None,
    ) -> List[Course]:
        query = db.query(Course).filter(Course.is_published == True)
        
        if search:
            search_filter = or_(
                Course.title.ilike(f"%{search}%"),
                Course.description.ilike(f"%{search}%"),
                Course.instructor.ilike(f"%{search}%")
            )
            query = query.filter(search_filter)
        
        if difficulty:
            query = query.filter(Course.difficulty == difficulty)
        
        if duration_min is not None:
            query = query.filter(Course.duration >= duration_min)
        
        if duration_max is not None:
            query = query.filter(Course.duration <= duration_max)
        
        return query.offset(skip).limit(limit).all()

    def create(self, db: Session, *, obj_in: CourseCreate) -> Course:
        db_obj = Course(
            title=obj_in.title,
            description=obj_in.description,
            instructor=obj_in.instructor,
            duration=obj_in.duration,
            difficulty=obj_in.difficulty,
            rating=obj_in.rating,
            students_count=obj_in.students_count,
            thumbnail=obj_in.thumbnail,
            is_published=obj_in.is_published,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        
        # Create topics and content formats
        for topic_data in obj_in.topics:
            topic = Topic(
                course_id=db_obj.id,
                title=topic_data.title,
                description=topic_data.description,
                order=topic_data.order,
            )
            db.add(topic)
            db.commit()
            db.refresh(topic)
            
            for content_data in topic_data.content_formats:
                content_format = ContentFormat(
                    topic_id=topic.id,
                    format_type=content_data.format_type,
                    content=content_data.content,
                    url=content_data.url,
                    duration=content_data.duration,
                    is_available=content_data.is_available,
                )
                db.add(content_format)
        
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: Course, obj_in: Union[CourseUpdate, Dict[str, Any]]
    ) -> Course:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, id: int) -> Course:
        obj = db.query(Course).get(id)
        db.delete(obj)
        db.commit()
        return obj

course_service = CourseService()
