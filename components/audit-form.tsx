"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send, CheckCircle, Globe, Mail } from "lucide-react"
import { useAudit } from "@/contexts/audit-context"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL").refine((url) => url.startsWith("http://") || url.startsWith("https://"), {
    message: "URL must start with http:// or https://",
  }),
  email: z.string().email("Please enter a valid email address"),
})

type FormData = z.infer<typeof formSchema>
type FormState = "idle" | "loading" | "success" | "error"

export function AuditForm() {
  const [formState, setFormState] = useState<FormState>("idle")
  const { report, isLoading, setReport, setIsLoading, setAuditUrl, setAuditEmail, clearError } = useAudit()
  const { toast } = useToast()
  const reportRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(formSchema) })

  const onSubmit = async (data: FormData) => {
    setFormState("loading")
    setIsLoading(true)
    setAuditUrl(data.url)
    setAuditEmail(data.email)
    
    // Clear any previous report and errors
    setReport(null)
    clearError()
    
    // Scroll to the report section after a short delay
    setTimeout(() => {
      const reportElement = document.getElementById('audit-report-section')
      if (reportElement) {
        reportElement.scrollIntoView({ behavior: 'smooth' })
      }
    }, 500)
  }

  useEffect(() => {
    if (formState === "success" && reportRef.current) {
      reportRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [formState])

  // Reset form state when report is ready or loading stops
  useEffect(() => {
    if (!isLoading && report) {
      setFormState("success")
    } else if (!isLoading && !report && formState === "loading") {
      setFormState("idle")
    }
  }, [isLoading, report, formState])

  return (
    <div className="space-y-5 w-full audit-form">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold">Get Your Free SEO Audit</h2>
        <p className="text-muted-foreground text-sm">
          Enter your Website URL and email to generate a comprehensive report
        </p>
      </div>

      <AnimatePresence mode="wait">
        {formState === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-6"
          >
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-green-600 dark:text-green-400">
                  Audit Complete!
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Scroll below to view your detailed audit report.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3"
          >
            <div className="space-y-2">
              <Label htmlFor="url" className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Website URL</span>
              </Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                {...register("url")}
                className={`h-12 px-3 py-3 text-sm rounded-lg ${errors.url ? "border-red-500" : ""}`}
                disabled={formState === "loading"}
              />
              {errors.url && <p className="text-sm text-red-500">{errors.url.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email Address</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                className={`h-12 px-3 py-3 text-sm rounded-lg ${errors.email ? "border-red-500" : ""}`}
                disabled={formState === "loading"}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-sm font-semibold rounded-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              disabled={formState === "loading"}
            >
              {formState === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Get Free Audit Report
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By submitting this form, you agree to our{" "}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>
            </p>
          </motion.form>
        )}
      </AnimatePresence>

      <div ref={reportRef} />
    </div>
  )
}
