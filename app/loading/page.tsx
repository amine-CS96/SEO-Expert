'use client'

import React, { useState, useEffect, useRef, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  Search,
  Globe,
  BarChart3,
  Zap,
  CheckCircle,
  Smartphone,
  Link,
  Share2,
  FileText,
  Database,
  Loader2
} from 'lucide-react'

interface LoadingStep {
  id: string
  label: string
  icon: React.ComponentType<any>
  duration: number
  description: string
}

const loadingSteps: LoadingStep[] = [
  {
    id: 'crawling',
    label: 'Crawling Website',
    icon: Globe,
    duration: 2000,
    description: 'Accessing and analyzing your website structure'
  },
  {
    id: 'seo-analysis',
    label: 'SEO Analysis',
    icon: Search,
    duration: 3000,
    description: 'Examining meta tags, headings, and content optimization'
  },
  {
    id: 'performance',
    label: 'Performance Testing',
    icon: Zap,
    duration: 2500,
    description: 'Measuring page speed and core web vitals'
  },
  {
    id: 'mobile-check',
    label: 'Mobile Usability',
    icon: Smartphone,
    duration: 2000,
    description: 'Testing responsive design and mobile experience'
  },
  {
    id: 'backlinks',
    label: 'Backlink Analysis',
    icon: Link,
    duration: 2500,
    description: 'Analyzing link profile and domain authority'
  },
  {
    id: 'social-signals',
    label: 'Social Signals',
    icon: Share2,
    duration: 1500,
    description: 'Checking social media integration and sharing'
  },
  {
    id: 'content-analysis',
    label: 'Content Analysis',
    icon: FileText,
    duration: 2000,
    description: 'Evaluating keyword density and content quality'
  },
  {
    id: 'technical-seo',
    label: 'Technical SEO',
    icon: Database,
    duration: 2500,
    description: 'Reviewing structured data and technical elements'
  },
  {
    id: 'generating-report',
    label: 'Generating Report',
    icon: BarChart3,
    duration: 1500,
    description: 'Compiling comprehensive audit results'
  }
]

function LoadingPageContent() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [currentStepInfo, setCurrentStepInfo] = useState(loadingSteps[0])
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const stepsGridRef = useRef<HTMLDivElement>(null)
  
  const url = searchParams.get('url') || ''
  const email = searchParams.get('email') || ''

  // Initial scroll to top on page load - Only once
  useEffect(() => {
    // Immediate scroll to top
    window.scrollTo(0, 0)
    
    // Additional attempts with different timings to ensure it works
    const timers = [
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'instant' }), 50),
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100),
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 300)
    ]

    return () => timers.forEach(timer => clearTimeout(timer))
  }, []) // Empty dependency array - runs only once on mount

  useEffect(() => {
    let stepIndex = 0
    
    const processStep = () => {
      if (stepIndex >= loadingSteps.length) {
        // Start actual analysis
        performActualAnalysis()
        return
      }

      const step = loadingSteps[stepIndex]
      setCurrentStep(stepIndex)
      setCurrentStepInfo(step)
      
      // Update progress
      const stepProgress = ((stepIndex + 1) / loadingSteps.length) * 100
      setProgress(stepProgress)

      setTimeout(() => {
        setCompletedSteps(prev => [...prev, step.id])
        stepIndex++
        
        if (stepIndex < loadingSteps.length) {
          processStep()
        } else {
          // All steps are completed, start analysis
          performActualAnalysis()
        }
      }, step.duration)
    }

    processStep()
  }, [])

  const performActualAnalysis = async () => {
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          url: decodeURIComponent(url),
          includeScreenshot: true
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.details || "Failed to submit audit request")
      }

      const json = await response.json()
      if (json.success && json.report) {
        // Store report in localStorage to retrieve it on main page
        localStorage.setItem('seo-audit-report', JSON.stringify(json.report))
        
        // Redirect to main page with parameter to indicate there's a new report
        router.push('/?report=ready#audit-report-section')
      } else {
        throw new Error("Invalid server response")
      }
    } catch (error) {
      console.error(error)
      // Redirect to main page with error
      router.push('/?error=analysis-failed')
    }
  }

  return (
    <div className="min-h-screen bg-white flex p-0 overflow-hidden">
      <div className="max-w-2xl mx-auto text-center w-full flex flex-col justify-between" style={{ height: '100vh', transform: 'scale(0.8)', transformOrigin: 'center center', padding: '10px 0' }}>
        {/* Header - Micro */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0 mb-0.5"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-0.5 shadow-lg">
            <Search className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-base font-bold text-gray-900 mb-0">
            Analyzing Your Website
          </h1>
          {url && (
            <p className="text-xs text-gray-600">
              {decodeURIComponent(url).replace(/https?:\/\//, '')}
            </p>
          )}
        </motion.div>

        {/* Progress bar - Micro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-shrink-0 mb-0.5"
        >
          <div className="flex justify-between text-xs text-gray-600 mb-0">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Current step - Micro */}
        <motion.div
          key={currentStep}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-shrink-0 mb-1"
        >
          <div className="flex items-center justify-center space-x-1">
            <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
              {React.createElement(currentStepInfo.icon, {
                className: "w-2.5 h-2.5 text-blue-600"
              })}
            </div>
            <div className="text-left">
              <h3 className="text-xs font-semibold text-gray-900">
                {currentStepInfo.label}
              </h3>
              <p className="text-xs text-gray-600">
                {currentStepInfo.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Steps grid - Micro */}
        <div ref={stepsGridRef} className="grid grid-cols-3 gap-1 max-w-sm mx-auto mb-1">
          {loadingSteps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id)
            const isCurrent = index === currentStep
            const isPending = index > currentStep

            return (
              <motion.div
                key={step.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className={`p-1 rounded border transition-all duration-500 ${
                  isCompleted
                    ? 'bg-green-50 border-green-200 shadow-md'
                    : isCurrent
                    ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-500/20 shadow-lg scale-105'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex flex-col items-center space-y-0">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500 shadow-lg'
                      : isCurrent
                      ? 'bg-blue-500 shadow-lg'
                      : 'bg-gray-300'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-2.5 h-2.5 text-white" />
                    ) : isCurrent ? (
                      <Loader2 className="w-2.5 h-2.5 text-white animate-spin" />
                    ) : (
                      React.createElement(step.icon, {
                        className: `w-2.5 h-2.5 ${
                          isPending ? 'text-gray-500' : 'text-white'
                        }`
                      })
                    )}
                  </div>
                  <span className={`text-xs font-medium text-center leading-tight ${
                    isCompleted
                      ? 'text-green-700'
                      : isCurrent
                      ? 'text-blue-700'
                      : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Patience message - Micro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center flex-shrink-0 mt-0.5"
        >
          <div className="flex justify-center space-x-0.5 mb-0.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-0.5 h-0.5 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
          <p className="text-xs text-gray-600 mb-0">
            We are analyzing your website to generate a comprehensive SEO report.
          </p>
          <p className="text-xs text-gray-500">
            This usually takes 30-50 seconds...
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function LoadingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Search className="w-4 h-4 text-white" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <LoadingPageContent />
    </Suspense>
  )
}