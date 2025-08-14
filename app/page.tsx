'use client'

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { AuditProvider } from "@/contexts/audit-context"
import { AuditReportSection } from "@/components/audit-report-section"
import { ReportLoader } from "@/components/client-wrapper"

export default function Home() {
  return (
    <AuditProvider>
      <ReportLoader />
      <div className="min-h-screen bg-background relative overflow-hidden">
        <BackgroundAnimation />
        <Header />
        <main>
          <Hero />
          <AuditReportSection />
          <Features />
          <HowItWorks />
          {/*<Testimonials />*/}
          <FAQ />
        </main>
        <Footer />
      </div>
    </AuditProvider>
  )
}
