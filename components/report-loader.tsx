'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAudit } from '@/contexts/audit-context'
import { useToast } from '@/hooks/use-toast'

export function ReportLoader() {
  const searchParams = useSearchParams()
  const { setReport, setIsLoading } = useAudit()
  const { toast } = useToast()

  useEffect(() => {
    const reportReady = searchParams.get('report')
    const error = searchParams.get('error')

    if (reportReady === 'ready') {
      // Get report from localStorage
      const storedReport = localStorage.getItem('seo-audit-report')
      if (storedReport) {
        try {
          const report = JSON.parse(storedReport)
          setReport(report)
          setIsLoading(false)
          
          // Clean localStorage
          localStorage.removeItem('seo-audit-report')
          
          // Scroll to report after a short delay with multiple attempts
          setTimeout(() => {
            const reportElement = document.getElementById('audit-report-section')
            if (reportElement) {
              // First scroll to top of page, then to report section
              window.scrollTo({ top: 0, behavior: 'instant' })
              setTimeout(() => {
                reportElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }, 100)
            }
          }, 300)
        } catch (error) {
          console.error('Error parsing stored report:', error)
          toast({
            title: "Error",
            description: "Failed to load audit report. Please try again.",
            variant: "destructive",
          })
        }
      }
    } else if (error === 'analysis-failed') {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the website. Please try again.",
        variant: "destructive",
      })
    }
  }, [searchParams, setReport, setIsLoading, toast])

  return null // This component renders nothing visually
}