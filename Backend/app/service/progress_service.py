from typing import Any, Dict, List
from sqlalchemy.orm import Session
from app.models.progress import Progress
from app.schemas.progress import ProgressCreate, ProgressUpdate, DashboardData, LearningAnalytics

class ProgressService:
    def create(self, db: Session, *, obj_in: ProgressCreate) -> Progress:
        db_obj = Progress(**obj_in.dict())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: Progress, obj_in: ProgressUpdate
    ) -> Progress:
        update_data = obj_in.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_dashboard_data(self, db: Session, *, user_id: int) -> DashboardData:
        # Get user progress
        progress = db.query(Progress).filter(Progress.user_id == user_id).all()
        
        # Calculate learning analytics
        analytics = self._calculate_learning_analytics(db, user_id, progress)
        
        # Get recommended courses (simplified)
        recommended_courses = self._get_recommended_courses(db, user_id)
        
        return DashboardData(
            user_id=user_id,
            progress=progress,
            learning_analytics=analytics,
            recommended_courses=recommended_courses
        )

    def _calculate_learning_analytics(
        self, db: Session, user_id: int, progress: List[Progress]
    ) -> LearningAnalytics:
        # Simplified analytics calculation
        preferred_formats = {"visual": 45, "reading": 30, "audio": 15, "kinesthetic": 10}
        weekly_progress = [{"date": "2024-01-24", "completed": 4}]
        streak_history = [{"date": "2024-01-24", "streak": 12}]
        
        total_time_spent = sum(p.time_spent for p in progress)
        completed_lessons = len([p for p in progress if p.is_completed])
        average_score = sum(p.score for p in progress if p.score) / len([p for p in progress if p.score]) if progress else 0
        current_streak = 12  # This would be calculated from actual data
        
        return LearningAnalytics(
            preferred_formats=preferred_formats,
            weekly_progress=weekly_progress,
            streak_history=streak_history,
            total_time_spent=total_time_spent,
            completed_lessons=completed_lessons,
            average_score=average_score,
            current_streak=current_streak
        )

    def _get_recommended_courses(self, db: Session, user_id: int) -> List[Dict]:
        # Simplified recommendations
        return [
            {
                "id": 1,
                "title": "Advanced React Patterns",
                "description": "Master advanced React concepts",
                "instructor": "Sarah Johnson",
                "duration": 20,
                "difficulty": "advanced",
                "rating": 4.9,
                "students_count": 8500,
                "thumbnail": "https://example.com/thumbnail.jpg"
            }
        ]

progress_service = ProgressService()
