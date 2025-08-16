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
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowLeft, User, Shield, Zap, BarChart3, XCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { RegisterCredentials } from "@/types/auth"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { BackgroundAnimation } from "@/components/background-animation"
import { 
  validatePasswordStrength, 
  getPasswordStrengthLabel, 
  getPasswordStrengthColor,
  getPasswordStrengthBgColor 
} from "@/lib/password-utils"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(validatePasswordStrength(""))
  const { register: registerUser, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const watchPassword = watch("password", "")

  useEffect(() => {
    setPasswordStrength(validatePasswordStrength(watchPassword))
  }, [watchPassword])

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const onSubmit = async (data: RegisterFormData) => {
    if (!passwordStrength.isValid) {
      setError("password", {
        message: "Password does not meet security requirements"
      })
      return
    }

    try {
      const success = await registerUser(data as RegisterCredentials)
      if (success) {
        router.push('/')
      }
    } catch (error) {
      setError("root", {
        message: "An error occurred during registration"
      })
    }
  }

  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get detailed insights into your website's SEO performance"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate comprehensive reports in under 60 seconds"
    }
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

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 py-8">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight">
                <span className="text-foreground">Join</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  SEO Expert
                </span>
                <br />
                <span className="text-foreground">Today</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Create your account and start optimizing your websites with professional SEO tools and insights.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary/30 to-primary/20 rounded-full flex items-center justify-center">
                  <Logo size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Free to get started</h3>
                  <p className="text-sm text-muted-foreground">No credit card required • Cancel anytime</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Register Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-2xl">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Create Account
                </h2>
                <p className="text-muted-foreground">
                  Start your SEO optimization journey
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-2 text-sm font-medium">
                    <User className="w-4 h-4" />
                    <span>Full Name</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    {...register("name")}
                    className={`h-12 px-4 text-base rounded-xl border-2 transition-all ${
                      errors.name 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-border focus:border-primary"
                    }`}
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

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
                    <p className="text-sm text-red-500">{errors.email.message}</p>
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
                      placeholder="Create a strong password"
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
                  
                  {/* Password Strength Indicator */}
                  {watchPassword && (
                    <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Password strength:</span>
                        <span className={`text-xs font-medium ${getPasswordStrengthColor(passwordStrength.score)}`}>
                          {getPasswordStrengthLabel(passwordStrength.score)}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthBgColor(passwordStrength.score)}`}
                          style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                        />
                      </div>
                      {passwordStrength.feedback.length > 0 && (
                        <div className="space-y-1">
                          {passwordStrength.feedback.map((feedback, index) => (
                            <div key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <XCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                              <span>{feedback}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center space-x-2 text-sm font-medium">
                    <Lock className="w-4 h-4" />
                    <span>Confirm Password</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...register("confirmPassword")}
                      className={`h-12 px-4 pr-12 text-base rounded-xl border-2 transition-all ${
                        errors.confirmPassword 
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
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
                  disabled={isLoading || !passwordStrength.isValid}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <div className="text-center space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-primary hover:underline font-medium"
                    >
                      Sign In
                    </Link>
                  </div>
                  
                  <div className="text-xs text-muted-foreground text-center leading-relaxed">
                    By creating an account, you agree to our{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
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
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowLeft, User, Shield, Zap, BarChart3, XCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { RegisterCredentials } from "@/types/auth"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { BackgroundAnimation } from "@/components/background-animation"
import { 
  validatePasswordStrength, 
  getPasswordStrengthLabel, 
  getPasswordStrengthColor,
  getPasswordStrengthBgColor 
} from "@/lib/password-utils"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(validatePasswordStrength(""))
  const { register: registerUser, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const watchPassword = watch("password", "")

  useEffect(() => {
    setPasswordStrength(validatePasswordStrength(watchPassword))
  }, [watchPassword])

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const onSubmit = async (data: RegisterFormData) => {
    if (!passwordStrength.isValid) {
      setError("password", {
        message: "Password does not meet security requirements"
      })
      return
    }

    try {
      const success = await registerUser(data as RegisterCredentials)
      if (success) {
        router.push('/')
      }
    } catch (error) {
      setError("root", {
        message: "An error occurred during registration"
      })
    }
  }

  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Get detailed insights into your website's SEO performance"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Generate comprehensive reports in under 60 seconds"
    }
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

      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 py-8">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight">
                <span className="text-foreground">Join</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  SEO Expert
                </span>
                <br />
                <span className="text-foreground">Today</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Create your account and start optimizing your websites with professional SEO tools and insights.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-4 p-4 bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary/30 to-primary/20 rounded-full flex items-center justify-center">
                  <Logo size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Free to get started</h3>
                  <p className="text-sm text-muted-foreground">No credit card required • Cancel anytime</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Register Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md mx-auto lg:mx-0"
          >
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-2xl">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Create Account
                </h2>
                <p className="text-muted-foreground">
                  Start your SEO optimization journey
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center space-x-2 text-sm font-medium">
                    <User className="w-4 h-4" />
                    <span>Full Name</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    {...register("name")}
                    className={`h-12 px-4 text-base rounded-xl border-2 transition-all ${
                      errors.name 
                        ? "border-red-500 focus:border-red-500" 
                        : "border-border focus:border-primary"
                    }`}
                    disabled={isLoading}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

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
                    <p className="text-sm text-red-500">{errors.email.message}</p>
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
                      placeholder="Create a strong password"
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
                  
                  {/* Password Strength Indicator */}
                  {watchPassword && (
                    <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Password strength:</span>
                        <span className={`text-xs font-medium ${getPasswordStrengthColor(passwordStrength.score)}`}>
                          {getPasswordStrengthLabel(passwordStrength.score)}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthBgColor(passwordStrength.score)}`}
                          style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                        />
                      </div>
                      {passwordStrength.feedback.length > 0 && (
                        <div className="space-y-1">
                          {passwordStrength.feedback.map((feedback, index) => (
                            <div key={index} className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <XCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                              <span>{feedback}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center space-x-2 text-sm font-medium">
                    <Lock className="w-4 h-4" />
                    <span>Confirm Password</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      {...register("confirmPassword")}
                      className={`h-12 px-4 pr-12 text-base rounded-xl border-2 transition-all ${
                        errors.confirmPassword 
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
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
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
                  disabled={isLoading || !passwordStrength.isValid}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <div className="text-center space-y-4">
                  <div className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-primary hover:underline font-medium"
                    >
                      Sign In
                    </Link>
                  </div>
                  
                  <div className="text-xs text-muted-foreground text-center leading-relaxed">
                    By creating an account, you agree to our{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
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