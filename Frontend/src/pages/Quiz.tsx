import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock, CheckCircle, Trophy, RotateCcw } from 'lucide-react'
import QuizCard from '../components/QuizCard'
import type { Question, Quiz } from '../types'

const QuizPage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>()
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<{ [questionId: string]: string | number }>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock quiz data - in real app, this would come from API
  useEffect(() => {
    const mockQuiz: Quiz = {
      id: '1',
      questions: [
        {
          id: '1',
          type: 'multiple-choice',
          question: 'What is the correct way to declare a variable in JavaScript?',
          options: [
            'var myVar = 10;',
            'variable myVar = 10;',
            'v myVar = 10;',
            'declare myVar = 10;'
          ],
          correctAnswer: 0,
          explanation: 'In JavaScript, variables are declared using var, let, or const keywords.',
          difficulty: 'easy'
        },
        {
          id: '2',
          type: 'true-false',
          question: 'Arrow functions in ES6 always bind their own this value.',
          options: ['True', 'False'],
          correctAnswer: 1,
          explanation: 'Arrow functions do not have their own this binding. They inherit this from the enclosing scope.',
          difficulty: 'medium'
        },
        {
          id: '3',
          type: 'multiple-choice',
          question: 'Which method is used to add an element to the end of an array?',
          options: [
            'array.push()',
            'array.add()',
            'array.append()',
            'array.insert()'
          ],
          correctAnswer: 0,
          explanation: 'The push() method adds one or more elements to the end of an array and returns the new length.',
          difficulty: 'easy'
        },
        {
          id: '4',
          type: 'coding',
          question: 'Write a function that returns the sum of two numbers.',
          options: [
            'function add(a, b) { return a + b; }',
            'const add = (a, b) => a + b;',
            'var add = function(a, b) { return a + b; };',
            'All of the above'
          ],
          correctAnswer: 3,
          explanation: 'All three syntaxes are valid ways to create a function that returns the sum of two numbers in JavaScript.',
          difficulty: 'medium'
        },
        {
          id: '5',
          type: 'multiple-choice',
          question: 'What will be the output of: console.log(typeof null);',
          options: [
            'null',
            'undefined',
            'object',
            'string'
          ],
          correctAnswer: 2,
          explanation: 'In JavaScript, typeof null returns "object" due to a historical bug that has been preserved for compatibility.',
          difficulty: 'hard'
        }
      ],
      timeLimit: 300, // 5 minutes
      passingScore: 70
    }

    setTimeout(() => {
      setQuiz(mockQuiz)
      setTimeLeft(mockQuiz.timeLimit)
      setIsLoading(false)
    }, 1000)
  }, [courseId])

  useEffect(() => {
    if (timeLeft && timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit()
    }
  }, [timeLeft, isSubmitted])

  const handleAnswer = (questionId: string, answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
  }

  const handleSubmit = () => {
    if (!quiz) return

    let correctAnswers = 0
    quiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const percentage = Math.round((correctAnswers / quiz.questions.length) * 100)
    setScore(percentage)
    setIsSubmitted(true)
  }

  const handleNext = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleRestart = () => {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setIsSubmitted(false)
    setScore(null)
    setTimeLeft(quiz?.timeLimit || null)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Excellent work!'
    if (score >= 70) return 'Good job!'
    return 'Keep practicing!'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-96 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Quiz not found</h1>
          <Link to={`/course/${courseId}`} className="btn-primary">
            Back to Course
          </Link>
        </div>
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1
  const answeredQuestions = Object.keys(answers).length
  const progress = (answeredQuestions / quiz.questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to={`/course/${courseId}`}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Course</span>
          </Link>

          {!isSubmitted && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span className={`font-medium ${timeLeft && timeLeft <= 60 ? 'text-red-600' : ''}`}>
                  {timeLeft ? formatTime(timeLeft) : '--:--'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {!isSubmitted && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Quiz Content */}
        {!isSubmitted ? (
          <>
            <QuizCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              timeLimit={timeLeft || undefined}
              isSubmitted={false}
            />

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-4">
                {isLastQuestion ? (
                  <button
                    onClick={handleSubmit}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Submit Quiz</span>
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Results */
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12 text-primary-600" />
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h2>
              
              <div className="mb-6">
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(score || 0)}`}>
                  {score}%
                </div>
                <p className={`text-xl ${getScoreColor(score || 0)}`}>
                  {getScoreMessage(score || 0)}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {quiz.questions.length}
                  </div>
                  <div className="text-gray-600">Total Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Object.values(answers).filter((answer, index) => 
                      answer === quiz.questions[index].correctAnswer
                    ).length}
                  </div>
                  <div className="text-gray-600">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {Object.values(answers).filter((answer, index) => 
                      answer !== quiz.questions[index].correctAnswer
                    ).length}
                  </div>
                  <div className="text-gray-600">Incorrect</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </button>
                <Link
                  to={`/course/${courseId}`}
                  className="btn-primary"
                >
                  Continue Learning
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizPage
