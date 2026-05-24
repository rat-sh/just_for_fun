import { NextRequest, NextResponse } from 'next/server'

// Mock data - in production this would query Supabase
const todos = [
  { id: 1, title: 'Review Data Structures', completed: true, priority: 'high', dueDate: '2026-05-25', category: 'Study' },
  { id: 2, title: 'Complete Interview Practice', completed: false, priority: 'high', dueDate: '2026-05-24', category: 'Interview' },
  { id: 3, title: 'Read Chapter 5', completed: false, priority: 'medium', dueDate: '2026-05-26', category: 'Study' },
  { id: 4, title: 'Group Study Session', completed: false, priority: 'low', dueDate: '2026-05-27', category: 'Group' },
  { id: 5, title: 'Fix Assignment Bugs', completed: true, priority: 'high', dueDate: '2026-05-20', category: 'Work' },
]

export async function GET(request: NextRequest) {
  try {
    // In production: const { data } = await supabase.from('todos').select('*')
    return NextResponse.json({ todos })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const newTodo = {
      id: todos.length + 1,
      title: body.title,
      completed: false,
      priority: body.priority || 'medium',
      dueDate: body.dueDate,
      category: body.category || 'Study',
    }
    todos.push(newTodo)
    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create todo' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const todo = todos.find(t => t.id === body.id)
    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }
    Object.assign(todo, body)
    return NextResponse.json(todo)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get('id') || '')
    const index = todos.findIndex(t => t.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 })
    }
    todos.splice(index, 1)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 })
  }
}
