'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CheckSquare, Plus, Trash2, Flag, Loader } from 'lucide-react'

interface Todo {
  id: number
  title: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  dueDate: string
  category: string
}

export default function TodosPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load todos on mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/todos')
      if (!response.ok) throw new Error('Failed to fetch todos')
      const data = await response.json()
      setTodos(data.todos)
    } catch (err) {
      setError('Failed to load todos')
      console.error('[v0] Error fetching todos:', err)
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTodo,
          category: 'Study',
          priority: 'medium',
          dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        }),
      })
      if (!response.ok) throw new Error('Failed to add todo')
      const newItem = await response.json()
      setTodos([...todos, newItem])
      setNewTodo('')
    } catch (err) {
      console.error('[v0] Error adding todo:', err)
      setError('Failed to add todo')
    }
  }

  const toggleTodo = async (id: number, completed: boolean) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, completed: !completed }),
      })
      if (!response.ok) throw new Error('Failed to update todo')
      setTodos(todos.map(t => t.id === id ? { ...t, completed: !completed } : t))
    } catch (err) {
      console.error('[v0] Error toggling todo:', err)
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos?id=${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete todo')
      setTodos(todos.filter(t => t.id !== id))
    } catch (err) {
      console.error('[v0] Error deleting todo:', err)
    }
  }

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'bg-red-600'
    if (priority === 'medium') return 'bg-yellow-600'
    return 'bg-green-600'
  }

  const completedCount = todos.filter(t => t.completed).length
  const totalCount = todos.length
  const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Todo List</h1>
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>
          Track your tasks and stay productive
        </p>
      </div>

      {/* Progress */}
      <Card>
        <CardBody className="flex items-center justify-between">
          <div>
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Overall Progress</p>
            <p className="text-2xl font-bold">{completedCount} of {totalCount} tasks completed</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold" style={{ color: 'hsl(var(--primary))' }}>
              {Math.round(completionPercentage)}%
            </p>
          </div>
        </CardBody>
      </Card>

      {/* Add New Todo */}
      <form onSubmit={addTodo} className="flex gap-2">
        <Input
          icon={<Plus size={18} />}
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1"
        />
        <Button variant="primary" size="lg">
          Add Task
        </Button>
      </form>

      {error && (
        <div className="rounded-lg bg-red-600/10 p-3 text-sm text-red-600 border border-red-500/30">
          {error}
        </div>
      )}

      {/* Todos List */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Your Tasks</h2>
        </CardHeader>
        <CardBody className="space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-8 gap-2">
              <Loader size={20} className="animate-spin" />
              <span>Loading todos...</span>
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-8" style={{ color: 'hsl(var(--muted-foreground))' }}>
              <p>No todos yet. Create one to get started!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-4 p-3 rounded-lg border transition-all hover:opacity-80"
                style={{
                  backgroundColor: todo.completed ? 'hsl(var(--input))/50' : 'hsl(var(--input))',
                  borderColor: 'hsl(var(--border))',
                }}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id, todo.completed)}
                  className="w-5 h-5 rounded cursor-pointer"
                />

                {/* Task Info */}
                <div className="flex-1">
                  <p
                    className={`font-medium ${todo.completed ? 'line-through opacity-50' : ''}`}
                  >
                    {todo.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    <Badge className="text-xs">{todo.category}</Badge>
                    <span>Due: {new Date(todo.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>

                {/* Priority */}
                <div
                  className={`p-2 rounded-lg flex items-center gap-1 ${getPriorityColor(todo.priority)} text-white`}
                >
                  <Flag size={14} />
                  <span className="text-xs font-semibold capitalize">{todo.priority}</span>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-2 rounded-lg transition-all hover:bg-red-600/10"
                >
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            ))
          )}
        </CardBody>
      </Card>
    </div>
  )
}
