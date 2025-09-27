// src/types/index.ts

export interface User {
  id: string
  email: string
  name: string
  preferredLearningStyles: LearningStyle[]
  streak: number
  badges: Badge[]
  createdAt: string
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: number // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  rating: number
  studentsCount: number
  thumbnail: string
  topics: Topic[]
  createdAt: string
}

export interface Topic {
  id: string
  title: string
  description: string
  order: number
  content: ContentFormat[]
  quiz?: Quiz
}

export interface ContentFormat {
  type: 'text' | 'audio' | 'visual' | 'kinesthetic' | 'video'
  content: string
  url?: string
  duration?: number
  available: boolean
}

export interface Quiz {
  id: string
  questions: Question[]
  timeLimit?: number
  passingScore: number
}

export interface Question {
  id: string
  type: 'multiple-choice' | 'flowchart' | 'coding' | 'true-false'
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface LearningStyle {
  type: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
  preference: number // 0-100
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: string
}

export interface Progress {
  courseId: string
  topicId: string
  completed: boolean
  score?: number
  timeSpent: number
  lastAccessed: string
}

export interface DashboardData {
  user: User
  progress: Progress[]
  recommendedCourses: Course[]
  learningAnalytics: {
    preferredFormats: { [key: string]: number }
    weeklyProgress: { date: string; completed: number }[]
    streakHistory: { date: string; streak: number }[]
  }
}

export interface SearchFilters {
  query?: string
  difficulty?: string
  duration?: string
  learningStyle?: string
}
