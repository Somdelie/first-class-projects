import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Create Prisma client with better error handling
function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL || 'mongodb://localhost:27017/fallback',
      },
    },
    errorFormat: 'minimal',
    transactionOptions: {
      maxWait: 10000, // default: 2000
      timeout: 15000, // default: 5000
    },
  })
}

export const prisma =
  globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Also export as db for backward compatibility
export const db = prisma