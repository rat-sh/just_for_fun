'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, Zap, Play } from 'lucide-react'

export default function InterviewsPage() {
  const [interviews] = useState([
    { id: 1, title: 'Data Structures Fundamentals', difficulty: 'Easy', duration: 15, attempts: 3, passed: 1 },
    { id: 2, title: 'Binary Tree Traversal', difficulty: 'Medium', duration: 30, attempts: 5, passed: 2 },
    { id: 3, title: 'Dynamic Programming Patterns', difficulty: 'Hard', duration: 45, attempts: 0, passed: 0 },
    { id: 4, title: 'Graph Algorithms', difficulty: 'Medium', duration: 30, attempts: 2, passed: 1 },
    { id: 5, title: 'System Design Basics', difficulty: 'Hard', duration: 60, attempts: 1, passed: 0 },
    { id: 6, title: 'JavaScript Fundamentals', difficulty: 'Easy', duration: 15, attempts: 4, passed: 3 },
  ])

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Easy') return 'bg-green-600'
    if (difficulty === 'Medium') return 'bg-yellow-600'
    return 'bg-red-600'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Interview Preparation</h1>
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>
          Practice coding interviews and track your progress
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Attempts', value: 15, icon: Zap },
          { label: 'Passed', value: 7, icon: BookOpen },
          { label: 'Success Rate', value: '47%', icon: Clock },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label}>
              <CardBody className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: 'hsl(var(--primary))', color: 'white' }}
                >
                  <Icon size={24} />
                </div>
              </CardBody>
            </Card>
          )
        })}
      </div>

      {/* Interview List */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Available Interviews</h2>
        </CardHeader>
        <CardBody className="space-y-4">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="flex items-center justify-between p-4 rounded-lg border transition-all hover:opacity-80"
              style={{
                backgroundColor: 'hsl(var(--input))',
                borderColor: 'hsl(var(--border))',
              }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold">{interview.title}</h3>
                  <Badge className={`${getDifficultyColor(interview.difficulty)} text-white`}>
                    {interview.difficulty}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {interview.duration} mins
                  </span>
                  <span>
                    {interview.attempts} attempts • {interview.passed} passed
                  </span>
                </div>
              </div>
              <Button variant="primary" size="sm" className="flex items-center gap-2">
                <Play size={16} />
                Start
              </Button>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  )
}
