from typing import Any, Dict, Optional
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.quiz import Quiz, Question
from app.schemas.quiz import QuizCreate, QuizSubmission, QuizResult

class QuizService:
    def get(self, db: Session, *, id: int) -> Optional[Quiz]:
        return db.query(Quiz).filter(Quiz.id == id).first()

    def get_by_course(self, db: Session, *, course_id: int) -> Optional[Quiz]:
        return db.query(Quiz).filter(Quiz.course_id == course_id).first()

    def create(self, db: Session, *, obj_in: QuizCreate) -> Quiz:
        db_obj = Quiz(
            course_id=obj_in.course_id,
            topic_id=obj_in.topic_id,
            title=obj_in.title,
            description=obj_in.description,
            time_limit=obj_in.time_limit,
            passing_score=obj_in.passing_score,
            is_published=obj_in.is_published,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        
        # Create questions
        for question_data in obj_in.questions:
            question = Question(
                quiz_id=db_obj.id,
                question_type=question_data.question_type,
                question_text=question_data.question_text,
                options=question_data.options,
                correct_answer=question_data.correct_answer,
                explanation=question_data.explanation,
                difficulty=question_data.difficulty,
                points=question_data.points,
            )
            db.add(question)
        
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def submit_quiz(
        self, 
        db: Session, 
        *, 
        user_id: int, 
        quiz_submission: QuizSubmission
    ) -> QuizResult:
        quiz = self.get(db, id=quiz_submission.quiz_id)
        if not quiz:
            raise HTTPException(status_code=404, detail="Quiz not found")
        
        correct_answers = 0
        total_questions = len(quiz.questions)
        answers_detail = {}
        
        for question in quiz.questions:
            user_answer = quiz_submission.answers.get(str(question.id))
            is_correct = user_answer == question.correct_answer
            
            if is_correct:
                correct_answers += 1
            
            answers_detail[str(question.id)] = {
                "question": question.question_text,
                "user_answer": user_answer,
                "correct_answer": question.correct_answer,
                "is_correct": is_correct,
                "explanation": question.explanation
            }
        
        score = (correct_answers / total_questions) * 100
        passed = score >= quiz.passing_score
        
        return QuizResult(
            quiz_id=quiz_submission.quiz_id,
            score=score,
            total_questions=total_questions,
            correct_answers=correct_answers,
            passed=passed,
            answers=answers_detail
        )

quiz_service = QuizService()
