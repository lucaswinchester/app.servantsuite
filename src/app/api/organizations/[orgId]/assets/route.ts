// app/api/organizations/[orgId]/assets/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { requireOrganizationAccess, hasOrganizationRole } from '@/lib/db'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { AssetType } from '@prisma/client'
import { Prisma } from '@prisma/client'

export async function GET(
  req: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    await requireOrganizationAccess(params.orgId)

    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const sermonId = searchParams.get('sermonId')
    const seriesId = searchParams.get('seriesId')
    const limit = searchParams.get('limit')
    const search = searchParams.get('search')
    
    const where: Prisma.AssetWhereInput = {
      organizationId: params.orgId,
    };    
    if (type) {
      where.type = type as AssetType
    }
    
    if (sermonId) {
      where.sermonId = sermonId
    }
    
    if (seriesId) {
      where.seriesId = seriesId
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ]
    }

    const assets = await prisma.asset.findMany({
      where,
      include: {
        uploader: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        sermon: {
          select: {
            id: true,
            title: true,
          },
        },
        series: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit ? parseInt(limit) : undefined,
    })

    return NextResponse.json({ assets })
  } catch (error) {
    console.error('Error fetching assets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch assets' },
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
      name,
      description,
      type,
      fileUrl,
      fileSize,
      mimeType,
      durationSeconds,
      dimensions,
      tags,
      altText,
      usageNotes,
      version,
      isPublic,
      accessLevel,
      sermonId,
      seriesId,
    } = body

    const asset = await prisma.asset.create({
      data: {
        name,
        description,
        type,
        fileUrl,
        fileSize,
        mimeType,
        durationSeconds,
        dimensions,
        tags,
        altText,
        usageNotes,
        version,
        isPublic,
        accessLevel,
        sermonId,
        seriesId,
        organizationId: params.orgId,
        uploadedBy: userId,
      },
      include: {
        uploader: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        sermon: {
          select: {
            id: true,
            title: true,
          },
        },
        series: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    return NextResponse.json({ asset })
  } catch (error) {
    console.error('Error creating asset:', error)
    return NextResponse.json(
      { error: 'Failed to create asset' },
      { status: 500 }
    )
  }
}
