import React from 'react'
import type { Badge } from '../types'

interface AchievementBadgeProps {
  badge: Badge
  size?: 'sm' | 'md' | 'lg'
  showDescription?: boolean
  isEarned?: boolean
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ 
  badge, 
  size = 'md',
  showDescription = false,
  isEarned = true
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-12 h-12 text-lg'
      case 'lg':
        return 'w-20 h-20 text-3xl'
      default:
        return 'w-16 h-16 text-2xl'
    }
  }

  const getTextSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs'
      case 'lg':
        return 'text-sm'
      default:
        return 'text-xs'
    }
  }

  return (
    <div className={`flex flex-col items-center space-y-2 ${!isEarned ? 'opacity-50' : ''}`}>
      <div className={`${getSizeClasses()} rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
        isEarned 
          ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white' 
          : 'bg-gray-200 text-gray-400'
      }`}>
        <span>{badge.icon}</span>
      </div>
      
      <div className="text-center">
        <h4 className={`font-medium text-gray-900 ${getTextSizeClasses()}`}>
          {badge.name}
        </h4>
        {showDescription && (
          <p className="text-gray-600 text-xs mt-1 max-w-32">
            {badge.description}
          </p>
        )}
        {isEarned && (
          <p className="text-gray-500 text-xs mt-1">
            Earned {new Date(badge.earnedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  )
}

export default AchievementBadge
