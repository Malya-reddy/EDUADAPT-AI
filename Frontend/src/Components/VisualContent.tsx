import React, { useState } from 'react'
import { ZoomIn, ZoomOut, RotateCw, Download, Maximize2 } from 'lucide-react'

interface VisualContentProps {
  src: string
  alt: string
  title?: string
  type?: 'image' | 'diagram' | 'chart'
  description?: string
}

const VisualContent: React.FC<VisualContentProps> = ({ 
  src, 
  alt, 
  title, 
  type = 'image',
  description 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = src
    link.download = title || 'visual-content'
    link.click()
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const getTypeIcon = () => {
    switch (type) {
      case 'diagram':
        return '📊'
      case 'chart':
        return '📈'
      default:
        return '🖼️'
    }
  }

  const getTypeColor = () => {
    switch (type) {
      case 'diagram':
        return 'bg-blue-100 text-blue-800'
      case 'chart':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      {(title || type !== 'image') && (
        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{getTypeIcon()}</span>
              {title && (
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              )}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor()}`}>
                {type}
              </span>
            </div>
            <button
              onClick={handleDownload}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
          {description && (
            <p className="text-sm text-gray-600 mt-2">{description}</p>
          )}
        </div>
      )}

      {/* Image Container */}
      <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
        <div 
          className={`${isFullscreen ? 'w-full h-full flex items-center justify-center p-4' : 'p-4'}`}
        >
          <div className="relative overflow-hidden rounded-lg bg-gray-100">
            <img
              src={src}
              alt={alt}
              className={`max-w-full h-auto transition-transform duration-200 ${
                isFullscreen ? 'max-h-full' : 'w-full'
              }`}
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow-lg px-4 py-2">
            <button
              onClick={handleZoomOut}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            <span className="text-sm text-gray-600 min-w-0">
              {Math.round(zoom * 100)}%
            </span>
            
            <button
              onClick={handleZoomIn}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
              disabled={zoom >= 3}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            
            <div className="w-px h-6 bg-gray-300 mx-2" />
            
            <button
              onClick={handleReset}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            
            <div className="w-px h-6 bg-gray-300 mx-2" />
            
            <button
              onClick={toggleFullscreen}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors duration-200"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleFullscreen}
        />
      )}
    </div>
  )
}

export default VisualContent
