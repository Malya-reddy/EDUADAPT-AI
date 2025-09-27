import React from "react"
import {
  Clock,
  CheckCircle,
  Circle,
  Play,
  BookOpen,
  Headphones,
  Eye,
  Hand
} from "lucide-react"
import type { Topic, ContentFormat } from "../types"

interface LessonCardProps {
  topic: Topic
  isCompleted?: boolean
  isCurrent?: boolean
  onSelect: (topic: Topic) => void
}

const LessonCard: React.FC<LessonCardProps> = ({
  topic,
  isCompleted = false,
  isCurrent = false,
  onSelect
}) => {
  const getFormatIcon = (type: string) => {
    switch (type) {
      case "text":
        return <BookOpen className="w-4 h-4" />
      case "audio":
        return <Headphones className="w-4 h-4" />
      case "visual":
        return <Eye className="w-4 h-4" />
      case "kinesthetic":
        return <Hand className="w-4 h-4" />
      case "video":
        return <Play className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getFormatColor = (type: string) => {
    switch (type) {
      case "text":
        return "text-blue-600 bg-blue-100"
      case "audio":
        return "text-purple-600 bg-purple-100"
      case "visual":
        return "text-green-600 bg-green-100"
      case "kinesthetic":
        return "text-orange-600 bg-orange-100"
      case "video":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const availableFormats = topic.content.filter((format) => format.available)

  return (
    <div
      className={`card cursor-pointer transition-all duration-200 ${
        isCurrent
          ? "ring-2 ring-primary-500 bg-primary-50"
          : "hover:shadow-md"
      } ${isCompleted ? "opacity-75" : ""}`}
      onClick={() => onSelect(topic)}
    >
      <div className="flex items-start space-x-4">
        {/* Status Icon */}
        <div className="flex-shrink-0 mt-1">
          {isCompleted ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : isCurrent ? (
            <Play className="w-5 h-5 text-primary-600" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3
                className={`text-lg font-medium ${
                  isCurrent ? "text-primary-900" : "text-gray-900"
                }`}
              >
                {topic.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {topic.description}
              </p>
            </div>
          </div>

          {/* Available Formats */}
          <div className="mt-3 flex flex-wrap gap-2">
            {availableFormats.map((format, index) => (
              <div
                key={index}
                className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getFormatColor(
                  format.type
                )}`}
              >
                {getFormatIcon(format.type)}
                <span className="capitalize">{format.type}</span>
              </div>
            ))}
          </div>

          {/* Duration */}
          <div className="mt-3 flex items-center space-x-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>
              {availableFormats.reduce(
                (total, format) => total + (format.duration || 0),
                0
              )}{" "}
              min
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonCard
