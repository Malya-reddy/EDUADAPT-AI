import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  Clock, 
  Users, 
  Star, 
  Play, 
  BookOpen, 
  Headphones, 
  Eye, 
  Hand, 
  CheckCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import LessonCard from '../components/LessonCard'
import AudioPlayer from '../components/AudioPlayer'
import VisualContent from '../components/VisualContent'
import type { Course, Topic, ContentFormat } from '../types'

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [course, setCourse] = useState<Course | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<ContentFormat | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(new Set())

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockCourse: Course = {
      id: id || '1',
      title: 'Complete JavaScript Mastery',
      description: 'Master JavaScript from basics to advanced concepts including ES6+, async programming, and modern frameworks. This comprehensive course covers everything you need to become a JavaScript expert.',
      instructor: 'Sarah Johnson',
      duration: 25,
      difficulty: 'intermediate',
      rating: 4.8,
      studentsCount: 15420,
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop',
      topics: [
        {
          id: '1',
          title: 'JavaScript Fundamentals',
          description: 'Learn the basics of JavaScript including variables, functions, and control structures.',
          order: 1,
          content: [
            {
              type: 'text',
              content: 'JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web. In this lesson, we\'ll cover the fundamental concepts including variables, data types, functions, and control structures.',
              available: true
            },
            {
              type: 'audio',
              content: 'Audio explanation of JavaScript fundamentals',
              url: 'https://example.com/audio/js-fundamentals.mp3',
              duration: 15,
              available: true
            },
            {
              type: 'visual',
              content: 'Visual diagram showing JavaScript execution flow',
              url: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=400&fit=crop',
              available: true
            },
            {
              type: 'kinesthetic',
              content: 'Interactive coding exercises',
              available: false
            },
            {
              type: 'video',
              content: 'Video tutorial on JavaScript basics',
              url: 'https://example.com/video/js-fundamentals.mp4',
              duration: 20,
              available: true
            }
          ]
        },
        {
          id: '2',
          title: 'ES6+ Features',
          description: 'Explore modern JavaScript features including arrow functions, destructuring, and modules.',
          order: 2,
          content: [
            {
              type: 'text',
              content: 'ES6 (ECMAScript 2015) introduced many new features that make JavaScript more powerful and easier to work with. We\'ll cover arrow functions, destructuring, template literals, and more.',
              available: true
            },
            {
              type: 'audio',
              content: 'Audio explanation of ES6 features',
              url: 'https://example.com/audio/es6-features.mp3',
              duration: 18,
              available: true
            },
            {
              type: 'visual',
              content: 'Visual comparison of ES5 vs ES6 syntax',
              url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop',
              available: true
            },
            {
              type: 'kinesthetic',
              content: 'Hands-on coding exercises with ES6',
              available: true
            },
            {
              type: 'video',
              content: 'Video demonstration of ES6 features',
              url: 'https://example.com/video/es6-features.mp4',
              duration: 25,
              available: true
            }
          ]
        },
        {
          id: '3',
          title: 'Asynchronous JavaScript',
          description: 'Master promises, async/await, and handling asynchronous operations.',
          order: 3,
          content: [
            {
              type: 'text',
              content: 'Asynchronous programming is crucial in JavaScript. Learn how to work with promises, async/await, and handle asynchronous operations effectively.',
              available: true
            },
            {
              type: 'audio',
              content: 'Audio explanation of async JavaScript',
              url: 'https://example.com/audio/async-js.mp3',
              duration: 22,
              available: true
            },
            {
              type: 'visual',
              content: 'Flow diagram of promise execution',
              url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop',
              available: true
            },
            {
              type: 'kinesthetic',
              content: 'Interactive async coding challenges',
              available: true
            },
            {
              type: 'video',
              content: 'Video tutorial on async/await',
              url: 'https://example.com/video/async-js.mp4',
              duration: 30,
              available: true
            }
          ]
        }
      ],
      createdAt: '2024-01-15'
    }

    setTimeout(() => {
      setCourse(mockCourse)
      setSelectedTopic(mockCourse.topics[0])
      setSelectedFormat(mockCourse.topics[0].content[0])
      setIsLoading(false)
    }, 1000)
  }, [id])

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic)
    setSelectedFormat(topic.content.find(format => format.available) || topic.content[0])
  }

  const handleFormatSelect = (format: ContentFormat) => {
    setSelectedFormat(format)
  }

  const markTopicComplete = (topicId: string) => {
    setCompletedTopics(prev => new Set([...prev, topicId]))
  }

  const getFormatIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <BookOpen className="w-5 h-5" />
      case 'audio':
        return <Headphones className="w-5 h-5" />
      case 'visual':
        return <Eye className="w-5 h-5" />
      case 'kinesthetic':
        return <Hand className="w-5 h-5" />
      case 'video':
        return <Play className="w-5 h-5" />
      default:
        return <BookOpen className="w-5 h-5" />
    }
  }

  const getFormatColor = (type: string) => {
    switch (type) {
      case 'text':
        return 'text-blue-600 bg-blue-100'
      case 'audio':
        return 'text-purple-600 bg-purple-100'
      case 'visual':
        return 'text-green-600 bg-green-100'
      case 'kinesthetic':
        return 'text-orange-600 bg-orange-100'
      case 'video':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
                ))}
              </div>
              <div className="lg:col-span-2">
                <div className="h-96 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
          <Link to="/courses" className="btn-primary">
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/courses" className="hover:text-primary-600">Courses</Link>
          <span>/</span>
          <span className="text-gray-900">{course.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
                  <p className="text-gray-600 text-lg">{course.description}</p>
                </div>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="text-gray-900 font-medium">{course.rating}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{course.studentsCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium">
                    {course.difficulty}
                  </span>
                </div>
              </div>
            </div>

            {/* Selected Topic Content */}
            {selectedTopic && selectedFormat && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTopic.title}</h2>
                  <div className="flex items-center space-x-2">
                    {selectedTopic.content
                      .filter(format => format.available)
                      .map((format, index) => (
                        <button
                          key={index}
                          onClick={() => handleFormatSelect(format)}
                          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                            selectedFormat.type === format.type
                              ? getFormatColor(format.type)
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {getFormatIcon(format.type)}
                          <span className="capitalize text-sm font-medium">{format.type}</span>
                        </button>
                      ))}
                  </div>
                </div>

                <div className="prose max-w-none">
                  {selectedFormat.type === 'text' && (
                    <div className="text-gray-700 leading-relaxed">
                      {selectedFormat.content}
                    </div>
                  )}

                  {selectedFormat.type === 'audio' && selectedFormat.url && (
                    <AudioPlayer
                      src={selectedFormat.url}
                      title={selectedTopic.title}
                    />
                  )}

                  {selectedFormat.type === 'visual' && selectedFormat.url && (
                    <VisualContent
                      src={selectedFormat.url}
                      alt={selectedTopic.title}
                      title={selectedTopic.title}
                      type="diagram"
                      description={selectedFormat.content}
                    />
                  )}

                  {selectedFormat.type === 'kinesthetic' && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
                      <Hand className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-orange-900 mb-2">
                        Interactive Exercise
                      </h3>
                      <p className="text-orange-700 mb-4">{selectedFormat.content}</p>
                      <button className="btn-primary">
                        Start Exercise
                      </button>
                    </div>
                  )}

                  {selectedFormat.type === 'video' && selectedFormat.url && (
                    <div className="relative bg-black rounded-lg overflow-hidden">
                      <video
                        controls
                        className="w-full h-auto"
                        poster={course.thumbnail}
                      >
                        <source src={selectedFormat.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      const currentIndex = course.topics.findIndex(t => t.id === selectedTopic.id)
                      if (currentIndex > 0) {
                        handleTopicSelect(course.topics[currentIndex - 1])
                      }
                    }}
                    disabled={course.topics.findIndex(t => t.id === selectedTopic.id) === 0}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={() => markTopicComplete(selectedTopic.id)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Mark Complete</span>
                  </button>

                  <button
                    onClick={() => {
                      const currentIndex = course.topics.findIndex(t => t.id === selectedTopic.id)
                      if (currentIndex < course.topics.length - 1) {
                        handleTopicSelect(course.topics[currentIndex + 1])
                      }
                    }}
                    disabled={course.topics.findIndex(t => t.id === selectedTopic.id) === course.topics.length - 1}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Course Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Content</h3>
              <div className="space-y-2">
                {course.topics.map((topic, index) => (
                  <LessonCard
                    key={topic.id}
                    topic={topic}
                    isCompleted={completedTopics.has(topic.id)}
                    isCurrent={selectedTopic?.id === topic.id}
                    onSelect={handleTopicSelect}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
