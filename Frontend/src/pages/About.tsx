import React from 'react'
import { Users, Target, Award, Lightbulb } from 'lucide-react'

const About: React.FC = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-Founder',
      bio: 'Former Google AI researcher with 10+ years in educational technology.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Mike Chen',
      role: 'CTO & Co-Founder',
      bio: 'Full-stack engineer and AI specialist with expertise in machine learning.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Head of Learning Science',
      bio: 'Educational psychologist with PhD in cognitive learning and adaptive systems.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      bio: 'Frontend specialist passionate about creating intuitive user experiences.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    }
  ]

  const values = [
    {
      icon: Target,
      title: 'Personalization',
      description: 'We believe every learner is unique and deserves a personalized educational experience that adapts to their individual needs and learning style.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We leverage cutting-edge AI technology to create innovative learning solutions that make education more effective and engaging.'
    },
    {
      icon: Users,
      title: 'Accessibility',
      description: 'Education should be accessible to everyone. We design our platform to be inclusive and support learners of all backgrounds and abilities.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We are committed to delivering high-quality educational content and experiences that help learners achieve their goals and reach their potential.'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Active Learners' },
    { number: '200+', label: 'Expert Instructors' },
    { number: '95%', label: 'Completion Rate' },
    { number: '4.9/5', label: 'Average Rating' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-primary-600">EduAdapt AI</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're revolutionizing education through AI-powered personalization, 
              making learning more effective, engaging, and accessible for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At EduAdapt AI, we believe that every learner is unique and deserves an 
                educational experience tailored to their individual needs, learning style, 
                and pace. Our mission is to democratize personalized education by leveraging 
                artificial intelligence to create adaptive learning experiences that help 
                learners achieve their full potential.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We're building the future of education where AI understands how you learn 
                best and adapts content, format, and pace to maximize your comprehension 
                and retention.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Impact</h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape our vision for the future of education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="card text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're a diverse team of educators, engineers, and AI researchers 
              passionate about transforming education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="mb-6">
                EduAdapt AI was born from a simple observation: traditional one-size-fits-all 
                education wasn't working for everyone. Our founders, Sarah and Mike, met while 
                working on AI research at Google, where they saw the potential for machine 
                learning to revolutionize how we learn.
              </p>
              <p className="mb-6">
                After years of research and development, we launched EduAdapt AI with the 
                vision of creating a learning platform that truly adapts to each individual 
                learner. Today, we're proud to serve thousands of learners worldwide, helping 
                them discover their optimal learning style and achieve their educational goals.
              </p>
              <p>
                We're just getting started. Join us on this journey to make personalized 
                education accessible to everyone, everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Experience Personalized Learning?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who have discovered their optimal learning style 
            with EduAdapt AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-white text-primary-600 hover:bg-gray-50 font-medium py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              Start Learning Today
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-4 px-8 rounded-lg transition-colors duration-200 text-lg"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
