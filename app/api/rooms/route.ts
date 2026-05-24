import { NextRequest, NextResponse } from 'next/server'

// Mock data - in production this would query Supabase
const rooms = [
  { id: 1, code: 'data-101', name: 'Data Structures 101', description: 'Learning arrays and linked lists', members: 5, maxMembers: 10, isPrivate: false, category: 'Computer Science', createdAt: new Date() },
  { id: 2, code: 'physics-qs', name: 'Physics Group Study', description: 'Quantum mechanics discussion', members: 3, maxMembers: 8, isPrivate: false, category: 'Physics', createdAt: new Date() },
  { id: 3, code: 'spanish-talk', name: 'Spanish Conversation', description: 'Practice conversational Spanish', members: 7, maxMembers: 12, isPrivate: false, category: 'Languages', createdAt: new Date() },
  { id: 4, code: 'math-olympiad', name: 'Math Olympiad Prep', description: 'Advanced calculus problems', members: 4, maxMembers: 6, isPrivate: true, category: 'Mathematics', createdAt: new Date() },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')?.toLowerCase()
    
    let filteredRooms = rooms
    if (search) {
      filteredRooms = rooms.filter(r => 
        r.name.toLowerCase().includes(search) || 
        r.category.toLowerCase().includes(search)
      )
    }
    
    return NextResponse.json({ rooms: filteredRooms })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newRoom = {
      id: rooms.length + 1,
      code: body.code || 'room_' + Math.random().toString(36).substr(2, 9),
      name: body.name,
      description: body.description,
      members: 1,
      maxMembers: body.maxMembers || 10,
      isPrivate: body.isPrivate || false,
      category: body.category || 'Study',
      createdAt: new Date(),
    }
    rooms.push(newRoom)
    return NextResponse.json(newRoom, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 })
  }
}
