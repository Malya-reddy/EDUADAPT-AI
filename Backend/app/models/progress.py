from sqlalchemy import Column, Integer, String, DateTime, Float, Boolean, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Progress(Base):
    __tablename__ = "progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    topic_id = Column(Integer, ForeignKey("topics.id"), nullable=True)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"), nullable=True)
    
    # Progress tracking
    is_completed = Column(Boolean, default=False)
    score = Column(Float)
    time_spent = Column(Integer, default=0)  # in minutes
    attempts = Column(Integer, default=0)
    
    # Learning analytics
    preferred_format = Column(String(50))  # The format that was most effective
    difficulty_rating = Column(Float)  # User's rating of difficulty
    comprehension_rating = Column(Float)  # User's rating of comprehension
    
    # Timestamps
    started_at = Column(DateTime(timezone=True), server_default=func.now())
    completed_at = Column(DateTime(timezone=True))
    last_accessed = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="progress")
    course = relationship("Course", back_populates="progress")
    topic = relationship("Topic", back_populates="progress")
    
    def __repr__(self):
        return f"<Progress(id={self.id}, user_id={self.user_id}, course_id={self.course_id}, completed={self.is_completed})>"
