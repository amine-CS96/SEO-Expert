import { NextRequest, NextResponse } from 'next/server'
import { 
  verifyToken, 
  extractTokenFromHeader, 
  findUserById,
  initializeTestUsers
} from '@/lib/auth-utils'
import { AuthResponse } from '@/types/auth'

export async function GET(request: NextRequest) {
  try {
    // Initialiser les utilisateurs de test si nécessaire
    await initializeTestUsers()

    // Extract token from Authorization header
    const authHeader = request.headers.get('authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Authentication token missing"
      } as AuthResponse, { status: 401 })
    }

    // Verify token
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({
        success: false,
        message: "Invalid authentication token"
      } as AuthResponse, { status: 401 })
    }

    // Find user
    const user = await findUserById(decoded.userId)
    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found"
      } as AuthResponse, { status: 404 })
    }

    // Return user information
    return NextResponse.json({
      success: true,
      user,
      message: "Valid token"
    } as AuthResponse, { status: 200 })

  } catch (error) {
    console.error('Token verification error:', error)
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}