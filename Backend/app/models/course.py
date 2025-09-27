from sqlalchemy import Column, Integer, String, DateTime, Float, Text, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.core.database import Base

class Course(Base):
    __tablename__ = "courses"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    instructor = Column(String(255), nullable=False)
    duration = Column(Integer, default=0)  # in hours
    difficulty = Column(String(50), default="beginner")
    rating = Column(Float, default=0.0)
    students_count = Column(Integer, default=0)
    thumbnail = Column(String(500))
    is_published = Column(Boolean, default=False)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    topics = relationship("Topic", back_populates="course", cascade="all, delete-orphan")
    quizzes = relationship("Quiz", back_populates="course", cascade="all, delete-orphan")
    progress = relationship("Progress", back_populates="course")
    
    def __repr__(self):
        return f"<Course(id={self.id}, title='{self.title}')>"

class Topic(Base):
    __tablename__ = "topics"
    
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    order = Column(Integer, default=0)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    course = relationship("Course", back_populates="topics")
    content_formats = relationship("ContentFormat", back_populates="topic", cascade="all, delete-orphan")
    quiz = relationship("Quiz", back_populates="topic", uselist=False, cascade="all, delete-orphan")
    progress = relationship("Progress", back_populates="topic")
    
    def __repr__(self):
        return f"<Topic(id={self.id}, title='{self.title}', course_id={self.course_id})>"

class ContentFormat(Base):
    __tablename__ = "content_formats"
    
    id = Column(Integer, primary_key=True, index=True)
    topic_id = Column(Integer, ForeignKey("topics.id"), nullable=False)
    format_type = Column(String(50), nullable=False)  # text, audio, visual, kinesthetic, video
    content = Column(Text)
    url = Column(String(500))
    duration = Column(Integer)  # in minutes
    is_available = Column(Boolean, default=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    topic = relationship("Topic", back_populates="content_formats")
    
    def __repr__(self):
        return f"<ContentFormat(id={self.id}, type='{self.format_type}', topic_id={self.topic_id})>"
