import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Try to fetch projects count
    const projectsCount = await prisma.project.count()
    
    return NextResponse.json({
      status: 'Connected to MongoDB successfully',
      projectsCount,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database connection failed:', error)
    return NextResponse.json(
      {
        status: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}