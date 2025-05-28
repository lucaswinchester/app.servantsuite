// app/api/organizations/[orgId]/series/[seriesId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { requireOrganizationAccess, hasOrganizationRole } from '@/lib/db'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string; seriesId: string }> }
) {
  try {
    const { orgId, seriesId } = await params;
    await requireOrganizationAccess(orgId);

    const series = await prisma.series.findUnique({
      where: { id: seriesId },
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        sermons: {
          include: {
            creator: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
          orderBy: {
            date: 'asc',
          },
        },
      },
    })

    if (!series || series.organizationId !== orgId) {
      return NextResponse.json({ error: 'Series not found' }, { status: 404 })
    }

    return NextResponse.json({ series })
  } catch (error) {
    console.error('Error fetching series:', error)
    return NextResponse.json(
      { error: 'Failed to fetch series' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string; seriesId: string }> }
) {
  try {
    const { orgId, seriesId } = await params;
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

    const series = await prisma.series.update({
      where: { id: seriesId },
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
    console.error('Error updating series:', error)
    return NextResponse.json(
      { error: 'Failed to update series' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string; seriesId: string }> }
) {
  try {
    const { orgId, seriesId } = await params;
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const hasAccess = await hasOrganizationRole(userId, orgId, 'tech_director')
    if (!hasAccess) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    await prisma.series.delete({
      where: { id: seriesId },
    })

    return NextResponse.json({ message: 'Series deleted successfully' })
  } catch (error) {
    console.error('Error deleting series:', error)
    return NextResponse.json(
      { error: 'Failed to delete series' },
      { status: 500 }
    )
  }
}
