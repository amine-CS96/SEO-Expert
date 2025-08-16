import { NextRequest, NextResponse } from 'next/server'
import { 
  createUser, 
  findUserByEmail, 
  generateToken, 
  isValidEmail,
  initializeTestUsers
} from '@/lib/auth-utils'
import { validatePasswordStrength } from '@/lib/password-utils'
import { AuthResponse } from '@/types/auth'

export async function POST(request: NextRequest) {
  try {
    // Initialiser les utilisateurs de test si nécessaire
    await initializeTestUsers()

    const body = await request.json()
    const { name, email, password, confirmPassword } = body

    // Validate required fields
    if (!name || !email || !password || !confirmPassword) {
      return NextResponse.json({
        success: false,
        message: "All fields are required"
      } as AuthResponse, { status: 400 })
    }

    // Validate name
    if (name.trim().length < 2) {
      return NextResponse.json({
        success: false,
        message: "Name must be at least 2 characters"
      } as AuthResponse, { status: 400 })
    }

    // Validate email
    if (!isValidEmail(email)) {
      return NextResponse.json({
        success: false,
        message: "Please enter a valid email address"
      } as AuthResponse, { status: 400 })
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      return NextResponse.json({
        success: false,
        message: "Passwords do not match"
      } as AuthResponse, { status: 400 })
    }

    // Validate password strength
    const passwordStrength = validatePasswordStrength(password)
    if (!passwordStrength.isValid) {
      return NextResponse.json({
        success: false,
        message: "Password does not meet security requirements",
        error: passwordStrength.feedback.join(', ')
      } as AuthResponse, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "An account with this email address already exists"
      } as AuthResponse, { status: 409 })
    }

    // Create new user
    const newUser = await createUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password
    })

    // Generate JWT token
    const token = generateToken(newUser)

    // Return success response
    return NextResponse.json({
      success: true,
      user: newUser,
      token,
      message: "Account created successfully"
    } as AuthResponse, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({
      success: false,
      message: "An internal error occurred",
      error: "Internal server error"
    } as AuthResponse, { status: 500 })
  }
}

// Méthode OPTIONS pour CORS (si nécessaire)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}