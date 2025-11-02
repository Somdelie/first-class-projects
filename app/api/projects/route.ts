import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createProject, getAllProjects } from '@/lib/db'

export async function GET() {
  try {
    console.log('Fetching projects...')
    const result = await getAllProjects()
    
    if (!result.success) {
      console.error('Failed to get projects:', result.error)
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    console.log('Projects fetched successfully:', result.data?.length || 0)
    return NextResponse.json({ projects: result.data || [] })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('Creating new project...')
    const { userId } = await auth()
    
    if (!userId) {
      console.log('Unauthorized: No user ID')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, image, category } = body
    console.log('Project data received:', { title, description, image, category })

    if (!title || !description || !image) {
      console.log('Missing required fields')
      return NextResponse.json(
        { error: 'Title, description, and image are required' },
        { status: 400 }
      )
    }

    const result = await createProject({
      title,
      description,
      image,
      category
    })

    if (!result.success) {
      console.error('Failed to create project:', result.error)
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    console.log('Project created successfully:', result.project?.id)
    return NextResponse.json({ project: result.project }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}