<<<<<<< HEAD
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { LoginCredentials } from "@/types/auth"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { BackgroundAnimation } from "@/components/background-animation"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const onSubmit = async (data: LoginFormData) => {
    try {
      const success = await login(data as LoginCredentials)
      if (success) {
        router.push('/')
      }
    } catch (error) {
      setError("root", {
        message: "An error occurred during sign in"
      })
    }
  }

  const benefits = [
    "Access your SEO audit history",
    "Save and track website improvements",
    "Get personalized recommendations",
    "Export detailed reports"
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundAnimation />
      
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center space-x-3 group">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="relative">
              <Logo size={32} />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              SEO Expert
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Welcome Back
                </span>
                <br />
                <span className="text-foreground">To SEO Expert</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Sign in to access your dashboard and continue optimizing your websites with professional SEO insights.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                  <Logo size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Trusted by 10,000+ users</h3>
                  <p className="text-sm text-muted-foreground">Join professionals optimizing their websites</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Sign In Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-2xl">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Sign In
                </h2>
                <p className="text-muted-foreground">
                  Enter your credentials to access your account
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-2 text-sm font-medium">
                    <Mail className="w-4 h-4" />
                    <span>Email Address</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                    className={`h-12 px-4 text-base rounded-xl border-2 transition-all ${
                      errors.email 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-border focus:border-primary"
                    }`}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center space-x-1">
                      <span>{errors.email.message}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center space-x-2 text-sm font-medium">
                    <Lock className="w-4 h-4" />
                    <span>Password</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                      className={`h-12 px-4 pr-12 text-base rounded-xl border-2 transition-all ${
                        errors.password 
                          ? "border-red-500 focus:border-red-500" 
                          : "border-border focus:border-primary"
                      }`}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                {errors.root && (
                  <div className="p-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                    {errors.root.message}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="text-center space-y-4">
                  <Button
                    variant="link"
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => {
                      // TODO: Implement forgot password
                      console.log("Forgot password clicked")
                    }}
                  >
                    Forgot your password?
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="text-primary hover:underline font-medium"
                    >
                      Create account
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
=======
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { LoginCredentials } from "@/types/auth"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { BackgroundAnimation } from "@/components/background-animation"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const onSubmit = async (data: LoginFormData) => {
    try {
      const success = await login(data as LoginCredentials)
      if (success) {
        router.push('/')
      }
    } catch (error) {
      setError("root", {
        message: "An error occurred during sign in"
      })
    }
  }

  const benefits = [
    "Access your SEO audit history",
    "Save and track website improvements",
    "Get personalized recommendations",
    "Export detailed reports"
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundAnimation />
      
      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link href="/" className="flex items-center space-x-3 group">
            <Button variant="ghost" size="sm" className="mr-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="relative">
              <Logo size={32} />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              SEO Expert
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  Welcome Back
                </span>
                <br />
                <span className="text-foreground">To SEO Expert</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Sign in to access your dashboard and continue optimizing your websites with professional SEO insights.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                  <Logo size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Trusted by 10,000+ users</h3>
                  <p className="text-sm text-muted-foreground">Join professionals optimizing their websites</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Sign In Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-2xl">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Sign In
                </h2>
                <p className="text-muted-foreground">
                  Enter your credentials to access your account
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center space-x-2 text-sm font-medium">
                    <Mail className="w-4 h-4" />
                    <span>Email Address</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    {...register("email")}
                    className={`h-12 px-4 text-base rounded-xl border-2 transition-all ${
                      errors.email 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-border focus:border-primary"
                    }`}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 flex items-center space-x-1">
                      <span>{errors.email.message}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center space-x-2 text-sm font-medium">
                    <Lock className="w-4 h-4" />
                    <span>Password</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                      className={`h-12 px-4 pr-12 text-base rounded-xl border-2 transition-all ${
                        errors.password 
                          ? "border-red-500 focus:border-red-500" 
                          : "border-border focus:border-primary"
                      }`}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                {errors.root && (
                  <div className="p-4 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                    {errors.root.message}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <div className="text-center space-y-4">
                  <Button
                    variant="link"
                    className="text-sm text-muted-foreground hover:text-primary"
                    onClick={() => {
                      // TODO: Implement forgot password
                      console.log("Forgot password clicked")
                    }}
                  >
                    Forgot your password?
                  </Button>
                  
                  <div className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <Link
                      href="/register"
                      className="text-primary hover:underline font-medium"
                    >
                      Create account
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
>>>>>>> 1b166dd (Add authentication files (Login, Register, Profile, API, UI, utils, types))
}