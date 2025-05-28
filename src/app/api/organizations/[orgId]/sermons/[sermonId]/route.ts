// app/api/organizations/[orgId]/sermons/[sermonId]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { requireOrganizationAccess, hasOrganizationRole } from '@/lib/db'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string; sermonId: string }> }
) {
  try {
    const { orgId, sermonId } = await params;
    await requireOrganizationAccess(orgId);

    const sermon = await prisma.sermon.findUnique({
      where: { id: sermonId },
      include: {
        series: true,
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        assets: {
          include: {
            uploader: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        services: {
          select: {
            id: true,
            title: true,
            date: true,
            status: true,
          },
        },
      },
    })

    if (!sermon || sermon.organizationId !== orgId) {
      return NextResponse.json({ error: 'Sermon not found' }, { status: 404 })
    }

    return NextResponse.json({ sermon })
  } catch (error) {
    console.error('Error fetching sermon:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sermon' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string; sermonId: string }> }
) {
  try {
    const { orgId, sermonId } = await params;
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const hasAccess = await hasOrganizationRole(userId, orgId, 'media_team')
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

    const sermon = await prisma.sermon.update({
      where: { id: sermonId },
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
    console.error('Error updating sermon:', error)
    return NextResponse.json(
      { error: 'Failed to update sermon' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string; sermonId: string }> }
) {
  try {
    const { orgId, sermonId } = await params;
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const hasAccess = await hasOrganizationRole(userId, orgId, 'media_team')
    if (!hasAccess) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    }

    await prisma.sermon.delete({
      where: { id: sermonId },
    })

    return NextResponse.json({ message: 'Sermon deleted successfully' })
  } catch (error) {
    console.error('Error deleting sermon:', error)
    return NextResponse.json(
      { error: 'Failed to delete sermon' },
      { status: 500 }
    )
  }
}
