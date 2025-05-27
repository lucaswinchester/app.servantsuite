// app/api/organizations/[orgId]/stats/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { requireOrganizationAccess } from '@/lib/db'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    await requireOrganizationAccess(params.orgId)

    const [totalSermons, upcomingServices, pendingTasks, totalAssets] = await Promise.all([
      prisma.sermon.count({
        where: { organizationId: params.orgId },
      }),
      prisma.service.count({
        where: {
          organizationId: params.orgId,
          date: { gte: new Date() },
        },
      }),
      prisma.task.count({
        where: {
          organizationId: params.orgId,
          status: { in: ['todo', 'in_progress'] },
        },
      }),
      prisma.asset.count({
        where: { organizationId: params.orgId },
      }),
    ])

    return NextResponse.json({
      stats: {
        totalSermons,
        upcomingServices,
        pendingTasks,
        totalAssets,
      },
    })
  } catch (error) {
    console.error('Error fetching organization stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
