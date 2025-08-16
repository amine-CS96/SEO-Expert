import { PasswordStrength } from '@/types/auth'

export function validatePasswordStrength(password: string): PasswordStrength {
  const feedback: string[] = []
  let score = 0

  // Longueur minimale
  if (password.length >= 8) {
    score += 1
  } else {
    feedback.push("At least 8 characters")
  }

  // Uppercase
  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push("At least one uppercase letter")
  }

  // Lowercase
  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push("At least one lowercase letter")
  }

  // Numbers
  if (/\d/.test(password)) {
    score += 1
  } else {
    feedback.push("At least one number")
  }

  // Special characters
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    score += 1
  } else {
    feedback.push("At least one special character")
  }

  // Longueur optimale
  if (password.length >= 12) {
    score += 1
  }

  return {
    score,
    feedback,
    isValid: score >= 4
  }
}

export function getPasswordStrengthLabel(score: number): string {
  if (score <= 2) return "Weak"
  if (score <= 3) return "Medium"
  if (score <= 4) return "Strong"
  return "Very Strong"
}

export function getPasswordStrengthColor(score: number): string {
  if (score <= 2) return "text-red-500"
  if (score <= 3) return "text-yellow-500"
  if (score <= 4) return "text-green-500"
  return "text-green-600"
}

export function getPasswordStrengthBgColor(score: number): string {
  if (score <= 2) return "bg-red-500"
  if (score <= 3) return "bg-yellow-500"
  if (score <= 4) return "bg-green-500"
  return "bg-green-600"
}