'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Maximize2,
  X,
  ZoomIn,
  ZoomOut,
  Download,
  Share2,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  Camera,
  Globe,
  Clock,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import '../styles/screenshot-preview.css'

interface ScreenshotPreviewProps {
  screenshot: string
  url: string
  title?: string
  timestamp?: string
  deviceType?: 'mobile' | 'tablet' | 'desktop'
  className?: string
  disableScanEffect?: boolean
  useRealisticMonitor?: boolean
}

export function ScreenshotPreview({
  screenshot,
  url,
  title = "Website Preview",
  timestamp,
  deviceType = 'mobile',
  className = "",
  disableScanEffect = false,
  useRealisticMonitor = false
}: ScreenshotPreviewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [imageError, setImageError] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  const deviceConfig = {
    mobile: {
      icon: Smartphone,
      label: 'Mobile View',
      width: 'w-64 md:w-72',
      height: 'h-[30rem] md:h-[32rem]',
      borderRadius: 'rounded-3xl',
      padding: 'p-2'
    },
    tablet: {
      icon: Tablet,
      label: 'Tablet View',
      width: 'w-64 sm:w-80',
      height: 'h-[24rem] sm:h-[28rem]',
      borderRadius: 'rounded-2xl',
      padding: 'p-2 sm:p-3'
    },
    desktop: {
      icon: Monitor,
      label: 'Desktop View',
      width: 'w-96 sm:w-[28rem]',
      height: 'h-72 sm:h-80',
      borderRadius: 'rounded-2xl',
      padding: 'p-1'
    }
  }

  const config = deviceConfig[deviceType]
  const DeviceIcon = config.icon

  useEffect(() => {
    if (imageRef.current) {
      const img = imageRef.current
      if (img.complete) {
        setIsLoading(false)
      }
    }
  }, [])

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  const handleImageError = () => {
    setIsLoading(false)
    setImageError(true)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = `data:image/png;base64,${screenshot}`
    link.download = `screenshot-${url.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '-')}.png`
    link.click()
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Screenshot of ${url}`,
          text: `Check out this website screenshot`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <>
      <div className={`relative group ${className}`}>
        {/* Main Preview Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          {/* Device Frame */}
          {deviceType === 'desktop' && useRealisticMonitor ? (
            /* Realistic Monitor Design with Mobile-like Styling */
            <div className="relative mx-auto screenshot-float screenshot-reflection">
              {/* Monitor Screen */}
              <div className="relative w-96 sm:w-[28rem] h-72 sm:h-80 rounded-lg shadow-2xl border-4 border-blue-300 p-1 device-frame-mobile">
                {/* Screen Bezel */}
                <div className="w-full h-full rounded-md overflow-hidden relative shadow-inner border-2 border-blue-200 screenshot-glass device-frame-mobile">
                  {/* Screen Content will go here */}
                  <div className="w-full h-full bg-white rounded-sm overflow-hidden relative">
                    {/* Browser Chrome */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/80 backdrop-blur-sm">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
                        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
                      </div>
                      <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-slate-600 font-mono truncate ml-2 shadow-inner border border-slate-200/50">
                        <span className="text-slate-400">🔒</span> {url}
                      </div>
                      <div className="flex gap-1">
                        <div className="w-6 h-4 bg-slate-200/50 rounded-sm"></div>
                        <div className="w-6 h-4 bg-slate-200/50 rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* Loading State */}
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50 screenshot-shimmer">
                        <div className="flex flex-col items-center gap-3">
                          <div className="relative">
                            <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin screenshot-glow-blue"></div>
                            <Sparkles className="w-4 h-4 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 screenshot-pulse" />
                          </div>
                          <p className="text-xs text-gray-500 font-medium">Capturing screenshot...</p>
                        </div>
                      </div>
                    )}

                    {/* Error State */}
                    {imageError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <div className="flex flex-col items-center gap-3 text-center p-4">
                          <Camera className="w-8 h-8 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-600">Screenshot unavailable</p>
                            <p className="text-xs text-gray-500 mt-1">Unable to capture website preview</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Screenshot Image */}
                    {!imageError && (
                      <img
                        ref={imageRef}
                        src={`data:image/png;base64,${screenshot}`}
                        alt={`Screenshot of ${url}`}
                        className={`w-full h-full object-cover object-top screenshot-zoom-transition cursor-pointer ${isLoading ? 'opacity-0' : 'opacity-100'} scale-[1.3]`}
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        onClick={() => setIsFullscreen(true)}
                      />
                    )}

                    {/* Status Indicators */}
                    <div className="absolute top-2 left-2 flex gap-2">
                      <Badge variant="secondary" className="text-xs bg-green-500/90 text-white border-0 screenshot-glass status-badge-animate">
                        <div className="w-1.5 h-1.5 bg-white rounded-full mr-1 screenshot-pulse"></div>
                        Live
                      </Badge>
                    </div>

                    {/* Zoom Indicator */}
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-6 w-6 p-0 bg-black/50 hover:bg-black/70 text-white border-0 screenshot-glass screenshot-button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setIsFullscreen(true)
                        }}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Monitor Brand/Power LED */}
                <div className="absolute bottom-2 right-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg screenshot-pulse"></div>
                  <span className="text-xs text-blue-200 font-mono font-bold">MONITOR</span>
                </div>
                
                {/* Device Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-lg pointer-events-none"></div>
              </div>
              
              {/* Monitor Stand with Mobile-like Colors */}
              <div className="relative flex justify-center">
                {/* Stand Neck */}
                <div className="w-4 h-8 rounded-b-lg shadow-lg border border-blue-200 device-frame-mobile"></div>
                
                {/* Stand Base */}
                <div className="absolute top-6 w-24 h-4 rounded-full shadow-xl border border-blue-200 device-frame-mobile">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent rounded-full"></div>
                </div>
              </div>
            </div>
          ) : (
            /* Original Device Frame */
            <div className={`relative mx-auto ${config.width} ${config.height} ${deviceType === 'mobile' ? 'device-frame-mobile' : deviceType === 'tablet' ? 'device-frame-tablet' : 'device-frame-desktop-modern'} ${config.borderRadius} ${config.padding} ${deviceType === 'desktop' ? 'shadow-2xl shadow-blue-500/20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50' : 'shadow-2xl'} screenshot-hover-lift screenshot-float screenshot-reflection`}>
            
            {/* Device Details Bar */}
            <div className="absolute -top-8 left-0 right-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-2">
                <DeviceIcon className="w-4 h-4 text-gray-600" />
                <span className="text-xs text-gray-600 font-medium">{config.label}</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  className="h-6 w-6 p-0 hover:bg-gray-100"
                >
                  <Download className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="h-6 w-6 p-0 hover:bg-gray-100"
                >
                  <Share2 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFullscreen(true)}
                  className="h-6 w-6 p-0 hover:bg-gray-100"
                >
                  <Maximize2 className="w-3 h-3" />
                </Button>
              </div>
            </div>

              {/* Screen Content */}
              <div className={`w-full h-full bg-white ${config.borderRadius === 'rounded-3xl' ? 'rounded-2xl' : config.borderRadius === 'rounded-2xl' ? 'rounded-xl' : 'rounded-lg'} overflow-hidden relative group/screen ${deviceType === 'desktop' ? 'shadow-inner shadow-slate-900/30 ring-1 ring-slate-700/20' : 'screenshot-glass'}`}>
                
                {/* Browser Chrome (for desktop) */}
                {deviceType === 'desktop' && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200/80 backdrop-blur-sm">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-400 to-red-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
                      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
                      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-green-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer"></div>
                    </div>
                    <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-slate-600 font-mono truncate ml-2 shadow-inner border border-slate-200/50">
                      <span className="text-slate-400">🔒</span> {url}
                    </div>
                    <div className="flex gap-1">
                      <div className="w-6 h-4 bg-slate-200/50 rounded-sm"></div>
                      <div className="w-6 h-4 bg-slate-200/50 rounded-sm"></div>
                    </div>
                  </div>
                )}

                {/* Loading State */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 screenshot-shimmer">
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        <div className="w-8 h-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin screenshot-glow-blue"></div>
                        <Sparkles className="w-4 h-4 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 screenshot-pulse" />
                      </div>
                      <p className="text-xs text-gray-500 font-medium">Capturing screenshot...</p>
                    </div>
                  </div>
                )}

                {/* Error State */}
                {imageError && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <div className="flex flex-col items-center gap-3 text-center p-4">
                      <Camera className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-600">Screenshot unavailable</p>
                        <p className="text-xs text-gray-500 mt-1">Unable to capture website preview</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Screenshot Image */}
                {!imageError && (
                  <img
                    ref={imageRef}
                    src={`data:image/png;base64,${screenshot}`}
                    alt={`Screenshot of ${url}`}
                    className={`w-full h-full object-cover object-top screenshot-zoom-transition cursor-pointer ${isLoading ? 'opacity-0' : 'opacity-100'} ${deviceType === 'desktop' ? 'scale-[1.3]' : ''}`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    onClick={() => setIsFullscreen(true)}
                  />
                )}

                {/* Desktop Scan Effect */}
                {deviceType === 'desktop' && !imageError && !isLoading && !disableScanEffect && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="desktop-scan-line"></div>
                  </div>
                )}

                {/* Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300"></div>
                
                {/* Status Indicators */}
                <div className="absolute top-2 left-2 flex gap-2">
                  <Badge variant="secondary" className="text-xs bg-green-500/90 text-white border-0 screenshot-glass status-badge-animate">
                    <div className="w-1.5 h-1.5 bg-white rounded-full mr-1 screenshot-pulse"></div>
                    Live
                  </Badge>
                </div>

                {/* Zoom Indicator */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-6 w-6 p-0 bg-black/50 hover:bg-black/70 text-white border-0 screenshot-glass screenshot-button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsFullscreen(true)
                    }}
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Device Reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl pointer-events-none"></div>
            </div>
          )}

          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 text-center space-y-2"
          >
            <div className="flex items-center justify-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                {title}
              </h3>
            </div>
            
            <p className="text-xs text-gray-600 dark:text-gray-400 font-mono truncate max-w-full">
              {url.replace(/https?:\/\//, '')}
            </p>
            
            {timestamp && (
              <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Captured {new Date(timestamp).toLocaleDateString()}</span>
              </div>
            )}

            <div className="flex items-center justify-center gap-1 text-xs text-green-600">
              <CheckCircle2 className="w-3 h-3" />
              <span>Website analyzed successfully</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 fullscreen-backdrop flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl max-h-full w-full fullscreen-content"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4 text-white">
                <div className="flex items-center gap-3">
                  <DeviceIcon className="w-5 h-5" />
                  <div>
                    <h2 className="font-semibold">{title}</h2>
                    <p className="text-sm text-gray-300 font-mono">{url}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsZoomed(!isZoomed)}
                    className="text-white hover:bg-white/10"
                  >
                    {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDownload}
                    className="text-white hover:bg-white/10"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFullscreen(false)}
                    className="text-white hover:bg-white/10"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Fullscreen Image */}
              <div className="relative bg-white rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={`data:image/png;base64,${screenshot}`}
                  alt={`Fullscreen screenshot of ${url}`}
                  className={`w-full h-auto max-h-[80vh] object-contain transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}
                  style={{ cursor: isZoomed ? 'zoom-out' : 'zoom-in' }}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
              </div>

              {/* Footer Info */}
              <div className="mt-4 text-center text-gray-300 text-sm">
                <p>Click image to {isZoomed ? 'zoom out' : 'zoom in'} • Press ESC or click outside to close</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Enhanced Multi-Device Preview Component
export function MultiDevicePreview({
  mobileScreenshot,
  tabletScreenshot,
  desktopScreenshot,
  url,
  timestamp,
  disableScanEffect = false,
  useRealisticMonitor = false
}: {
  mobileScreenshot?: string
  tabletScreenshot?: string
  desktopScreenshot?: string
  url: string
  timestamp?: string
  disableScanEffect?: boolean
  useRealisticMonitor?: boolean
}) {
  const [activeDevice, setActiveDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')

  const devices = [
    { type: 'mobile' as const, screenshot: mobileScreenshot, icon: Smartphone, label: 'Mobile' },
    { type: 'tablet' as const, screenshot: tabletScreenshot, icon: Tablet, label: 'Tablet' },
    { type: 'desktop' as const, screenshot: desktopScreenshot, icon: Monitor, label: 'Desktop' }
  ].filter(device => device.screenshot)

  if (devices.length === 0) return null

  return (
    <div className="space-y-6">
      {/* Device Selector */}
      <div className="flex justify-center">
        <div className="flex device-selector dark:device-selector-dark rounded-lg p-1">
          {devices.map((device) => {
            const Icon = device.icon
            return (
              <button
                key={device.type}
                onClick={() => setActiveDevice(device.type)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium device-selector-item ${
                  activeDevice === device.type
                    ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm active'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                {device.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Active Device Preview */}
      <AnimatePresence mode="wait">
        {devices.map((device) => (
          device.type === activeDevice && device.screenshot && (
            <motion.div
              key={device.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ScreenshotPreview
                screenshot={device.screenshot}
                url={url}
                title={`${device.label} Preview`}
                timestamp={timestamp}
                deviceType={device.type}
                className="flex justify-center"
                disableScanEffect={disableScanEffect}
                useRealisticMonitor={useRealisticMonitor}
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  )
}
