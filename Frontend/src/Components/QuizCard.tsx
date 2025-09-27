import React, { useState } from 'react'
import { Clock, CheckCircle, XCircle, RotateCcw } from 'lucide-react'
import type { Question } from '../types'

interface QuizCardProps {
  question: Question
  onAnswer: (questionId: string, answer: string | number) => void
  timeLimit?: number
  isSubmitted?: boolean
}

const QuizCard: React.FC<QuizCardProps> = ({ 
  question, 
  onAnswer, 
  timeLimit,
  isSubmitted = false
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null)
  const [timeLeft, setTimeLeft] = useState(timeLimit || 0)
  const [isAnswered, setIsAnswered] = useState(false)

  React.useEffect(() => {
    if (timeLimit && timeLeft > 0 && !isAnswered) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, timeLimit, isAnswered])

  const handleAnswerSelect = (answer: string | number) => {
    if (isSubmitted) return
    
    setSelectedAnswer(answer)
    setIsAnswered(true)
    onAnswer(question.id, answer)
  }

  const getQuestionIcon = () => {
    switch (question.type) {
      case 'multiple-choice':
        return '📝'
      case 'flowchart':
        return '🔄'
      case 'coding':
        return '💻'
      case 'true-false':
        return '✅'
      default:
        return '❓'
    }
  }

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const isCorrect = selectedAnswer === question.correctAnswer
  const showResult = isSubmitted && isAnswered

  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getQuestionIcon()}</span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {question.type.replace('-', ' ').toUpperCase()} Question
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
              {question.difficulty}
            </span>
          </div>
        </div>
        
        {timeLimit && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span className={`font-medium ${timeLeft <= 10 ? 'text-red-600' : ''}`}>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="text-gray-900 text-lg leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-6">
        {question.options?.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrectOption = index === question.correctAnswer
          const showCorrect = showResult && isCorrectOption
          const showIncorrect = showResult && isSelected && !isCorrectOption

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={isSubmitted}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                showCorrect
                  ? 'border-green-500 bg-green-50 text-green-900'
                  : showIncorrect
                  ? 'border-red-500 bg-red-50 text-red-900'
                  : isSelected
                  ? 'border-primary-500 bg-primary-50 text-primary-900'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } ${isSubmitted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  showCorrect
                    ? 'border-green-500 bg-green-500'
                    : showIncorrect
                    ? 'border-red-500 bg-red-500'
                    : isSelected
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-gray-300'
                }`}>
                  {showCorrect && <CheckCircle className="w-4 h-4 text-white" />}
                  {showIncorrect && <XCircle className="w-4 h-4 text-white" />}
                  {!showResult && isSelected && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                <span>{option}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {showResult && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Explanation:</h4>
          <p className="text-gray-700 text-sm">{question.explanation}</p>
        </div>
      )}

      {/* Reset Button */}
      {isSubmitted && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => {
              setSelectedAnswer(null)
              setIsAnswered(false)
              setTimeLeft(timeLimit || 0)
            }}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default QuizCard
