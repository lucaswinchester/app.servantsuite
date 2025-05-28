// app/api/webhooks/clerk/route.ts
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { prisma } from '@/lib/prisma'
import { WebhookEvent } from '@clerk/nextjs/server'
import { UserJSON } from '@clerk/nextjs/server'

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headerPayload = await headers()
  const svixId = headerPayload.get('svix-id')
  const svixTimestamp = headerPayload.get('svix-timestamp')
  const svixSignature = headerPayload.get('svix-signature')

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new NextResponse('Error occurred -- no svix headers', {
      status: 400,
    })
  }

  const wh = new Webhook(webhookSecret)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new NextResponse('Error occurred', { status: 400 })
  }

  const eventType = evt.type
  const { id, email_addresses, first_name, last_name, image_url } = evt.data as UserJSON

  try {
    switch (eventType) {
      case 'user.created':
        await prisma.user.create({
          data: {
            id,
            email: email_addresses[0]?.email_address,
            firstName: first_name,
            lastName: last_name,
            profileImageUrl: image_url,
            lastSignInAt: new Date(),
          },
        })
        break

      case 'user.updated':
        await prisma.user.update({
          where: { id },
          data: {
            email: email_addresses[0]?.email_address,
            firstName: first_name,
            lastName: last_name,
            profileImageUrl: image_url,
          },
        })
        break

      case 'user.deleted':
        await prisma.user.delete({
          where: { id },
        })
        break

      default:
        console.log(`Unhandled event type: ${eventType}`)
    }

    return new NextResponse('Webhook processed successfully', { status: 200 })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return new NextResponse('Error processing webhook', { status: 500 })
  }
}
