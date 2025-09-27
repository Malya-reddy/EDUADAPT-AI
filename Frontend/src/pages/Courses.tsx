import React, { useState, useEffect } from 'react'
import { Search, Grid, List } from 'lucide-react'
import CourseCard from '../components/CourseCard'
import type { Course, SearchFilters } from '../types'

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [filters, setFilters] = useState<SearchFilters>({})
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading, setIsLoading] = useState(true)

  // Mock data with your required courses
  useEffect(() => {
    const mockCourses: Course[] = [
      {
        id: '1',
        title: 'Java Programming',
        description: 'Learn Java programming from basics to advanced, including OOP concepts, collections, and multithreading.',
        instructor: 'John Doe',
        duration: 30,
        difficulty: 'beginner',
        rating: 4.7,
        studentsCount: 15000,
        thumbnail: 'https://images.unsplash.com/photo-1584697964199-8c9eebfa3f9c?w=400&h=300&fit=crop',
        topics: [],
        createdAt: '2024-01-01'
      },
      {
        id: '2',
        title: 'Python Programming',
        description: 'Master Python with hands-on coding, data analysis, and automation projects.',
        instructor: 'Jane Smith',
        duration: 25,
        difficulty: 'beginner',
        rating: 4.8,
        studentsCount: 18000,
        thumbnail: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=300&fit=crop',
        topics: [],
        createdAt: '2024-01-02'
      },
      {
        id: '3',
        title: 'C Programming',
        description: 'Solid foundation in C programming, memory management, and pointers.',
        instructor: 'Alex Lee',
        duration: 20,
        difficulty: 'beginner',
        rating: 4.6,
        studentsCount: 12000,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
        topics: [],
        createdAt: '2024-01-03'
      },
      {
        id: '4',
        title: 'Data Structures',
        description: 'In-depth course on arrays, linked lists, stacks, queues, trees, and graphs.',
        instructor: 'Emily White',
        duration: 35,
        difficulty: 'intermediate',
        rating: 4.9,
        studentsCount: 14000,
        thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
        topics: [],
        createdAt: '2024-01-04'
      },
      {
        id: '5',
        title: 'HTML & CSS',
        description: 'Learn to build modern and responsive websites with HTML5 and CSS3.',
        instructor: 'David Kim',
        duration: 15,
        difficulty: 'beginner',
        rating: 4.5,
        studentsCount: 20000,
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
        topics: [],
        createdAt: '2024-01-05'
      },
      {
        id: '6',
        title: 'JavaScript Essentials',
        description: 'Complete guide to JavaScript fundamentals, DOM manipulation, and ES6+ features.',
        instructor: 'Sophia Brown',
        duration: 22,
        difficulty: 'intermediate',
        rating: 4.7,
        studentsCount: 17000,
        thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop',
        topics: [],
        createdAt: '2024-01-06'
      },
      {
        id: '7',
        title: 'ReactJS Development',
        description: 'Learn ReactJS from scratch with components, hooks, and building real-world apps.',
        instructor: 'Chris Martin',
        duration: 28,
        difficulty: 'intermediate',
        rating: 4.8,
        studentsCount: 16000,
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
        topics: [],
        createdAt: '2024-01-07'
      }
    ]

    setTimeout(() => {
      setCourses(mockCourses)
      setFilteredCourses(mockCourses)
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, query }))
  }

  const applyFilters = () => {
    let filtered = [...courses]

    if (filters.query) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(filters.query!.toLowerCase()) ||
        course.description.toLowerCase().includes(filters.query!.toLowerCase()) ||
        course.instructor.toLowerCase().includes(filters.query!.toLowerCase())
      )
    }

    setFilteredCourses(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [filters, courses])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Programming Courses</h1>
          <p className="text-gray-600">Browse through Java, Python, C, Data Structures, Web Development, and more.</p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={filters.query || ''}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-600">{filteredCourses.length} course(s) found</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} Course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No courses found</div>
        )}
      </div>
    </div>
  )
}

export default Courses
