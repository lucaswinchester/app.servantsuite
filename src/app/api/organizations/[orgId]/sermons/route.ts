// app/api/organizations/[orgId]/sermons/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { requireOrganizationAccess, hasOrganizationRole } from '@/lib/db'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'

export async function GET(
  req: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    await requireOrganizationAccess(params.orgId)

    const { searchParams } = new URL(req.url)
    const seriesId = searchParams.get('seriesId')
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')
    const search = searchParams.get('search')

    const where: Prisma.SermonWhereInput = { organizationId: params.orgId }
    
    if (seriesId) {
      where.seriesId = seriesId
    }
    
    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { speaker: { contains: search, mode: 'insensitive' } },
      ]
    }

    const sermons = await prisma.sermon.findMany({
      where,
      include: {
        series: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
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
            assets: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ sermons })
  } catch (error) {
    console.error('Error fetching sermons:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sermons' },
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

    const hasAccess = await hasOrganizationRole(userId, params.orgId, 'media_team')
    if (!hasAccess) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    const body = await req.json()
    const {
      title,
      slug,
      description,
      seriesId,
      scriptureReferences,
      speaker,
      date,
      durationMinutes,
      status,
      sortOrder,
      notes,
      tags,
      metadata,
    } = body

    const sermon = await prisma.sermon.create({
      data: {
        title,
        slug,
        description,
        seriesId,
        scriptureReferences,
        speaker,
        date: new Date(date),
        durationMinutes,
        status,
        sortOrder,
        notes,
        tags,
        metadata,
        organizationId: params.orgId,
        createdBy: userId,
      },
      include: {
        series: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
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

    return NextResponse.json({ sermon })
  } catch (error) {
    console.error('Error creating sermon:', error)
    return NextResponse.json(
      { error: 'Failed to create sermon' },
      { status: 500 }
    )
  }
}
