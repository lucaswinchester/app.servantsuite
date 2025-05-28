// app/api/organizations/[orgId]/series/route.ts
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
    await requireOrganizationAccess(orgId);

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status')
    const limit = searchParams.get('limit')

    const where: Prisma.SeriesWhereInput = { organizationId: orgId }
    if (status) {
      where.status = status
    }

    const series = await prisma.series.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        _count: {
          select: {
            sermons: true,
          },
        },
      },
      orderBy: [
        { sortOrder: 'asc' },
        { startDate: 'desc' },
      ],
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ series })
  } catch (error) {
    console.error('Error fetching series:', error)
    return NextResponse.json(
      { error: 'Failed to fetch series' },
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
    const { title, slug, description, imageUrl, startDate, endDate, status, sortOrder, metadata } = body

    const series = await prisma.series.create({
      data: {
        title,
        slug,
        description,
        imageUrl,
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        status,
        sortOrder,
        metadata,
        organizationId: orgId,
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
      },
    })

    return NextResponse.json({ series })
  } catch (error) {
    console.error('Error creating series:', error)
    return NextResponse.json(
      { error: 'Failed to create series' },
      { status: 500 }
    )
  }
}
