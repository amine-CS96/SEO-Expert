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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Key,
  Bell,
  Globe,
  Camera,
  Edit3,
  Save,
  X,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Settings,
  CreditCard,
  Activity,
  BarChart3,
  Eye,
  EyeOff,
  Upload,
  Trash2
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { BackgroundAnimation } from "@/components/background-animation"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  location: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ProfileFormData = z.infer<typeof profileSchema>
type PasswordFormData = z.infer<typeof passwordSchema>

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>("")
  const { user, isLoading, isAuthenticated, updateUser } = useAuth()
  const router = useRouter()

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      company: "",
      website: "",
      location: "",
      bio: "",
    }
  })

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name || "",
        email: user.email || "",
        phone: "",
        company: "",
        website: "",
        location: "",
        bio: "",
      })
    }
  }, [user, profileForm])

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarRemove = () => {
    setAvatarFile(null)
    setAvatarPreview("")
  }

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      // Here you would typically make an API call to update the profile
      updateUser({ name: data.name, email: data.email })
      setIsEditing(false)
      // Show success message
    } catch (error) {
      console.error("Profile update failed:", error)
    }
  }

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      // Here you would make an API call to change password
      console.log("Password change:", data)
      passwordForm.reset()
      // Show success message
    } catch (error) {
      console.error("Password change failed:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const userInitials = user.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'U'

  const accountAge = Math.floor((Date.now() - new Date(user.createdAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundAnimation />
      
      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="mr-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Logo size={32} />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              SEO Expert
            </span>
          </Link>
        </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative group">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage src={avatarPreview || user.avatar || ""} alt={user.name} />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Upload overlay */}
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex space-x-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        id="avatar-upload"
                        aria-label="Upload profile picture"
                      />
                      <label htmlFor="avatar-upload">
                        <Button
                          size="sm"
                          className="rounded-full w-8 h-8 p-0"
                          asChild
                        >
                          <span className="cursor-pointer">
                            <Upload className="w-4 h-4" />
                          </span>
                        </Button>
                      </label>
                      {(avatarPreview || user.avatar) && (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="rounded-full w-8 h-8 p-0"
                          onClick={handleAvatarRemove}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Camera icon for mobile */}
                  <div className="absolute -bottom-2 -right-2 md:hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      id="avatar-upload-mobile"
                      aria-label="Upload profile picture (mobile)"
                    />
                    <label htmlFor="avatar-upload-mobile">
                      <Button
                        size="sm"
                        className="rounded-full w-8 h-8 p-0"
                        asChild
                      >
                        <span className="cursor-pointer">
                          <Camera className="w-4 h-4" />
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <p className="text-muted-foreground flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {user.email}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Member for {accountAge} days
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant={isEditing ? "outline" : "default"}
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2"
                  >
                    {isEditing ? (
                      <>
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Preferences</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          {...profileForm.register("name")}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                        {profileForm.formState.errors.name && (
                          <p className="text-sm text-red-500">{profileForm.formState.errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          {...profileForm.register("email")}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                        {profileForm.formState.errors.email && (
                          <p className="text-sm text-red-500">{profileForm.formState.errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          {...profileForm.register("phone")}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          {...profileForm.register("company")}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                          placeholder="Your company name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          {...profileForm.register("website")}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                          placeholder="https://yourwebsite.com"
                        />
                        {profileForm.formState.errors.website && (
                          <p className="text-sm text-red-500">{profileForm.formState.errors.website.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          {...profileForm.register("location")}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        {...profileForm.register("bio")}
                        disabled={!isEditing}
                        className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${!isEditing ? "bg-muted" : ""}`}
                        placeholder="Tell us about yourself..."
                        rows={4}
                      />
                      {profileForm.formState.errors.bio && (
                        <p className="text-sm text-red-500">{profileForm.formState.errors.bio.message}</p>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="flex items-center space-x-2">
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="w-5 h-5" />
                    <span>Change Password</span>
                  </CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        {...passwordForm.register("currentPassword")}
                      />
                      {passwordForm.formState.errors.currentPassword && (
                        <p className="text-sm text-red-500">{passwordForm.formState.errors.currentPassword.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        {...passwordForm.register("newPassword")}
                      />
                      {passwordForm.formState.errors.newPassword && (
                        <p className="text-sm text-red-500">{passwordForm.formState.errors.newPassword.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...passwordForm.register("confirmPassword")}
                      />
                      {passwordForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-500">{passwordForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <div className="text-sm text-muted-foreground">
                        Last changed: Never
                      </div>
                      <Button type="submit" className="flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>Update Password</span>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Account Security</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your account security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Login Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified when someone signs into your account</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </CardTitle>
                  <CardDescription>
                    Choose what notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">SEO Report Updates</p>
                      <p className="text-sm text-muted-foreground">Get notified when your reports are ready</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Marketing Communications</p>
                      <p className="text-sm text-muted-foreground">Receive tips and product updates</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Disabled
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Account Activity</span>
                  </CardTitle>
                  <CardDescription>
                    Overview of your recent account activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border border-border/50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">0</div>
                        <div className="text-sm text-muted-foreground">SEO Audits</div>
                      </div>
                      <div className="p-4 border border-border/50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">0</div>
                        <div className="text-sm text-muted-foreground">Reports Generated</div>
                      </div>
                      <div className="p-4 border border-border/50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">{accountAge}</div>
                        <div className="text-sm text-muted-foreground">Days Active</div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-medium">Recent Activity</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Account created</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                          <AlertCircle className="w-4 h-4 text-blue-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Welcome to SEO Expert!</p>
                            <p className="text-xs text-muted-foreground">Start by running your first SEO audit</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Key,
  Bell,
  Globe,
  Camera,
  Edit3,
  Save,
  X,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Settings,
  CreditCard,
  Activity,
  BarChart3,
  Eye,
  EyeOff,
  Upload,
  Trash2
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { BackgroundAnimation } from "@/components/background-animation"

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  location: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
})

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ProfileFormData = z.infer<typeof profileSchema>
type PasswordFormData = z.infer<typeof passwordSchema>

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>("")
  const { user, isLoading, isAuthenticated, updateUser } = useAuth()
  const router = useRouter()

  const profileForm = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      company: "",
      website: "",
      location: "",
      bio: "",
    }
  })

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  })

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name || "",
        email: user.email || "",
        phone: "",
        company: "",
        website: "",
        location: "",
        bio: "",
      })
    }
  }, [user, profileForm])

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarRemove = () => {
    setAvatarFile(null)
    setAvatarPreview("")
  }

  const onProfileSubmit = async (data: ProfileFormData) => {
    try {
      // Here you would typically make an API call to update the profile
      updateUser({ name: data.name, email: data.email })
      setIsEditing(false)
      // Show success message
    } catch (error) {
      console.error("Profile update failed:", error)
    }
  }

  const onPasswordSubmit = async (data: PasswordFormData) => {
    try {
      // Here you would make an API call to change password
      console.log("Password change:", data)
      passwordForm.reset()
      // Show success message
    } catch (error) {
      console.error("Password change failed:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const userInitials = user.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || 'U'

  const accountAge = Math.floor((Date.now() - new Date(user.createdAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundAnimation />
      
      {/* Header */}
      <header className="relative z-10 p-6 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="mr-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Logo size={32} />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              SEO Expert
            </span>
          </Link>
        </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative group">
                  <Avatar className="w-24 h-24 border-4 border-primary/20">
                    <AvatarImage src={avatarPreview || user.avatar || ""} alt={user.name} />
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Upload overlay */}
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex space-x-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        id="avatar-upload"
                        aria-label="Upload profile picture"
                      />
                      <label htmlFor="avatar-upload">
                        <Button
                          size="sm"
                          className="rounded-full w-8 h-8 p-0"
                          asChild
                        >
                          <span className="cursor-pointer">
                            <Upload className="w-4 h-4" />
                          </span>
                        </Button>
                      </label>
                      {(avatarPreview || user.avatar) && (
                        <Button
                          size="sm"
                          variant="destructive"
                          className="rounded-full w-8 h-8 p-0"
                          onClick={handleAvatarRemove}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {/* Camera icon for mobile */}
                  <div className="absolute -bottom-2 -right-2 md:hidden">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      id="avatar-upload-mobile"
                      aria-label="Upload profile picture (mobile)"
                    />
                    <label htmlFor="avatar-upload-mobile">
                      <Button
                        size="sm"
                        className="rounded-full w-8 h-8 p-0"
                        asChild
                      >
                        <span className="cursor-pointer">
                          <Camera className="w-4 h-4" />
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-3">
                    <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <p className="text-muted-foreground flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {user.email}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    Member for {accountAge} days
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    variant={isEditing ? "outline" : "default"}
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center space-x-2"
                  >
                    {isEditing ? (
                      <>
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Preferences</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span className="hidden sm:inline">Activity</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Personal Information</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          {...profileForm.register("name")}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                        {profileForm.formState.errors.name && (
                          <p className="text-sm text-red-500">{profileForm.formState.errors.name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          {...profileForm.register("email")}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                        {profileForm.formState.errors.email && (
                          <p className="text-sm text-red-500">{profileForm.formState.errors.email.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          {...profileForm.register("phone")}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          {...profileForm.register("company")}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                          placeholder="Your company name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          {...profileForm.register("website")}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                          placeholder="https://yourwebsite.com"
                        />
                        {profileForm.formState.errors.website && (
                          <p className="text-sm text-red-500">{profileForm.formState.errors.website.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          {...profileForm.register("location")}
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <textarea
                        id="bio"
                        {...profileForm.register("bio")}
                        disabled={!isEditing}
                        className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${!isEditing ? "bg-muted" : ""}`}
                        placeholder="Tell us about yourself..."
                        rows={4}
                      />
                      {profileForm.formState.errors.bio && (
                        <p className="text-sm text-red-500">{profileForm.formState.errors.bio.message}</p>
                      )}
                    </div>

                    {isEditing && (
                      <div className="flex justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="flex items-center space-x-2">
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="w-5 h-5" />
                    <span>Change Password</span>
                  </CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        {...passwordForm.register("currentPassword")}
                      />
                      {passwordForm.formState.errors.currentPassword && (
                        <p className="text-sm text-red-500">{passwordForm.formState.errors.currentPassword.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        {...passwordForm.register("newPassword")}
                      />
                      {passwordForm.formState.errors.newPassword && (
                        <p className="text-sm text-red-500">{passwordForm.formState.errors.newPassword.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...passwordForm.register("confirmPassword")}
                      />
                      {passwordForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-500">{passwordForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <div className="text-sm text-muted-foreground">
                        Last changed: Never
                      </div>
                      <Button type="submit" className="flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>Update Password</span>
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Account Security</span>
                  </CardTitle>
                  <CardDescription>
                    Manage your account security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">Login Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified when someone signs into your account</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                  </CardTitle>
                  <CardDescription>
                    Choose what notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">SEO Report Updates</p>
                      <p className="text-sm text-muted-foreground">Get notified when your reports are ready</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Marketing Communications</p>
                      <p className="text-sm text-muted-foreground">Receive tips and product updates</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Disabled
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Account Activity</span>
                  </CardTitle>
                  <CardDescription>
                    Overview of your recent account activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border border-border/50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">0</div>
                        <div className="text-sm text-muted-foreground">SEO Audits</div>
                      </div>
                      <div className="p-4 border border-border/50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">0</div>
                        <div className="text-sm text-muted-foreground">Reports Generated</div>
                      </div>
                      <div className="p-4 border border-border/50 rounded-lg text-center">
                        <div className="text-2xl font-bold text-primary">{accountAge}</div>
                        <div className="text-sm text-muted-foreground">Days Active</div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-medium">Recent Activity</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Account created</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                          <AlertCircle className="w-4 h-4 text-blue-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">Welcome to SEO Expert!</p>
                            <p className="text-xs text-muted-foreground">Start by running your first SEO audit</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
>>>>>>> 1b166dd (Add authentication files (Login, Register, Profile, API, UI, utils, types))
}