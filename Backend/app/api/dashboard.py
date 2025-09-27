from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Any
from app.core.database import get_db
from app.core.security import get_current_user
from app.schemas.user import User
from app.schemas.progress import DashboardData
from app.services import progress_service

router = APIRouter()

@router.get("/{user_id}", response_model=DashboardData)
def get_dashboard(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get dashboard data for a user
    """
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    dashboard_data = progress_service.get_dashboard_data(db, user_id=user_id)
    return dashboard_data
