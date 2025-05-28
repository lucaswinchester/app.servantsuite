// app/api/organizations/[orgId]/activity/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { requireOrganizationAccess } from '@/lib/db'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { orgId: string } }
): Promise<NextResponse> {
  const { orgId } = params;
  try {
    await requireOrganizationAccess(orgId)

    const { searchParams } = new URL(request.url)
    const resourceType = searchParams.get('resourceType')
    const action = searchParams.get('action')
    const limit = searchParams.get('limit') || '50'

    interface OrganizationFilter {
      organizationId: string;
      resourceType?: string;
      action?: string;
    }
    
    const where: OrganizationFilter = {
      organizationId: orgId,
    };
        
    if (resourceType) {
      where.resourceType = resourceType
    }
    
    if (action) {
      where.action = action
    }

    const activities = await prisma.activityLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: parseInt(limit),
    })

    return NextResponse.json({ activities })
  } catch (error) {
    console.error('Error fetching activity logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activity logs' },
      { status: 500 }
    )
  }
}
