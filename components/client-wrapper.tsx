'use client'

import { Suspense } from 'react'
import { ReportLoader } from './report-loader'

function ReportLoaderWithSuspense() {
  return (
    <Suspense fallback={null}>
      <ReportLoader />
    </Suspense>
  )
}

export { ReportLoaderWithSuspense as ReportLoader }