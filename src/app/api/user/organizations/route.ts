// app/api/user/organizations/route.ts
import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('Fetching user organizations...')
    
    // Get user ID from Clerk
    const authData = await auth()
    console.log('Auth data:', { userId: authData.userId })
    
    if (!authData.userId) {
      console.error('No user ID found in session')
      return NextResponse.json(
        { error: 'Unauthorized - No user session' }, 
        { status: 401 }
      )
    }

    // Check database connection
    try {
      await prisma.$connect()
      console.log('Database connection successful')
    } catch (dbError) {
      console.error('Database connection error:', dbError)
      return NextResponse.json(
        { error: 'Database connection error' },
        { status: 500 }
      )
    }

    // Fetch organizations
    const organizations = await prisma.organizationMember.findMany({
      where: { 
        userId: authData.userId 
      },
      include: {
        organization: true,
      },
    })

    console.log(`Found ${organizations.length} organizations for user`)
    return NextResponse.json({ organizations })
    
  } catch (error) {
    console.error('Error in GET /api/user/organizations:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch organizations',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
