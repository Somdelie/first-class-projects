import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('Testing database connection...')
    
    // Check if DATABASE_URL is set and valid
    if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('fallback')) {
      return NextResponse.json({
        status: 'warning',
        message: 'DATABASE_URL environment variable is not set or using fallback',
        data: {
          databaseUrl: process.env.DATABASE_URL ? 'Set (but may be fallback)' : 'Not set',
          environment: process.env.NODE_ENV,
          vercelEnv: process.env.VERCEL_ENV || 'Not set'
        }
      }, { status: 200 })
    }
    
    console.log('DATABASE_URL is set')
    
    // Test database connection with timeout
    const connectionPromise = prisma.$connect()
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Connection timeout')), 10000)
    )
    
    await Promise.race([connectionPromise, timeoutPromise])
    console.log('Database connected successfully')
    
    // Try to fetch projects count
    const projectsCount = await prisma.project.count()
    console.log('Projects count:', projectsCount)
    
    // Test a simple query
    const projects = await prisma.project.findMany({
      take: 1,
      select: { id: true, title: true }
    })
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      data: {
        projectsCount,
        sampleProject: projects[0] || null,
        databaseUrl: 'Set and working',
        environment: process.env.NODE_ENV,
        vercelEnv: process.env.VERCEL_ENV || 'Not set'
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      errorCode: error instanceof Error && 'code' in error ? (error as { code: string }).code : undefined,
      databaseUrl: process.env.DATABASE_URL ? 'Set (but connection failed)' : 'Not set',
      environment: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV || 'Not set'
    }, { status: 500 })
  } finally {
    try {
      await prisma.$disconnect()
    } catch (disconnectError) {
      console.log('Error disconnecting:', disconnectError)
    }
  }
}