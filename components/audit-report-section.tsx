'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudit } from '@/contexts/audit-context';
import { SEOReport } from '@/components/seo-report';
import { InlineAuditLoader } from '@/components/inline-audit-loader';
import { ErrorDisplay } from '@/components/error-display';

export function AuditReportSection() {
  const {
    report,
    isLoading,
    setReport,
    setIsLoading,
    auditUrl,
    error,
    setError,
    clearError
  } = useAudit();

  if (!isLoading && !report && !error) {
    return null; // Don't display anything if no report, not loading, and no error
  }

  const handleLoadingComplete = (reportData: any) => {
    setReport(reportData);
    setIsLoading(false);
    clearError(); // Clear any previous errors
  };

  const handleLoadingError = (errorMessage: string, errorType?: string) => {
    setIsLoading(false);
    setError({
      message: errorMessage,
      type: errorType || 'GENERAL_ERROR',
      suggestions: []
    });
  };

  const handleRetry = () => {
    clearError();
    setReport(null);
    setIsLoading(true);
    
    // Scroll to the report section
    setTimeout(() => {
      const reportElement = document.getElementById('audit-report-section');
      if (reportElement) {
        reportElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleGoBack = () => {
    clearError();
    setReport(null);
    setIsLoading(false);
    
    // Scroll back to the form
    setTimeout(() => {
      const formElement = document.querySelector('.audit-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <section id="audit-report-section" className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-16">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <InlineAuditLoader
                url={auditUrl}
                onComplete={handleLoadingComplete}
                onError={handleLoadingError}
              />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ErrorDisplay
                errorType={error.type}
                errorMessage={error.message}
                url={auditUrl}
                onRetry={handleRetry}
                onGoBack={handleGoBack}
              />
            </motion.div>
          ) : report ? (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SEOReport data={report} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}