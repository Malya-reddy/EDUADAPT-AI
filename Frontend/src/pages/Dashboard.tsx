import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Target,
  Award,
  Play
} from 'lucide-react'
import DashboardChart from '../components/DashboardChart'
import AchievementBadge from '../components/AchievementBadge'
import CourseCard from '../components/CourseCard'
import type { DashboardData, Course, Badge } from '../types'

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockData: DashboardData = {
      user: {
        id: '1',
        email: 'john@example.com',
        name: 'John Doe',
        preferredLearningStyles: [
          { type: 'visual', preference: 85 },
          { type: 'auditory', preference: 60 },
          { type: 'kinesthetic', preference: 70 },
          { type: 'reading', preference: 90 }
        ],
        streak: 12,
        badges: [
          {
            id: '1',
            name: 'First Steps',
            description: 'Completed your first lesson',
            icon: '🎯',
            earnedAt: '2024-01-15'
          },
          {
            id: '2',
            name: 'Week Warrior',
            description: '7-day learning streak',
            icon: '🔥',
            earnedAt: '2024-01-20'
          },
          {
            id: '3',
            name: 'Quiz Master',
            description: 'Scored 90%+ on 5 quizzes',
            icon: '🧠',
            earnedAt: '2024-01-22'
          }
        ],
        createdAt: '2024-01-01'
      },
      progress: [
        {
          courseId: '1',
          topicId: '1',
          completed: true,
          score: 95,
          timeSpent: 45,
          lastAccessed: '2024-01-24'
        },
        {
          courseId: '1',
          topicId: '2',
          completed: true,
          score: 88,
          timeSpent: 32,
          lastAccessed: '2024-01-23'
        },
        {
          courseId: '2',
          topicId: '1',
          completed: false,
          timeSpent: 15,
          lastAccessed: '2024-01-24'
        }
      ],
      recommendedCourses: [
        {
          id: '3',
          title: 'Advanced React Patterns',
          description: 'Master advanced React concepts including hooks, context, and performance optimization.',
          instructor: 'Sarah Johnson',
          duration: 20,
          difficulty: 'advanced',
          rating: 4.9,
          studentsCount: 8500,
          thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
          topics: [],
          createdAt: '2024-01-10'
        },
        {
          id: '4',
          title: 'TypeScript Fundamentals',
          description: 'Learn TypeScript from scratch and build type-safe applications.',
          instructor: 'Mike Chen',
          duration: 15,
          difficulty: 'intermediate',
          rating: 4.7,
          studentsCount: 12000,
          thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop',
          topics: [],
          createdAt: '2024-01-05'
        }
      ],
      learningAnalytics: {
        preferredFormats: {
          'Visual': 45,
          'Reading': 30,
          'Audio': 15,
          'Kinesthetic': 10
        },
        weeklyProgress: [
          { date: '2024-01-18', completed: 3 },
          { date: '2024-01-19', completed: 5 },
          { date: '2024-01-20', completed: 2 },
          { date: '2024-01-21', completed: 4 },
          { date: '2024-01-22', completed: 6 },
          { date: '2024-01-23', completed: 3 },
          { date: '2024-01-24', completed: 4 }
        ],
        streakHistory: [
          { date: '2024-01-18', streak: 8 },
          { date: '2024-01-19', streak: 9 },
          { date: '2024-01-20', streak: 10 },
          { date: '2024-01-21', streak: 11 },
          { date: '2024-01-22', streak: 12 },
          { date: '2024-01-23', streak: 12 },
          { date: '2024-01-24', streak: 12 }
        ]
      }
    }

    setTimeout(() => {
      setDashboardData(mockData)
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-64 bg-gray-200 rounded-lg"></div>
                <div className="h-48 bg-gray-200 rounded-lg"></div>
              </div>
              <div className="space-y-6">
                <div className="h-48 bg-gray-200 rounded-lg"></div>
                <div className="h-64 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard not available</h1>
          <Link to="/courses" className="btn-primary">
            Browse Courses
          </Link>
        </div>
      </div>
    )
  }

  const { user, progress, recommendedCourses, learningAnalytics } = dashboardData

  const completedLessons = progress.filter(p => p.completed).length
  const totalTimeSpent = progress.reduce((total, p) => total + p.timeSpent, 0)
  const averageScore = progress
    .filter(p => p.score)
    .reduce((total, p) => total + (p.score || 0), 0) / progress.filter(p => p.score).length

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Here's your learning progress and personalized recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="card text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {completedLessons}
                </div>
                <div className="text-sm text-gray-600">Lessons Completed</div>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {totalTimeSpent}h
                </div>
                <div className="text-sm text-gray-600">Time Spent</div>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {user.streak}
                </div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {Math.round(averageScore || 0)}%
                </div>
                <div className="text-sm text-gray-600">Avg Score</div>
              </div>
            </div>

            {/* Learning Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DashboardChart
                type="pie"
                data={Object.entries(learningAnalytics.preferredFormats).map(([name, value]) => ({
                  name,
                  value
                }))}
                title="Preferred Learning Formats"
                colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444']}
                height={250}
              />

              <DashboardChart
                type="line"
                data={learningAnalytics.weeklyProgress}
                title="Weekly Progress"
                height={250}
              />
            </div>

            {/* Recommended Courses */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
                <Link
                  to="/courses"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Achievements */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-4">
                {user.badges.map((badge) => (
                  <AchievementBadge
                    key={badge.id}
                    badge={badge}
                    size="sm"
                    showDescription={true}
                    isEarned={true}
                  />
                ))}
              </div>
            </div>

            {/* Learning Style */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Learning Style</h3>
              <div className="space-y-3">
                {user.preferredLearningStyles.map((style) => (
                  <div key={style.type} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {style.type}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-primary-600 rounded-full"
                          style={{ width: `${style.preference}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 w-8">
                        {style.preference}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/courses"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <BookOpen className="w-5 h-5 text-primary-600" />
                  <span className="text-sm font-medium text-gray-700">Browse Courses</span>
                </Link>
                <Link
                  to="/courses"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Play className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Continue Learning</span>
                </Link>
                <Link
                  to="/courses"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Target className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">Set Goals</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
