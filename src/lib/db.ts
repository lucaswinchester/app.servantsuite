// lib/db.ts
import { auth } from '@clerk/nextjs/server'
import { prisma } from './prisma'
import { redirect } from 'next/navigation'

export async function getCurrentUser() {
  const { userId } = await auth()
  
  if (!userId) {
    return null
  }

  return await prisma.user.findUnique({
    where: { id: userId },
    include: {
      organizationMemberships: {
        include: {
          organization: true,
        },
      },
    },
  })
}

export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/sign-in')
  }
  
  return user
}

export async function getUserOrganizations(userId: string) {
  return await prisma.organizationMember.findMany({
    where: { userId },
    include: {
      organization: true,
    },
  })
}

export async function requireOrganizationAccess(organizationId: string) {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const membership = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
    include: {
      organization: true,
    },
  })

  if (!membership) {
    redirect('/unauthorized')
  }

  return membership
}

export async function hasOrganizationRole(
  userId: string,
  organizationId: string,
  requiredRole: 'admin' | 'pastor' | 'tech_director' | 'media_team' | 'volunteer'
) {
  const membership = await prisma.organizationMember.findUnique({
    where: {
      organizationId_userId: {
        organizationId,
        userId,
      },
    },
  })

  if (!membership) return false

  const roleHierarchy = {
    admin: 5,
    pastor: 4,
    tech_director: 3,
    media_team: 2,
    volunteer: 1,
  }

  return roleHierarchy[membership.role as keyof typeof roleHierarchy] >= roleHierarchy[requiredRole]
}
