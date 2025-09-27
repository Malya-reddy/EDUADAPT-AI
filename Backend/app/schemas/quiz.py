from typing import Optional, List, Dict, Any
from pydantic import BaseModel
from datetime import datetime

class QuestionBase(BaseModel):
    question_type: str
    question_text: str
    options: Optional[List[str]] = None
    correct_answer: str
    explanation: Optional[str] = None
    difficulty: str = "medium"
    points: int = 1

class QuestionCreate(QuestionBase):
    pass

class Question(QuestionBase):
    id: int
    quiz_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class QuizBase(BaseModel):
    title: str
    description: Optional[str] = None
    time_limit: Optional[int] = None
    passing_score: float = 70.0
    is_published: bool = False

class QuizCreate(QuizBase):
    course_id: int
    topic_id: Optional[int] = None
    questions: List[QuestionCreate] = []

class QuizUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    time_limit: Optional[int] = None
    passing_score: Optional[float] = None
    is_published: Optional[bool] = None

class Quiz(QuizBase):
    id: int
    course_id: int
    topic_id: Optional[int] = None
    questions: List[Question] = []
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class QuizSubmission(BaseModel):
    quiz_id: int
    answers: Dict[str, str]  # question_id -> answer

class QuizResult(BaseModel):
    quiz_id: int
    score: float
    total_questions: int
    correct_answers: int
    passed: bool
    time_taken: Optional[int] = None
    answers: Dict[str, Dict[str, Any]]  # Detailed results for each question
