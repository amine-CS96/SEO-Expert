<<<<<<< HEAD
"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  FileText, 
  Globe, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Plus,
  ArrowRight,
  AlertTriangle,
  Target,
  Users,
  Search,
  ExternalLink,
  Download,
  Calendar,
  Activity,
  Zap,
  Shield,
  Award,
  Eye
} from "lucide-react"

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  // Check if user is new (created recently)
  const isNewUser = user && new Date(user.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000) // Less than 24 hours old

  const stats = [
    {
      title: "Total Audits",
      value: isNewUser ? "0" : "247",
      change: isNewUser ? "Get started!" : "+23 this month",
      icon: BarChart3,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      trend: isNewUser ? "neutral" : "up"
    },
    {
      title: "Active Websites",
      value: isNewUser ? "0" : "18",
      change: isNewUser ? "Add your first site" : "+3 this month",
      icon: Globe,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      trend: isNewUser ? "neutral" : "up"
    },
    {
      title: "Issues Resolved",
      value: isNewUser ? "0" : "1,342",
      change: isNewUser ? "Start optimizing" : "+89 this week",
      icon: CheckCircle,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      trend: isNewUser ? "neutral" : "up"
    },
    {
      title: "Avg. SEO Score",
      value: isNewUser ? "—" : "87.3%",
      change: isNewUser ? "Run your first audit" : "+12.5% vs last month",
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      trend: isNewUser ? "neutral" : "up"
    }
  ]

  const recentAudits = isNewUser ? [] : [
    {
      id: 1,
      website: "techstartup.io",
      url: "https://techstartup.io",
      score: 94,
      previousScore: 87,
      date: "2 hours ago",
      status: "completed",
      issues: 3,
      improvements: 12,
      category: "Technology"
    },
    {
      id: 2,
      website: "ecommerce-store.com",
      url: "https://ecommerce-store.com",
      score: 82,
      previousScore: 76,
      date: "5 hours ago",
      status: "completed",
      issues: 8,
      improvements: 15,
      category: "E-commerce"
    },
    {
      id: 3,
      website: "consulting-firm.net",
      url: "https://consulting-firm.net",
      score: 91,
      previousScore: 89,
      date: "1 day ago",
      status: "completed",
      issues: 4,
      improvements: 7,
      category: "Business"
    }
  ]

  const topIssues = isNewUser ? [] : [
    {
      issue: "Missing Meta Descriptions",
      count: 23,
      severity: "high",
      trend: "increasing"
    },
    {
      issue: "Slow Page Load Speed",
      count: 18,
      severity: "critical",
      trend: "stable"
    },
    {
      issue: "Missing Alt Text",
      count: 15,
      severity: "medium",
      trend: "decreasing"
    },
    {
      issue: "Broken Internal Links",
      count: 12,
      severity: "high",
      trend: "decreasing"
    }
  ]

  const performanceMetrics = isNewUser ? [] : [
    {
      metric: "Average Load Time",
      value: "2.3s",
      target: "< 3s",
      status: "good",
      improvement: "-0.8s"
    },
    {
      metric: "Mobile Usability",
      value: "96%",
      target: "> 90%",
      status: "excellent",
      improvement: "+4%"
    },
    {
      metric: "Core Web Vitals",
      value: "89%",
      target: "> 75%",
      status: "good",
      improvement: "+12%"
    }
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundAnimation />
      <Header />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-muted-foreground">
                  Here's your SEO performance overview and latest insights
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  onClick={() => router.push('/')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Audit
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <Card key={stat.title} className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </Card>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            
            {/* Recent Audits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-primary" />
                    Recent Audits
                  </h2>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {recentAudits.length > 0 ? (
                    recentAudits.map((audit) => (
                      <div key={audit.id} className="group p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <Globe className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-foreground">{audit.website}</p>
                                <Badge variant="outline" className="text-xs">{audit.category}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-1">{audit.url}</p>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{audit.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <AlertTriangle className="w-3 h-3" />
                                  <span>{audit.issues} issues</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>{audit.improvements} improvements</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className={`text-2xl font-bold ${
                                audit.score >= 90 ? 'text-green-500' :
                                audit.score >= 70 ? 'text-yellow-500' : 'text-red-500'
                              }`}>
                                {audit.score}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {audit.score > audit.previousScore ? (
                                  <span className="text-green-500">+{audit.score - audit.previousScore}</span>
                                ) : (
                                  <span className="text-red-500">{audit.score - audit.previousScore}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                {audit.status}
                              </Badge>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">No audits yet</h3>
                      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                        Start by running your first SEO audit to see detailed insights about your website's performance.
                      </p>
                      <Button
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                        onClick={() => router.push('/')}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Run Your First Audit
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions & Performance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-auto p-4 hover:bg-muted/50 group"
                    onClick={() => router.push('/')}
                  >
                    <Plus className="w-5 h-5 mr-3 text-primary group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="font-medium">New SEO Audit</div>
                      <div className="text-xs text-muted-foreground">Analyze website performance</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-auto p-4 hover:bg-muted/50 group"
                  >
                    <FileText className="w-5 h-5 mr-3 text-primary group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="font-medium">Export Reports</div>
                      <div className="text-xs text-muted-foreground">Download PDF reports</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-auto p-4 hover:bg-muted/50 group"
                  >
                    <Target className="w-5 h-5 mr-3 text-primary group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="font-medium">Set Goals</div>
                      <div className="text-xs text-muted-foreground">Track improvements</div>
                    </div>
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-primary" />
                  Performance Metrics
                </h3>
                <div className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{metric.metric}</span>
                        <Badge variant={metric.status === 'excellent' ? 'default' : 'secondary'} className="text-xs">
                          {metric.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Current: {metric.value}</span>
                        <span className="text-green-500">{metric.improvement}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            metric.status === 'excellent' ? 'bg-green-500' :
                            metric.status === 'good' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${parseInt(metric.value)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Top Issues & Insights */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                  Top Issues to Address
                </h2>
                <div className="space-y-4">
                  {topIssues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          issue.severity === 'critical' ? 'bg-red-500' :
                          issue.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                        }`} />
                        <div>
                          <p className="font-medium text-foreground text-sm">{issue.issue}</p>
                          <p className="text-xs text-muted-foreground">{issue.count} occurrences</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`text-xs ${
                        issue.trend === 'increasing' ? 'text-red-500' :
                        issue.trend === 'decreasing' ? 'text-green-500' : 'text-muted-foreground'
                      }`}>
                        {issue.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-primary" />
                  SEO Insights
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-card/50 rounded-lg border border-border/30">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm mb-1">Great Progress!</h4>
                        <p className="text-xs text-muted-foreground">Your average SEO score improved by 12.5% this month. Keep optimizing meta descriptions and page speed.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-card/50 rounded-lg border border-border/30">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm mb-1">Security Update</h4>
                        <p className="text-xs text-muted-foreground">All your websites are using HTTPS. This positively impacts your SEO rankings.</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-primary/20 hover:bg-primary/30 text-primary border-primary/30" variant="outline">
                    <Search className="w-4 h-4 mr-2" />
                    Get Detailed Analysis
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
=======
"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  FileText, 
  Globe, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Plus,
  ArrowRight,
  AlertTriangle,
  Target,
  Users,
  Search,
  ExternalLink,
  Download,
  Calendar,
  Activity,
  Zap,
  Shield,
  Award,
  Eye
} from "lucide-react"

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  // Check if user is new (created recently)
  const isNewUser = user && new Date(user.createdAt) > new Date(Date.now() - 24 * 60 * 60 * 1000) // Less than 24 hours old

  const stats = [
    {
      title: "Total Audits",
      value: isNewUser ? "0" : "247",
      change: isNewUser ? "Get started!" : "+23 this month",
      icon: BarChart3,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      trend: isNewUser ? "neutral" : "up"
    },
    {
      title: "Active Websites",
      value: isNewUser ? "0" : "18",
      change: isNewUser ? "Add your first site" : "+3 this month",
      icon: Globe,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      trend: isNewUser ? "neutral" : "up"
    },
    {
      title: "Issues Resolved",
      value: isNewUser ? "0" : "1,342",
      change: isNewUser ? "Start optimizing" : "+89 this week",
      icon: CheckCircle,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      trend: isNewUser ? "neutral" : "up"
    },
    {
      title: "Avg. SEO Score",
      value: isNewUser ? "—" : "87.3%",
      change: isNewUser ? "Run your first audit" : "+12.5% vs last month",
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      trend: isNewUser ? "neutral" : "up"
    }
  ]

  const recentAudits = isNewUser ? [] : [
    {
      id: 1,
      website: "techstartup.io",
      url: "https://techstartup.io",
      score: 94,
      previousScore: 87,
      date: "2 hours ago",
      status: "completed",
      issues: 3,
      improvements: 12,
      category: "Technology"
    },
    {
      id: 2,
      website: "ecommerce-store.com",
      url: "https://ecommerce-store.com",
      score: 82,
      previousScore: 76,
      date: "5 hours ago",
      status: "completed",
      issues: 8,
      improvements: 15,
      category: "E-commerce"
    },
    {
      id: 3,
      website: "consulting-firm.net",
      url: "https://consulting-firm.net",
      score: 91,
      previousScore: 89,
      date: "1 day ago",
      status: "completed",
      issues: 4,
      improvements: 7,
      category: "Business"
    }
  ]

  const topIssues = isNewUser ? [] : [
    {
      issue: "Missing Meta Descriptions",
      count: 23,
      severity: "high",
      trend: "increasing"
    },
    {
      issue: "Slow Page Load Speed",
      count: 18,
      severity: "critical",
      trend: "stable"
    },
    {
      issue: "Missing Alt Text",
      count: 15,
      severity: "medium",
      trend: "decreasing"
    },
    {
      issue: "Broken Internal Links",
      count: 12,
      severity: "high",
      trend: "decreasing"
    }
  ]

  const performanceMetrics = isNewUser ? [] : [
    {
      metric: "Average Load Time",
      value: "2.3s",
      target: "< 3s",
      status: "good",
      improvement: "-0.8s"
    },
    {
      metric: "Mobile Usability",
      value: "96%",
      target: "> 90%",
      status: "excellent",
      improvement: "+4%"
    },
    {
      metric: "Core Web Vitals",
      value: "89%",
      target: "> 75%",
      status: "good",
      improvement: "+12%"
    }
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundAnimation />
      <Header />
      
      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-muted-foreground">
                  Here's your SEO performance overview and latest insights
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                  onClick={() => router.push('/')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Audit
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <Card key={stat.title} className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </Card>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            
            {/* Recent Audits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-primary" />
                    Recent Audits
                  </h2>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    View All
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {recentAudits.length > 0 ? (
                    recentAudits.map((audit) => (
                      <div key={audit.id} className="group p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-border/50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <Globe className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-foreground">{audit.website}</p>
                                <Badge variant="outline" className="text-xs">{audit.category}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-1">{audit.url}</p>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{audit.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <AlertTriangle className="w-3 h-3" />
                                  <span>{audit.issues} issues</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>{audit.improvements} improvements</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-1">
                              <div className={`text-2xl font-bold ${
                                audit.score >= 90 ? 'text-green-500' :
                                audit.score >= 70 ? 'text-yellow-500' : 'text-red-500'
                              }`}>
                                {audit.score}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {audit.score > audit.previousScore ? (
                                  <span className="text-green-500">+{audit.score - audit.previousScore}</span>
                                ) : (
                                  <span className="text-red-500">{audit.score - audit.previousScore}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                {audit.status}
                              </Badge>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ExternalLink className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">No audits yet</h3>
                      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                        Start by running your first SEO audit to see detailed insights about your website's performance.
                      </p>
                      <Button
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                        onClick={() => router.push('/')}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Run Your First Audit
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions & Performance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-primary" />
                  Quick Actions
                </h2>
                <div className="space-y-3">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-auto p-4 hover:bg-muted/50 group"
                    onClick={() => router.push('/')}
                  >
                    <Plus className="w-5 h-5 mr-3 text-primary group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="font-medium">New SEO Audit</div>
                      <div className="text-xs text-muted-foreground">Analyze website performance</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-auto p-4 hover:bg-muted/50 group"
                  >
                    <FileText className="w-5 h-5 mr-3 text-primary group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="font-medium">Export Reports</div>
                      <div className="text-xs text-muted-foreground">Download PDF reports</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start h-auto p-4 hover:bg-muted/50 group"
                  >
                    <Target className="w-5 h-5 mr-3 text-primary group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="font-medium">Set Goals</div>
                      <div className="text-xs text-muted-foreground">Track improvements</div>
                    </div>
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-primary" />
                  Performance Metrics
                </h3>
                <div className="space-y-4">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{metric.metric}</span>
                        <Badge variant={metric.status === 'excellent' ? 'default' : 'secondary'} className="text-xs">
                          {metric.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Current: {metric.value}</span>
                        <span className="text-green-500">{metric.improvement}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            metric.status === 'excellent' ? 'bg-green-500' :
                            metric.status === 'good' ? 'bg-blue-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${parseInt(metric.value)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Top Issues & Insights */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
                <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                  Top Issues to Address
                </h2>
                <div className="space-y-4">
                  {topIssues.map((issue, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          issue.severity === 'critical' ? 'bg-red-500' :
                          issue.severity === 'high' ? 'bg-orange-500' : 'bg-yellow-500'
                        }`} />
                        <div>
                          <p className="font-medium text-foreground text-sm">{issue.issue}</p>
                          <p className="text-xs text-muted-foreground">{issue.count} occurrences</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`text-xs ${
                        issue.trend === 'increasing' ? 'text-red-500' :
                        issue.trend === 'decreasing' ? 'text-green-500' : 'text-muted-foreground'
                      }`}>
                        {issue.trend}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-primary" />
                  SEO Insights
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-card/50 rounded-lg border border-border/30">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm mb-1">Great Progress!</h4>
                        <p className="text-xs text-muted-foreground">Your average SEO score improved by 12.5% this month. Keep optimizing meta descriptions and page speed.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-card/50 rounded-lg border border-border/30">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="w-4 h-4 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground text-sm mb-1">Security Update</h4>
                        <p className="text-xs text-muted-foreground">All your websites are using HTTPS. This positively impacts your SEO rankings.</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-primary/20 hover:bg-primary/30 text-primary border-primary/30" variant="outline">
                    <Search className="w-4 h-4 mr-2" />
                    Get Detailed Analysis
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
>>>>>>> 1b166dd (Add authentication files (Login, Register, Profile, API, UI, utils, types))
}