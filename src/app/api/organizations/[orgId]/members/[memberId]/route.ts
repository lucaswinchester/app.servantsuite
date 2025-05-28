// app/api/organizations/[orgId]/members/[memberId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { hasOrganizationRole } from '@/lib/db';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string; memberId: string }> }
) {
  try {
    const { orgId, memberId } = await params;
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const hasAccess = await hasOrganizationRole(userId, orgId, 'admin');
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { role, permissions } = body;

    const member = await prisma.organizationMember.update({
      where: { id: memberId },
      data: {
        role,
        permissions,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            profileImageUrl: true,
          },
        },
      },
    });

    return NextResponse.json({ member });
  } catch (error) {
    console.error('Error updating organization member:', error);
    return NextResponse.json(
      { error: 'Failed to update member' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ orgId: string; memberId: string }> }
) {
  try {
    const { orgId, memberId } = await params;
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const hasAccess = await hasOrganizationRole(userId, orgId, 'admin');
    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    await prisma.organizationMember.delete({
      where: { id: memberId },
    });

    return NextResponse.json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Error removing organization member:', error);
    return NextResponse.json(
      { error: 'Failed to remove member' },
      { status: 500 }
    );
  }
}
