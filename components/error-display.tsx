'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  AlertTriangle, 
  Wifi, 
  Globe, 
  Clock, 
  Shield, 
  Server, 
  RefreshCw, 
  ExternalLink,
  HelpCircle,
  ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ErrorDisplayProps {
  errorType: string
  errorMessage: string
  url?: string
  onRetry?: () => void
  onGoBack?: () => void
}

const getErrorConfig = (errorType: string) => {
  switch (errorType) {
    case 'URL_NOT_FOUND':
    case 'DNS_NOT_RESOLVED':
      return {
        icon: Globe,
        title: 'Website Not Found',
        color: 'text-red-500',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        borderColor: 'border-red-200 dark:border-red-800',
        suggestions: [
          'Verify the website URL is spelled correctly',
          'Check if the website is currently online',
          'Try accessing the website directly in your browser',
          'Ensure the URL includes the correct protocol (https://)'
        ]
      }
    case 'CONNECTION_ERROR':
    case 'CONNECTION_REFUSED':
      return {
        icon: Wifi,
        title: 'Connection Failed',
        color: 'text-orange-500',
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
        borderColor: 'border-orange-200 dark:border-orange-800',
        suggestions: [
          'The website server may be temporarily down',
          'Check if the website is accessible from your browser',
          'The site may be blocking automated analysis tools',
          'Try again in a few minutes'
        ]
      }
    case 'TIMEOUT_ERROR':
    case 'NAVIGATION_TIMEOUT':
      return {
        icon: Clock,
        title: 'Request Timeout',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
        borderColor: 'border-yellow-200 dark:border-yellow-800',
        suggestions: [
          'The website is taking too long to respond',
          'Check your internet connection',
          'The website may be experiencing high traffic',
          'Try analyzing the website again later'
        ]
      }
    case 'PAGE_NOT_FOUND':
      return {
        icon: AlertTriangle,
        title: 'Page Not Found',
        color: 'text-red-500',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        borderColor: 'border-red-200 dark:border-red-800',
        suggestions: [
          'The specific page URL returns a 404 error',
          'Check if the URL path is correct',
          'Try using the main domain URL instead',
          'Verify the page exists on the website'
        ]
      }
    case 'ACCESS_DENIED':
    case 'ACCESS_FORBIDDEN':
      return {
        icon: Shield,
        title: 'Access Denied',
        color: 'text-purple-500',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        borderColor: 'border-purple-200 dark:border-purple-800',
        suggestions: [
          'The website is blocking our analysis tool',
          'The site may have strict security measures',
          'Try analyzing a different page on the same domain',
          'Contact the website owner for permission'
        ]
      }
    case 'SERVER_ERROR':
      return {
        icon: Server,
        title: 'Server Error',
        color: 'text-red-500',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        borderColor: 'border-red-200 dark:border-red-800',
        suggestions: [
          'The website server is experiencing issues',
          'This is a temporary problem on their end',
          'Try again in a few minutes',
          'Check if the website is working in your browser'
        ]
      }
    case 'NETWORK_ERROR':
      return {
        icon: Wifi,
        title: 'Network Error',
        color: 'text-blue-500',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        borderColor: 'border-blue-200 dark:border-blue-800',
        suggestions: [
          'Check your internet connection',
          'Verify you can access other websites',
          'Try refreshing the page',
          'Contact your network administrator if the issue persists'
        ]
      }
    case 'INVALID_URL':
      return {
        icon: Globe,
        title: 'Invalid URL Format',
        color: 'text-orange-500',
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
        borderColor: 'border-orange-200 dark:border-orange-800',
        suggestions: [
          'Ensure the URL starts with https:// or http://',
          'Check for typos in the website address',
          'Make sure the URL format is correct',
          'Example: https://example.com'
        ]
      }
    case 'ANALYSIS_FAILED':
      return {
        icon: AlertTriangle,
        title: 'Analysis Failed',
        color: 'text-red-500',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        borderColor: 'border-red-200 dark:border-red-800',
        suggestions: [
          'The website may be blocking automated tools',
          'The site structure may be incompatible with our analyzer',
          'Try analyzing a different page',
          'Contact support if the issue persists'
        ]
      }
    default:
      return {
        icon: HelpCircle,
        title: 'Analysis Error',
        color: 'text-gray-500',
        bgColor: 'bg-gray-50 dark:bg-gray-900/20',
        borderColor: 'border-gray-200 dark:border-gray-800',
        suggestions: [
          'An unexpected error occurred',
          'Please try again',
          'Check if the website is accessible',
          'Contact support if the problem continues'
        ]
      }
  }
}

export function ErrorDisplay({ errorType, errorMessage, url, onRetry, onGoBack }: ErrorDisplayProps) {
  const config = getErrorConfig(errorType)
  const IconComponent = config.icon

  return (
    <div className="min-h-[400px] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className={`${config.bgColor} ${config.borderColor} border-2 shadow-lg`}>
          <CardContent className="p-8">
            {/* Error Icon and Title */}
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className={`w-20 h-20 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
              >
                <IconComponent className={`w-10 h-10 ${config.color}`} />
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`text-2xl font-bold ${config.color} mb-2`}
              >
                {config.title}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 dark:text-gray-400 text-lg"
              >
                {errorMessage}
              </motion.p>
              
              {url && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Attempted URL:</p>
                  <p className="text-sm font-mono text-gray-900 dark:text-white break-all">{url}</p>
                </motion.div>
              )}
            </div>

            {/* Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                What you can try:
              </h3>
              <ul className="space-y-2">
                {config.suggestions.map((suggestion, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                  >
                    <div className={`w-2 h-2 ${config.color.replace('text-', 'bg-')} rounded-full mt-2 flex-shrink-0`} />
                    <span className="text-sm">{suggestion}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              {onRetry && (
                <Button
                  onClick={onRetry}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
              )}
              
              {onGoBack && (
                <Button
                  onClick={onGoBack}
                  variant="outline"
                  className="flex items-center gap-2 px-6 py-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </Button>
              )}
              
              {url && (
                <Button
                  onClick={() => window.open(url, '_blank')}
                  variant="outline"
                  className="flex items-center gap-2 px-6 py-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Visit Website
                </Button>
              )}
            </motion.div>

            {/* Additional Help */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Still having issues? {' '}
                <a 
                  href="/contact" 
                  className={`${config.color} hover:underline font-medium`}
                >
                  Contact our support team
                </a>
                {' '} for assistance.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}