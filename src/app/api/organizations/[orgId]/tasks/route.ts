// app/api/organizations/[orgId]/tasks/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { requireOrganizationAccess, hasOrganizationRole } from '@/lib/db'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    await requireOrganizationAccess(params.orgId)

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const assignedTo = searchParams.get('assignedTo')
    const serviceId = searchParams.get('serviceId')
    const sermonId = searchParams.get('sermonId')
    const priority = searchParams.get('priority')
    const limit = searchParams.get('limit')

    const where: any = { organizationId: params.orgId }
    
    if (status) {
      where.status = status
    }
    
    if (assignedTo) {
      where.assignedTo = assignedTo
    }
    
    if (serviceId) {
      where.serviceId = serviceId
    }
    
    if (sermonId) {
      where.sermonId = sermonId
    }
    
    if (priority) {
      where.priority = priority
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
        assignee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        completer: {
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
        { createdAt: 'desc' },
      ],
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ tasks })
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const hasAccess = await hasOrganizationRole(userId, params.orgId, 'tech_director')
    if (!hasAccess) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const body = await req.json()
    const {
      title,
      description,
      priority,
      status,
      assignedTo,
      dueDate,
      serviceId,
      sermonId,
    } = body

    const task = await prisma.task.create({
      data: {
        title,
        description,
        priority,
        status,
        assignedTo,
        dueDate: dueDate ? new Date(dueDate) : null,
        serviceId,
        sermonId,
        organizationId: params.orgId,
        createdBy: userId,
      },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        assignee: {
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
    })

    return NextResponse.json({ task })
  } catch (error) {
    console.error('Error creating task:', error)
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    )
  }
}
