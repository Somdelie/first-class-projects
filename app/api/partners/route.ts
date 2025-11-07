import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { createPartner, getAllPartners } from '@/lib/db'

export async function GET() {
  try {
    console.log('Fetching partners...')
    const result = await getAllPartners()
    
    if (!result.success) {
      console.error('Failed to get partners:', result.error)
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    console.log('Partners fetched successfully:', result.data?.length || 0)
    return NextResponse.json({ partners: result.data || [] })
  } catch (error) {
    console.error('Error fetching partners:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log('Creating new partner...')
    const { userId } = await auth()
    
    if (!userId) {
      console.log('Unauthorized: No user ID')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, logoUrl, website, certificate } = body
    console.log('Partner data received:', { name, logoUrl, website, certificate })

    if (!name || !logoUrl || !certificate) {
      console.log('Missing required fields')
      return NextResponse.json(
        { error: 'Name, logo URL, and certificate are required' },
        { status: 400 }
      )
    }

    const result = await createPartner({
      name,
      logoUrl,
      website: website || '',
      certificate
    })

    if (!result.success) {
      console.error('Failed to create partner:', result.error)
      return NextResponse.json({ error: result.error }, { status: 500 })
    }

    console.log('Partner created successfully:', result.partner?.id)
    return NextResponse.json({ partner: result.partner }, { status: 201 })
  } catch (error) {
    console.error('Error creating partner:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}