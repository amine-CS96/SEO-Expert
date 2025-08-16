<<<<<<< HEAD
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '@/types/auth'

// Configuration JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

// Interface pour les données du token JWT
interface JWTPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}

// Hacher un mot de passe
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

// Vérifier un mot de passe
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// Générer un token JWT
export function generateToken(user: User): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email
  }
  
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  } as jwt.SignOptions)
}

// Vérifier et décoder un token JWT
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

// Extraire le token du header Authorization
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7) // Remove 'Bearer ' prefix
}

// Valider le format email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Générer un ID unique simple (pour la démo - en production, utilisez une vraie DB)
export function generateUserId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Simuler une base de données en mémoire (pour la démo)
// En production, remplacez par une vraie base de données
interface UserStorage {
  [key: string]: {
    id: string
    name: string
    email: string
    password: string
    avatar?: string
    createdAt: string
    updatedAt: string
  }
}

// Stockage temporaire des utilisateurs (en mémoire)
let users: UserStorage = {}

// Fonctions de gestion des utilisateurs (simulation DB)
export async function createUser(userData: {
  name: string
  email: string
  password: string
}): Promise<User> {
  const userId = generateUserId()
  const hashedPassword = await hashPassword(userData.password)
  const now = new Date().toISOString()
  
  const user = {
    id: userId,
    name: userData.name,
    email: userData.email.toLowerCase(),
    password: hashedPassword,
    createdAt: now,
    updatedAt: now
  }
  
  users[userId] = user
  
  // Retourner l'utilisateur sans le mot de passe
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword as User
}

export async function findUserByEmail(email: string): Promise<(User & { password: string }) | null> {
  const userEntries = Object.values(users)
  const user = userEntries.find(u => u.email.toLowerCase() === email.toLowerCase())
  return user || null
}

export async function findUserById(id: string): Promise<User | null> {
  const user = users[id]
  if (!user) return null
  
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword as User
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const user = users[id]
  if (!user) return null
  
  const updatedUser = {
    ...user,
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  users[id] = updatedUser
  
  const { password, ...userWithoutPassword } = updatedUser
  return userWithoutPassword as User
}

// Fonction pour initialiser quelques utilisateurs de test (optionnel)
export async function initializeTestUsers() {
  if (Object.keys(users).length === 0) {
    // Créer un utilisateur de test
    await createUser({
      name: "Test User",
      email: "test@example.com",
      password: "Test123!"
    })
  }
=======
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '@/types/auth'

// Configuration JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'

// Interface pour les données du token JWT
interface JWTPayload {
  userId: string
  email: string
  iat?: number
  exp?: number
}

// Hacher un mot de passe
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

// Vérifier un mot de passe
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

// Générer un token JWT
export function generateToken(user: User): string {
  const payload: JWTPayload = {
    userId: user.id,
    email: user.email
  }
  
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  } as jwt.SignOptions)
}

// Vérifier et décoder un token JWT
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    console.error('Token verification failed:', error)
    return null
  }
}

// Extraire le token du header Authorization
export function extractTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7) // Remove 'Bearer ' prefix
}

// Valider le format email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Générer un ID unique simple (pour la démo - en production, utilisez une vraie DB)
export function generateUserId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Simuler une base de données en mémoire (pour la démo)
// En production, remplacez par une vraie base de données
interface UserStorage {
  [key: string]: {
    id: string
    name: string
    email: string
    password: string
    avatar?: string
    createdAt: string
    updatedAt: string
  }
}

// Stockage temporaire des utilisateurs (en mémoire)
let users: UserStorage = {}

// Fonctions de gestion des utilisateurs (simulation DB)
export async function createUser(userData: {
  name: string
  email: string
  password: string
}): Promise<User> {
  const userId = generateUserId()
  const hashedPassword = await hashPassword(userData.password)
  const now = new Date().toISOString()
  
  const user = {
    id: userId,
    name: userData.name,
    email: userData.email.toLowerCase(),
    password: hashedPassword,
    createdAt: now,
    updatedAt: now
  }
  
  users[userId] = user
  
  // Retourner l'utilisateur sans le mot de passe
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword as User
}

export async function findUserByEmail(email: string): Promise<(User & { password: string }) | null> {
  const userEntries = Object.values(users)
  const user = userEntries.find(u => u.email.toLowerCase() === email.toLowerCase())
  return user || null
}

export async function findUserById(id: string): Promise<User | null> {
  const user = users[id]
  if (!user) return null
  
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword as User
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  const user = users[id]
  if (!user) return null
  
  const updatedUser = {
    ...user,
    ...updates,
    updatedAt: new Date().toISOString()
  }
  
  users[id] = updatedUser
  
  const { password, ...userWithoutPassword } = updatedUser
  return userWithoutPassword as User
}

// Fonction pour initialiser quelques utilisateurs de test (optionnel)
export async function initializeTestUsers() {
  if (Object.keys(users).length === 0) {
    // Créer un utilisateur de test
    await createUser({
      name: "Test User",
      email: "test@example.com",
      password: "Test123!"
    })
  }
>>>>>>> 1b166dd (Add authentication files (Login, Register, Profile, API, UI, utils, types))
}