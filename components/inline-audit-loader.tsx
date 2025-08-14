'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
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

interface InlineAuditLoaderProps {
  url: string
  onComplete: (report: any) => void
  onError: (error: string, errorType?: string) => void
}

export function InlineAuditLoader({ url, onComplete, onError }: InlineAuditLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [currentStepInfo, setCurrentStepInfo] = useState(loadingSteps[0])
  const stepsGridRef = useRef<HTMLDivElement>(null)

  // Initial scroll to audit section on page load - Only once
  useEffect(() => {
    // Scroll to the audit report section to show the full loading component
    const auditSection = document.getElementById('audit-report-section')
    if (auditSection) {
      auditSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
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
  }, [url])

  const performActualAnalysis = async () => {
    try {
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url,
          includeScreenshot: true
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        const errorMessage = errorData.error || "Failed to submit audit request"
        const errorType = errorData.errorType || "GENERAL_ERROR"
        onError(errorMessage, errorType)
        return
      }

      const json = await response.json()
      if (json.success && json.report) {
        onComplete(json.report)
      } else {
        onError("Invalid server response", "GENERAL_ERROR")
      }
    } catch (error) {
      console.error('Analysis error:', error)
      
      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        onError("Network connection failed. Please check your internet connection.", "NETWORK_ERROR")
      } else {
        onError(error instanceof Error ? error.message : "Analysis failed", "GENERAL_ERROR")
      }
    }
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="max-w-3xl mx-auto text-center">
        {/* Compact Header */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Analyzing Your Website
          </h2>
          {url && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {url.replace(/https?:\/\//, '')}
            </p>
          )}
        </motion.div>

        {/* Compact Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-4"
        >
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 shadow-inner">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </motion.div>

        {/* Compact Current step */}
        <motion.div
          key={currentStep}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center shadow-lg">
              {React.createElement(currentStepInfo.icon, {
                className: "w-6 h-6 text-blue-600 dark:text-blue-400"
              })}
            </div>
            <div className="text-left">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentStepInfo.label}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentStepInfo.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Enlarged Steps grid - All visible */}
        <div ref={stepsGridRef} className="grid grid-cols-3 gap-4 max-w-4xl mx-auto mb-6">
          {loadingSteps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id)
            const isCurrent = index === currentStep
            const isPending = index > currentStep

            return (
              <motion.div
                key={step.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl border-2 transition-all duration-500 ${
                  isCompleted
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 shadow-md'
                    : isCurrent
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 ring-2 ring-blue-500/20 shadow-lg scale-105'
                    : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500 shadow-lg'
                      : isCurrent
                      ? 'bg-blue-500 shadow-lg'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-7 h-7 text-white" />
                    ) : isCurrent ? (
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                    ) : (
                      React.createElement(step.icon, {
                        className: `w-6 h-6 ${
                          isPending ? 'text-gray-500' : 'text-white'
                        }`
                      })
                    )}
                  </div>
                  <span className={`text-sm font-medium text-center leading-tight ${
                    isCompleted
                      ? 'text-green-700 dark:text-green-400'
                      : isCurrent
                      ? 'text-blue-700 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Compact Patience message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <div className="flex justify-center space-x-1 mb-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-blue-500 rounded-full"
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
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We are analyzing your website to generate a comprehensive SEO report.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            This usually takes 30-50 seconds...
          </p>
        </motion.div>
      </div>
    </div>
  )
}