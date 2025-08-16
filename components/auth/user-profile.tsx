"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  User,
  LogOut,
  Settings,
  FileText,
  ChevronDown,
  Mail,
  Calendar,
  LayoutDashboard
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { User as UserType } from "@/types/auth"

interface UserProfileProps {
  user: UserType
}

export function UserProfile({ user }: UserProfileProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    setIsDropdownOpen(false)
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center space-x-3 h-auto p-2 hover:bg-accent/50"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            getInitials(user.name)
          )}
        </div>
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-medium text-foreground">
            {user.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {user.email}
          </span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-muted-foreground transition-transform ${
            isDropdownOpen ? 'rotate-180' : ''
          }`} 
        />
      </Button>

      <AnimatePresence>
        {isDropdownOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsDropdownOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-80 bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg z-50"
            >
              {/* User Info Header */}
              <div className="p-4 border-b border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {user.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>Member since {formatDate(user.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-accent/50"
                  onClick={() => {
                    setIsDropdownOpen(false)
                    router.push('/dashboard')
                  }}
                >
                  <LayoutDashboard className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Dashboard</div>
                    <div className="text-xs text-muted-foreground">
                      View your SEO analytics
                    </div>
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-accent/50"
                  onClick={() => {
                    setIsDropdownOpen(false)
                    router.push('/profile')
                  }}
                >
                  <User className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">My Profile</div>
                    <div className="text-xs text-muted-foreground">
                      Manage your personal information
                    </div>
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-accent/50"
                  onClick={() => {
                    setIsDropdownOpen(false)
                    // TODO: Navigate to reports page
                    console.log("Navigate to reports")
                  }}
                >
                  <FileText className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">My Reports</div>
                    <div className="text-xs text-muted-foreground">
                      History of your SEO audits
                    </div>
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-accent/50"
                  onClick={() => {
                    setIsDropdownOpen(false)
                    // TODO: Navigate to settings page
                    console.log("Navigate to settings")
                  }}
                >
                  <Settings className="w-4 h-4 mr-3" />
                  <div className="text-left">
                    <div className="font-medium">Settings</div>
                    <div className="text-xs text-muted-foreground">
                      Preferences and configuration
                    </div>
                  </div>
                </Button>

                <div className="border-t border-border/50 mt-2 pt-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-auto p-3 hover:bg-destructive/10 hover:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Sign Out</div>
                      <div className="text-xs opacity-70">
                        Close your session
                      </div>
                    </div>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}