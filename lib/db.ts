'use server'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from './prisma'
import { revalidatePath } from 'next/cache'

// Project CRUD operations
export async function createProject(data: {
  title: string
  description: string
  image: string
  category?: string
}) {

  const user = await currentUser()
  console.log(user)
  if (!user?.id) {
    return { success: false, error: 'User not authenticated' }
  }
  try {
    const project = await prisma.project.create({
      data: {
        ...data,
        image: data.image,
        category: data.category ?? ""
      }
    })
    revalidatePath('/admin')
    return { success: true, project }
  } catch (error) {
    console.error('Failed to create project:', error)
    return { success: false, error: 'Failed to create project' }
  }
}

export async function getAllProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    })
    // console.log(projects, "These are your projects")
    return { success: true, data: projects }
  } catch (error) {
    console.error('Failed to get projects:', error)
    return { success: false, error: 'Failed to get projects' }
  }
}

export async function updateProject(id: string, data: {
  title?: string
  description?: string
  image?: string
  category?: string
}) {

  console.log(data)
  try {
    // Filter out fields that shouldn't be updated and only include defined values
    const updateData: {
      title?: string
      description?: string
      image?: string
      category?: string
    } = {}
    if (data.title !== undefined) updateData.title = data.title
    if (data.description !== undefined) updateData.description = data.description
    if (data.image !== undefined) updateData.image = data.image
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





