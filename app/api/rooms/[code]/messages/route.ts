import { NextRequest, NextResponse } from 'next/server'
import { getRoomMessages, saveMessage } from '@/lib/mongodb'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params
    const messages = await getRoomMessages(code, 100)
    return NextResponse.json({ messages })
  } catch (error) {
    console.error('[v0] Error fetching messages:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params
    const body = await request.json()

    const message = await saveMessage({
      roomId: code,
      userId: body.userId || 'anonymous',
      username: body.username || 'Guest',
      message: body.message,
      timestamp: new Date(),
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('[v0] Error sending message:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
