'use server'

import { revalidatePath } from 'next/cache'
import { currentUser } from '@clerk/nextjs/server'
import { 
  getAllProjects as dbGetAllProjects,
  createProject as dbCreateProject,
  updateProject as dbUpdateProject,
  deleteProject as dbDeleteProject,
  getAllPartners as dbGetAllPartners,
  createPartner as dbCreatePartner,
  updatePartner as dbUpdatePartner,
  deletePartner as dbDeletePartner
} from './db'

// Project Server Actions
export async function getProjectsAction() {
  try {
    const result = await dbGetAllProjects()
    return result
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return { 
      success: false as const, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

export async function createProjectAction(formData: FormData) {
  const user = await currentUser()
  if (!user?.id) {
    return { 
      success: false as const, 
      error: 'User not authenticated' 
    }
  }

  try {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const images = formData.getAll('images') as string[]

    if (!title || images.length === 0) {
      return { 
        success: false as const, 
        error: 'Title and images are required' 
      }
    }

    const result = await dbCreateProject({
      title,
      description,
      images,
      category
    })

    if (result.success) {
      revalidatePath('/admin')
      revalidatePath('/projects')
      return { success: true as const, data: result.project }
    }

    return result
  } catch (error) {
    console.error('Failed to create project:', error)
    return { 
      success: false as const, 
      error: error instanceof Error ? error.message : 'Failed to create project' 
    }
  }
}

export async function createProjectActionFromObject(data: {
  title: string
  description: string
  images: string[]
  category: string
}) {
  const user = await currentUser()
  if (!user?.id) {
    return { 
      success: false as const, 
      error: 'User not authenticated' 
    }
  }

  try {
    if (!data.title || data.images.length === 0) {
      return { 
        success: false as const, 
        error: 'Title and images are required' 
      }
    }

    const result = await dbCreateProject(data)

    if (result.success) {
      revalidatePath('/admin')
      revalidatePath('/projects')
      return result
    }

    return result
  } catch (error) {
    console.error('Failed to create project:', error)
    return { 
      success: false as const, 
      error: error instanceof Error ? error.message : 'Failed to create project' 
    }
  }
}

export async function updateProjectAction(id: string, formData: FormData) {
  const user = await currentUser()
  if (!user?.id) {
    return { 
      success: false as const, 
      error: 'User not authenticated' 
    }
  }

  try {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string
    const images = formData.getAll('images') as string[]

    const updateData: Record<string, string | string[]> = {}
    if (title) updateData.title = title
    if (description) updateData.description = description
    if (category) updateData.category = category
    if (images.length > 0) updateData.images = images

    const result = await dbUpdateProject(id, updateData)

    if (result.success) {
      revalidatePath('/admin')
      revalidatePath('/projects')
      revalidatePath(`/projects/${id}`)
      return result
    }

    return result
  } catch (error) {
    console.error('Failed to update project:', error)
    return { 
      success: false as const, 
      error: error instanceof Error ? error.message : 'Failed to update project' 
    }
  }
}

export async function deleteProjectAction(id: string) {
  const user = await currentUser()
  if (!user?.id) {
    return { 
      success: false as const, 
      error: 'User not authenticated' 
    }
  }

  try {
    const result = await dbDeleteProject(id)

    if (result.success) {
      revalidatePath('/admin')
      revalidatePath('/projects')
      return result
    }

    return result
  } catch (error) {
    console.error('Failed to delete project:', error)
    return { 
      success: false as const, 
      error: error instanceof Error ? error.message : 'Failed to delete project' 
    }
  }
}

// Partner Server Actions
export async function getPartnersAction() {
  try {
    const result = await dbGetAllPartners()
    return result
  } catch (error) {
    console.error('Failed to fetch partners:', error)
    return { 
      success: false as const, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

export async function createPartnerAction(formData: FormData) {
  const user = await currentUser()
  if (!user?.id) {
    return { 
      success: false as const, 
      error: 'User not authenticated' 
    }
  }

  try {
    const name = formData.get('name') as string
    const logoUrl = formData.get('logoUrl') as string
    const website = formData.get('website') as string
    const certificate = formData.get('certificate') as string

    if (!name || !logoUrl || !website || !certificate) {
      return { 
        success: false as const, 
        error: 'All fields are required' 
      }
    }

    const result = await dbCreatePartner({
      name,
      logoUrl,
      website,
      certificate
    })

    if (result.success) {
      revalidatePath('/admin')
      revalidatePath('/')
      return result
    }

    return result
  } catch (error) {
    console.error('Failed to create partner:', error)
    return { 
      success: false as const, 
      error: error instanceof Error ? error.message : 'Failed to create partner' 
    }
  }
}

export async function updatePartnerAction(id: string, formData: FormData) {
  const user = await currentUser()
  if (!user?.id) {
    return { 
      success: false as const, 
      error: 'User not authenticated' 
    }
  }

  try {
    const name = formData.get('name') as string
    const logoUrl = formData.get('logoUrl') as string
    const website = formData.get('website') as string
    const certificate = formData.get('certificate') as string

    const updateData: Record<string, string> = {}
    if (name) updateData.name = name
    if (logoUrl) updateData.logoUrl = logoUrl
    if (website) updateData.website = website
    if (certificate) updateData.certificate = certificate

    const result = await dbUpdatePartner(id, updateData)

    if (result.success) {
      revalidatePath('/admin')
      revalidatePath('/')
      return result
    }

    return result
  } catch (error) {
    console.error('Failed to update partner:', error)
    return { 
      success: false as const, 
      error: error instanceof Error ? error.message : 'Failed to update partner' 
    }
  }
}

export async function deletePartnerAction(id: string) {
  const user = await currentUser()
  if (!user?.id) {
    return { 
      success: false as const, 
      error: 'User not authenticated' 
    }
  }

  try {
    const result = await dbDeletePartner(id)

    if (result.success) {
      revalidatePath('/admin')
      revalidatePath('/')
      return result
    }

    return result
  } catch (error) {
    console.error('Failed to delete partner:', error)
    return { 
      success: false as const, 
      error: error instanceof Error ? error.message : 'Failed to delete partner' 
    }
  }
}