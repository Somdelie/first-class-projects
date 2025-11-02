import { db } from "./prisma"


/**
 * Safe database operation wrapper that handles build-time scenarios
 */
export async function safeDbOperation<T>(
  operation: () => Promise<T>,
  fallbackValue: T
): Promise<T> {
  // During build time or when no DATABASE_URL is available, return fallback
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('fallback')) {
    console.log('No valid DATABASE_URL, returning fallback value')
    return fallbackValue
  }

  // Skip database operations during static generation
  if (process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV) {
    console.log('Build time detected, returning fallback value')
    return fallbackValue
  }

  try {
    return await operation()
  } catch (error) {
    console.error('Database operation failed:', error)
    
    // If it's a connection error during build, return fallback
    if (error instanceof Error && error.message.includes('P2010')) {
      console.log('P2010 error during build, returning fallback')
      return fallbackValue
    }
    
    throw error
  }
}

/**
 * Initialize database connection safely
 */
export async function ensureDbConnection() {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('fallback')) {
    return false
  }

  try {
    await db.$connect()
    return true
  } catch (error) {
    console.error('Failed to connect to database:', error)
    return false
  }
}

/**
 * Safely disconnect from database
 */
export async function safeDbDisconnect() {
  try {
    await db.$disconnect()
  } catch (error) {
    console.log('Error disconnecting from database:', error)
  }
}