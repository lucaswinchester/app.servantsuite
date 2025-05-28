// app/api/organizations/[orgId]/announcements/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { requireOrganizationAccess, hasOrganizationRole } from '@/lib/db';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { Prisma } from '@prisma/client';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const { orgId } = await params;
    await requireOrganizationAccess(orgId);

    const { searchParams } = new URL(req.url);
    const priority = searchParams.get('priority');
    const pinned = searchParams.get('pinned');
    const limit = searchParams.get('limit');

    const where: Prisma.AnnouncementWhereInput = {
      organizationId: orgId,
      OR: [
        { expiresAt: null },
        { expiresAt: { gt: new Date() } },
      ],
    };

    if (priority) {
      where.priority = priority;
    }

    if (pinned === 'true') {
      where.isPinned = true;
    }

    const announcements = await prisma.announcement.findMany({
      where,
      include: {
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: [
        { isPinned: 'desc' },
        { priority: 'desc' },
        { createdAt: 'desc' },
      ],
      take: limit ? parseInt(limit) : undefined,
    });

    return NextResponse.json({ announcements });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return NextResponse.json(
      { error: 'Failed to fetch announcements' },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string }> }
) {
  try {
    const { orgId } = await params;
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const hasAccess = await hasOrganizationRole(userId, orgId, 'pastor');
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, content, priority, targetRoles, expiresAt, isPinned } = body;

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        priority,
        targetRoles,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isPinned,
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
    });

    return NextResponse.json({ announcement });
  } catch (error) {
    console.error('Error creating announcement:', error);
    return NextResponse.json(
      { error: 'Failed to create announcement' },
      { status: 500 }
    );
  }
}
