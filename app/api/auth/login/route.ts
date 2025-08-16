<<<<<<< HEAD
import { NextRequest, NextResponse } from 'next/server'
import { 
  findUserByEmail, 
  verifyPassword, 
  generateToken, 
  isValidEmail,
  initializeTestUsers
} from '@/lib/auth-utils'
import { AuthResponse } from '@/types/auth'

export async function POST(request: NextRequest) {
  try {
    // Initialiser les utilisateurs de test si nécessaire
    await initializeTestUsers()

    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Email and password are required"
      } as AuthResponse, { status: 400 })
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json({
        success: false,
        message: "Invalid email format"
      } as AuthResponse, { status: 400 })
    }

    // Find user
    const user = await findUserByEmail(email)
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password"
      } as AuthResponse, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password"
      } as AuthResponse, { status: 401 })
    }

    // Create user object without password
    const { password: _, ...userWithoutPassword } = user

    // Generate JWT token
    const token = generateToken(userWithoutPassword)

    // Return success response
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
      message: "Login successful"
    } as AuthResponse, { status: 200 })

  } catch (error) {
    console.error('Login error:', error)
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
=======
import { NextRequest, NextResponse } from 'next/server'
import { 
  findUserByEmail, 
  verifyPassword, 
  generateToken, 
  isValidEmail,
  initializeTestUsers
} from '@/lib/auth-utils'
import { AuthResponse } from '@/types/auth'

export async function POST(request: NextRequest) {
  try {
    // Initialiser les utilisateurs de test si nécessaire
    await initializeTestUsers()

    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "Email and password are required"
      } as AuthResponse, { status: 400 })
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json({
        success: false,
        message: "Invalid email format"
      } as AuthResponse, { status: 400 })
    }

    // Find user
    const user = await findUserByEmail(email)
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password"
      } as AuthResponse, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: "Invalid email or password"
      } as AuthResponse, { status: 401 })
    }

    // Create user object without password
    const { password: _, ...userWithoutPassword } = user

    // Generate JWT token
    const token = generateToken(userWithoutPassword)

    // Return success response
    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
      message: "Login successful"
    } as AuthResponse, { status: 200 })

  } catch (error) {
    console.error('Login error:', error)
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
>>>>>>> 1b166dd (Add authentication files (Login, Register, Profile, API, UI, utils, types))
}