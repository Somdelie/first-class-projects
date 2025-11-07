import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { updatePartner, deletePartner } from '@/lib/db'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('Updating partner:', id)
    const { userId } = await auth()
    
    if (!userId) {
      console.log('Unauthorized: No user ID')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, logoUrl, website, certificate } = body
    console.log('Update data received:', { name, logoUrl, website, certificate })

    if (!name || !logoUrl || !certificate) {
      console.log('Missing required fields')
      return NextResponse.json(
        { error: 'Name, logo URL, and certificate are required' },
        { status: 400 }
      )
    }

    const result = await updatePartner(id, {
      name,
      logoUrl,
      website: website || '',
      certificate
    })

    if (!result.success) {
      console.error('Failed to update partner:', result.error)
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    console.log('Partner updated successfully:', id)
    return NextResponse.json({ partner: result.partner })
  } catch (error) {
    console.error('Error updating partner:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    console.log('Deleting partner:', id)
    const { userId } = await auth()
    
    if (!userId) {
      console.log('Unauthorized: No user ID')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const result = await deletePartner(id)

    if (!result.success) {
      console.error('Failed to delete partner:', result.error)
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    console.log('Partner deleted successfully:', id)
    return NextResponse.json({ message: 'Partner deleted successfully' })
  } catch (error) {
    console.error('Error deleting partner:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}