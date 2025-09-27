from typing import Any, Dict, List
from sqlalchemy.orm import Session
from app.models.badge import Badge, UserBadge
from app.schemas.badge import BadgeCreate, UserBadgeCreate

class BadgeService:
    def get(self, db: Session, *, id: int) -> Badge:
        return db.query(Badge).filter(Badge.id == id).first()

    def get_user_badges(self, db: Session, *, user_id: int) -> List[UserBadge]:
        return db.query(UserBadge).filter(UserBadge.user_id == user_id).all()

    def create_badge(self, db: Session, *, obj_in: BadgeCreate) -> Badge:
        db_obj = Badge(**obj_in.dict())
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def award_badge(self, db: Session, *, user_id: int, badge_id: int) -> UserBadge:
        # Check if user already has this badge
        existing = db.query(UserBadge).filter(
            UserBadge.user_id == user_id,
            UserBadge.badge_id == badge_id
        ).first()
        
        if existing:
            return existing
        
        db_obj = UserBadge(user_id=user_id, badge_id=badge_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def check_and_award_badges(self, db: Session, *, user_id: int) -> List[UserBadge]:
        """Check user progress and award new badges"""
        new_badges = []
        
        # This would contain logic to check various conditions
        # and award badges based on user progress
        
        return new_badges

badge_service = BadgeService()
