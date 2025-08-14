"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Zap } from "lucide-react"

const stats = [
  { icon: Users, label: "Happy Customers", value: "00,000+" },
  { icon: Target, label: "Websites Analyzed", value: "00,000+" },
  { icon: Award, label: "Average Improvement", value: "00%" },
  { icon: Zap, label: "Reports generated", value: "00,000+" },
]

const team = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    bio: "Former Google engineer with 10+ years in SEO and web performance optimization.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    bio: "Full-stack developer and AI specialist focused on automated web analysis.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Michael Rodriguez",
    role: "Head of SEO",
    bio: "SEO expert with experience optimizing websites for Fortune 500 companies.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundAnimation />
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                About Us
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold">
                We're on a Mission to
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {" "}
                  Optimize the Web
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">
                SEO Expert was founded with a simple belief: every website deserves to perform at its best. We combine proven
                 SEO strategies with effective optimization methods to help businesses succeed online.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={stat.label} className="text-center p-4 border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
                <p className="text-xl text-muted-foreground">How we started and where we're going</p>
              </div>

              <div className="prose prose-lg dark:prose-invert mx-auto">
               <p className="text-center">Story coming soon</p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground">The experts behind SEO Expert</p>
            </div>

              <div className="prose prose-lg dark:prose-invert mx-auto">
               <p className="text-center">Team details coming soon</p>
              </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <Card key={member.name} className="text-center p-6 border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardContent className="space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full mx-auto flex items-center justify-center">
                      <div className="w-20 h-20 bg-muted rounded-full" />
                    </div>
                    {/*<div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                      <p className="text-muted-foreground mt-2">{member.bio}</p>
                    </div>*/}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
              <p className="text-xl text-muted-foreground">What drives us every day</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-semibold">Accessibility</h3>
                  <p className="text-muted-foreground">
                    We believe professional SEO tools should be accessible to everyone, not just large corporations with
                    big budgets.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-semibold">Quality</h3>
                  <p className="text-muted-foreground">
                    We never compromise on the quality of our analysis. Every report meets the same standards as premium
                    agency audits.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-semibold">Innovation</h3>
                  <p className="text-muted-foreground">
                   We continuously improve our algorithms and 
                   analysis methods to stay ahead of the latest SEO trends and best practices.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
