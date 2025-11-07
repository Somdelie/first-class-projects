import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { updateProject, deleteProject } from '@/lib/db'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await req.json()
    const { title, description, images, category } = body // Changed from image to images

    const result = await updateProject(id, {
      title,
      description,
      images, // Changed from image to images
      category
    })

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({ project: result.project })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const result = await deleteProject(id)

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    return NextResponse.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}