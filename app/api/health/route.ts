import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('Testing database connection...')
    
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({
        status: 'error',
        message: 'DATABASE_URL environment variable is not set'
      }, { status: 500 })
    }
    
    console.log('DATABASE_URL is set')
    
    // Test database connection
    await prisma.$connect()
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
        databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
        environment: process.env.NODE_ENV
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
      environment: process.env.NODE_ENV
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}