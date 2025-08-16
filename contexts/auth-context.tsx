"use client"

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { User, AuthState, LoginCredentials, RegisterCredentials, AuthResponse } from '@/types/auth'
import { useToast } from '@/hooks/use-toast'

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>
  register: (credentials: RegisterCredentials) => Promise<boolean>
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false
      }
    case 'LOGOUT':
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null
      }
    default:
      return state
  }
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const { toast } = useToast()

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        dispatch({ type: 'SET_LOADING', payload: false })
        return
      }

      const response = await fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data: AuthResponse = await response.json()
        if (data.success && data.user) {
          dispatch({ type: 'SET_USER', payload: data.user })
        } else {
          localStorage.removeItem('auth_token')
          dispatch({ type: 'SET_LOADING', payload: false })
        }
      } else {
        localStorage.removeItem('auth_token')
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('auth_token')
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      const data: AuthResponse = await response.json()

      if (data.success && data.user && data.token) {
        localStorage.setItem('auth_token', data.token)
        dispatch({ type: 'SET_USER', payload: data.user })
        toast({
          title: "Sign In successful",
          description: `Welcome ${data.user.name}!`,
        })
        return true
      } else {
        toast({
          title: "Sign In error",
          description: data.message || "Invalid email or password",
          variant: "destructive"
        })
        dispatch({ type: 'SET_LOADING', payload: false })
        return false
      }
    } catch (error) {
      console.error('Sign In error:', error)
      toast({
        title: "Sign In error",
        description: "An error occurred during sign in",
        variant: "destructive"
      })
      dispatch({ type: 'SET_LOADING', payload: false })
      return false
    }
  }

  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })

      const data: AuthResponse = await response.json()

      if (data.success && data.user && data.token) {
        localStorage.setItem('auth_token', data.token)
        dispatch({ type: 'SET_USER', payload: data.user })
        toast({
          title: "Registration successful",
          description: `Welcome ${data.user.name}!`,
        })
        return true
      } else {
        toast({
          title: "Registration error",
          description: data.message || "An error occurred during registration",
          variant: "destructive"
        })
        dispatch({ type: 'SET_LOADING', payload: false })
        return false
      }
    } catch (error) {
      console.error('Register error:', error)
      toast({
        title: "Registration error",
        description: "An error occurred during registration",
        variant: "destructive"
      })
      dispatch({ type: 'SET_LOADING', payload: false })
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    dispatch({ type: 'LOGOUT' })
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    })
  }

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData })
  }

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}