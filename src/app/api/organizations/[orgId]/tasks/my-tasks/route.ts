// app/api/organizations/[orgId]/tasks/my-tasks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { requireOrganizationAccess } from '@/lib/db'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(
  req: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await requireOrganizationAccess(params.orgId)

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')

    const where: Prisma.TaskWhereInput = {
      organizationId: params.orgId,
      assignedTo: userId,
    }
    
    if (status) {
      where.status = status
    } else {
      where.status = { in: ['todo', 'in_progress'] }
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        service: {
          select: {
            id: true,
            title: true,
            date: true,
          },
        },
        sermon: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: [
        { priority: 'desc' },
        { dueDate: 'asc' },
      ],
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error('Error fetching user tasks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}
