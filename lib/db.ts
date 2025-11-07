'use server'
import { currentUser } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'
import { safeDbOperation, ensureDbConnection, safeDbDisconnect } from './db-utils'
import { prisma } from './prisma'

// Types
interface Project {
  id: string
  title: string
  category: string
  images: string[] // Changed from image to images array
  description: string
  createdAt: Date
  updatedAt: Date
}

type DbResult<T> = 
  | { success: true; data: T }
  | { success: false; error: string }


// Project CRUD operations
export async function createProject(data: {
  title: string
  description: string
  images: string[] // Changed from image to images array
  category?: string
}) {

  const user = await currentUser()
  if (!user?.id) {
    return { success: false, error: 'User not authenticated' }
  }
  
  try {
    const connected = await ensureDbConnection()
    if (!connected) {
      return { success: false, error: 'Failed to connect to database' }
    }
    
    const project = await prisma.project.create({
      data: {
        ...data,
        images: data.images, // Changed from image to images
        category: data.category ?? ""
      }
    })
    revalidatePath('/admin')
    return { success: true, project }
  } catch (error) {
    console.error('Failed to create project:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown database error'
    return { success: false, error: `Database error: ${errorMessage}` }
  } finally {
    await safeDbDisconnect()
  }
}

export async function getAllProjects(): Promise<DbResult<Project[]>> {
  return safeDbOperation(
    async () => {
      const connected = await ensureDbConnection()
      if (!connected) {
        throw new Error('Failed to connect to database')
      }
      
      const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
      })
      
      await safeDbDisconnect()
      return { success: true as const, data: projects }
    },
    { success: true as const, data: [] } // Fallback value for build time
  ).catch((error) => {
    console.error('Failed to get projects:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown database error'
    return { success: false as const, error: `Database error: ${errorMessage}` }
  })
}

export async function updateProject(id: string, data: {
  title?: string
  description?: string
  images?: string[] // Changed from image to images array
  category?: string
}) {

  try {
    // Filter out fields that shouldn't be updated and only include defined values
    const updateData: {
      title?: string
      description?: string
      images?: string[] // Changed from image to images array
      category?: string
    } = {}
    if (data.title !== undefined) updateData.title = data.title
    if (data.description !== undefined) updateData.description = data.description
    if (data.images !== undefined) updateData.images = data.images // Changed from image to images
    if (data.category !== undefined) updateData.category = data.category

    const project = await prisma.project.update({
      where: { id },
      data: updateData
    })
    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true, project }
  } catch (error) {
    console.error('Failed to update project:', error)
    return { success: false, error: 'Failed to update project' }
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id }
    })
    revalidatePath('/admin')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete project:', error)
    return { success: false, error: 'Failed to delete project' }
  }
}

// Partner CRUD operations
interface Partner {
  id: string
  name: string
  logoUrl: string
  website: string
  certificate: string
  createdAt: Date
  updatedAt: Date
}

export async function createPartner(data: {
  name: string
  logoUrl: string
  website: string
  certificate: string
}): Promise<{ success: true; partner: Partner } | { success: false; error: string }> {
  const user = await currentUser()
  if (!user?.id) {
    return { success: false, error: 'User not authenticated' }
  }
  
  try {
    const connected = await ensureDbConnection()
    if (!connected) {
      return { success: false, error: 'Failed to connect to database' }
    }
    
    const partner = await prisma.partner.create({
      data
    })
    
    revalidatePath('/admin')
    return { success: true, partner }
  } catch (error) {
    console.error('Failed to create partner:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown database error'
    return { success: false, error: `Database error: ${errorMessage}` }
  } finally {
    await safeDbDisconnect()
  }
}

export async function getAllPartners(): Promise<DbResult<Partner[]>> {
  return safeDbOperation(
    async () => {
      const connected = await ensureDbConnection()
      if (!connected) {
        throw new Error('Failed to connect to database')
      }
      
      const partners = await prisma.partner.findMany({
        orderBy: { createdAt: 'desc' }
      })
      
      await safeDbDisconnect()
      return { success: true as const, data: partners }
    },
    { success: true as const, data: [] } // Fallback value for build time
  ).catch((error) => {
    console.error('Failed to get partners:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown database error'
    return { success: false as const, error: `Database error: ${errorMessage}` }
  })
}

export async function updatePartner(id: string, data: {
  name?: string
  logoUrl?: string
  website?: string
  certificate?: string
}): Promise<{ success: true; partner: Partner } | { success: false; error: string }> {
  try {
    // Filter out fields that shouldn't be updated and only include defined values
    const updateData: {
      name?: string
      logoUrl?: string
      website?: string
      certificate?: string
    } = {}
    if (data.name !== undefined) updateData.name = data.name
    if (data.logoUrl !== undefined) updateData.logoUrl = data.logoUrl
    if (data.website !== undefined) updateData.website = data.website
    if (data.certificate !== undefined) updateData.certificate = data.certificate

    const partner = await prisma.partner.update({
      where: { id },
      data: updateData
    })
    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true, partner }
  } catch (error) {
    console.error('Failed to update partner:', error)
    return { success: false, error: 'Failed to update partner' }
  }
}

export async function deletePartner(id: string): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await prisma.partner.delete({
      where: { id }
    })
    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete partner:', error)
    return { success: false, error: 'Failed to delete partner' }
  }
}





