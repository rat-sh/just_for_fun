import { NextRequest, NextResponse } from 'next/server'

// Mock data - in production this would query Supabase
const messages = [
  { id: 1, roomId: 'test-code', userId: 'user1', user: 'You', message: 'Hey everyone! Ready to study?', timestamp: new Date(Date.now() - 120000) },
  { id: 2, roomId: 'test-code', userId: 'user2', user: 'Alex Chen', message: 'Yes, let\'s get started!', timestamp: new Date(Date.now() - 60000) },
]

let messageId = 3

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params
    const roomMessages = messages.filter(m => m.roomId === code)
    return NextResponse.json({ messages: roomMessages })
  } catch (error) {
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
    const newMessage = {
      id: messageId++,
      roomId: code,
      userId: body.userId || 'user_' + Math.random(),
      user: body.user,
      message: body.message,
      timestamp: new Date(),
    }
    messages.push(newMessage)
    return NextResponse.json(newMessage, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
