import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Play, 
  BookOpen, 
  Headphones, 
  Eye, 
  Hand, 
  ArrowRight, 
  Star,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react'

const Home: React.FC = () => {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const demoTopics = [
    {
      title: "Introduction to React Hooks",
      description: "Learn how to use React hooks to manage state and side effects in functional components.",
      formats: [
        { type: 'text', icon: BookOpen, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { type: 'audio', icon: Headphones, color: 'text-purple-600', bgColor: 'bg-purple-100' },
        { type: 'visual', icon: Eye, color: 'text-green-600', bgColor: 'bg-green-100' },
        { type: 'kinesthetic', icon: Hand, color: 'text-orange-600', bgColor: 'bg-orange-100' }
      ]
    },
    {
      title: "JavaScript Async/Await",
      description: "Master asynchronous programming in JavaScript with async/await syntax.",
      formats: [
        { type: 'text', icon: BookOpen, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { type: 'audio', icon: Headphones, color: 'text-purple-600', bgColor: 'bg-purple-100' },
        { type: 'visual', icon: Eye, color: 'text-green-600', bgColor: 'bg-green-100' },
        { type: 'kinesthetic', icon: Hand, color: 'text-orange-600', bgColor: 'bg-orange-100' }
      ]
    },
    {
      title: "CSS Grid Layout",
      description: "Create complex layouts with CSS Grid, the modern way to design web layouts.",
      formats: [
        { type: 'text', icon: BookOpen, color: 'text-blue-600', bgColor: 'bg-blue-100' },
        { type: 'audio', icon: Headphones, color: 'text-purple-600', bgColor: 'bg-purple-100' },
        { type: 'visual', icon: Eye, color: 'text-green-600', bgColor: 'bg-green-100' },
        { type: 'kinesthetic', icon: Hand, color: 'text-orange-600', bgColor: 'bg-orange-100' }
      ]
    }
  ]

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Learners' },
    { icon: BookOpen, value: '200+', label: 'Courses' },
    { icon: Clock, value: '95%', label: 'Completion Rate' },
    { icon: Star, value: '4.9', label: 'Average Rating' }
  ]

  const features = [
    {
      icon: BookOpen,
      title: 'Multi-Format Learning',
      description: 'Learn through text, audio, visuals, and hands-on activities tailored to your style.'
    },
    {
      icon: CheckCircle,
      title: 'Adaptive Quizzes',
      description: 'AI-powered quizzes that adjust difficulty based on your performance and learning pace.'
    },
    {
      icon: Star,
      title: 'Personalized Paths',
      description: 'Get course recommendations and learning paths optimized for your goals and preferences.'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demoTopics.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Learn Smarter,{' '}
                <span className="text-primary-600">Your Way</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                EduAdapt AI personalizes your learning experience with AI-powered content 
                in multiple formats. Discover your optimal learning style and accelerate 
                your growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/courses"
                  className="btn-primary text-lg px-8 py-4 flex items-center justify-center space-x-2"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/register"
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Get Started Free
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Personalization Demo
                </h3>
                <motion.div
                  key={currentDemo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {demoTopics[currentDemo].title}
                    </h4>
                    <p className="text-gray-600">
                      {demoTopics[currentDemo].description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {demoTopics[currentDemo].formats.map((format, index) => {
                      const Icon = format.icon
                      return (
                        <motion.button
                          key={format.type}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`p-4 rounded-lg border-2 border-gray-200 hover:border-primary-300 transition-all duration-200 ${format.bgColor}`}
                        >
                          <Icon className={`w-6 h-6 mx-auto mb-2 ${format.color}`} />
                          <span className={`text-sm font-medium capitalize ${format.color}`}>
                            {format.type}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>
                </motion.div>
                
                <div className="flex justify-center mt-6 space-x-2">
                  {demoTopics.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentDemo(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentDemo ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose EduAdapt AI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform adapts to your learning style and provides 
              personalized content in multiple formats for maximum comprehension.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="card text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who have discovered their optimal learning style 
              and accelerated their growth with EduAdapt AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
              >
                Start Learning Today
              </Link>
              <Link
                to="/courses"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
              >
                Browse Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
