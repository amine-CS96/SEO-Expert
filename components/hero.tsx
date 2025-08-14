"use client"

import { motion } from "framer-motion"
import { AuditForm } from "@/components/audit-form"
import { Badge } from "@/components/ui/badge"
import { Logo } from "@/components/logo"
import { CheckCircle } from "lucide-react"

const stats = [
  { label: "Websites Analyzed", value: "00,000+" },
  { label: "SEO Issues Found", value: "00,000+" },
  { label: "Reports generated", value: "00,000+" },
]

const benefits = [
  "Comprehensive SEO Analysis",
  "Performance & Security Metrics",
  "Accessibility & Mobile Evaluation",
  "Actionable Recommendations",
]

export function Hero() {
  return (
    <section className="relative pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 hover:border-primary/30 hover:scale-105 transition-all duration-300 cursor-pointer group">
                <Logo size={24} className="mr-1 group-hover:animate-pulse" />
                Free SEO Audit Tool
              </Badge>

              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Optimize Your
                </span>
                <br />
                <span className="text-foreground">Web Pages</span>
                <br />
                <span className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
                 Like an Expert
                </span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg">
                Get a comprehensive SEO and visual audit covering all essential aspects of your website. 
                Your report is generated in under 1 minutes. Completely free.
              </p>
            </div>

            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 pb-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div> 
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mt-16"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 blur-3xl rounded-full" />
            <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-5 shadow-2xl min-w-[360px]">
              <AuditForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
