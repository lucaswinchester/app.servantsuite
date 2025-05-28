// app/api/organizations/[orgId]/services/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { requireOrganizationAccess, hasOrganizationRole } from '@/lib/db'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const { orgId } = await params;
    await requireOrganizationAccess(orgId)

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const upcoming = searchParams.get('upcoming')
    const limit = searchParams.get('limit')

    const where: Prisma.ServiceWhereInput = { organizationId: orgId }
    
    if (status) {
      where.status = status
    }
    
    if (upcoming === 'true') {
      where.date = { gte: new Date() }
    }

    const services = await prisma.service.findMany({
      where,
      include: {
        sermon: {
          select: {
            id: true,
            title: true,
            speaker: true,
          },
        },
        template: {
          select: {
            id: true,
            name: true,
          },
        },
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        _count: {
          select: {
            tasks: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ services })
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const { orgId } = await params;
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const hasAccess = await hasOrganizationRole(userId, orgId, 'tech_director')
    if (!hasAccess) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const body = await req.json()
    const {
      title,
      date,
      time,
      type,
      location,
      sermonId,
      templateId,
      structure,
      techRequirements,
      staffAssignments,
      notes,
      status,
    } = body

    const service = await prisma.service.create({
      data: {
        title,
        date: new Date(date),
        time: time ? new Date(`1970-01-01T${time}`) : null,
        type,
        location,
        sermonId,
        templateId,
        structure,
        techRequirements,
        staffAssignments,
        notes,
        status,
        organizationId: orgId,
        createdBy: userId,
      },
      include: {
        sermon: {
          select: {
            id: true,
            title: true,
            speaker: true,
          },
        },
        template: {
          select: {
            id: true,
            name: true,
          },
        },
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    return NextResponse.json({ service })
  } catch (error) {
    console.error('Error creating service:', error)
    return NextResponse.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}
