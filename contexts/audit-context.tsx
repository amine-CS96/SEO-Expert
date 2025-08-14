'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { SEOAuditReport } from '@/types/seo'

interface AuditContextType {
  report: SEOAuditReport | null
  isLoading: boolean
  auditUrl: string
  auditEmail: string
  error: {
    type: string
    message: string
    suggestions: string[]
  } | null
  setReport: (report: SEOAuditReport | null) => void
  setIsLoading: (loading: boolean) => void
  setAuditUrl: (url: string) => void
  setAuditEmail: (email: string) => void
  setError: (error: { type: string; message: string; suggestions: string[] } | null) => void
  clearError: () => void
}

const AuditContext = createContext<AuditContextType | undefined>(undefined)

export function AuditProvider({ children }: { children: ReactNode }) {
  const [report, setReport] = useState<SEOAuditReport | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [auditUrl, setAuditUrl] = useState('')
  const [auditEmail, setAuditEmail] = useState('')
  const [error, setError] = useState<{
    type: string
    message: string
    suggestions: string[]
  } | null>(null)

  const clearError = () => {
    setError(null)
  }

  return (
    <AuditContext.Provider
      value={{
        report,
        isLoading,
        auditUrl,
        auditEmail,
        error,
        setReport,
        setIsLoading,
        setAuditUrl,
        setAuditEmail,
        setError,
        clearError,
      }}
    >
      {children}
    </AuditContext.Provider>
  )
}

export function useAudit() {
  const context = useContext(AuditContext)
  if (context === undefined) {
    throw new Error('useAudit must be used within an AuditProvider')
  }
  return context
}