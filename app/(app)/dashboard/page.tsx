'use client'

import React from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, Zap, Users, BookOpen, CheckSquare, Play } from 'lucide-react'

export default function DashboardPage() {
  // Mock data
  const userStats = {
    level: 5,
    xp: 2450,
    nextLevelXp: 5000,
    studyStreak: 12,
    roomsJoined: 3,
  }

  const recentActivities = [
    { id: 1, title: 'Completed Algorithm Study', time: '2 hours ago', icon: Trophy },
    { id: 2, title: 'Joined Physics Room', time: '5 hours ago', icon: Users },
    { id: 3, title: 'Finished Todo List', time: '1 day ago', icon: CheckSquare },
  ]

  const quickActions = [
    { title: 'Create Room', description: 'Start a new study session', icon: Users, color: 'gradient-primary' },
    { title: 'Join Room', description: 'Enter with room code', icon: Play, color: 'gradient-secondary' },
    { title: 'Start Interview', description: 'Practice coding interview', icon: BookOpen, color: 'gradient-accent' },
    { title: 'My Todos', description: 'View your task list', icon: CheckSquare, color: 'gradient-success' },
  ]

  const getProgressPercentage = (current: number, max: number) => (current / max) * 100

  return (
    <div className="space-y-8">
      {/* Header with User Stats */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        {/* Level and Progress Card */}
        <Card gradient="primary" className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Current Level</p>
              <h2 className="text-4xl font-bold text-white">{userStats.level}</h2>
              <p className="text-sm opacity-75 mt-1">
                {userStats.xp} / {userStats.nextLevelXp} XP
              </p>
            </div>
            <div className="text-5xl font-bold text-white opacity-20">⭐</div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2 rounded-full transition-all"
              style={{ width: `${getProgressPercentage(userStats.xp, userStats.nextLevelXp)}%` }}
            />
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Study Streak', value: userStats.studyStreak, suffix: 'days', icon: Zap },
            { label: 'Rooms Joined', value: userStats.roomsJoined, icon: Users },
            { label: 'Achievements', value: 8, icon: Trophy },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} gradient="none">
                <CardBody className="flex items-center justify-between">
                  <div>
                    <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">
                      {stat.value}
                      {stat.suffix && <span className="text-sm ml-1">{stat.suffix}</span>}
                    </p>
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
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Card key={action.title} gradient={action.color as any} className="p-6 cursor-pointer hover:shadow-lg transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-white mb-1">{action.title}</h3>
                    <p className="text-sm text-white opacity-80">{action.description}</p>
                  </div>
                  <Icon className="text-white opacity-50" size={24} />
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <Card>
          <CardBody className="space-y-3">
            {recentActivities.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-center gap-4 pb-3 border-b last:border-b-0" style={{ borderColor: 'hsl(var(--border))' }}>
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: 'hsl(var(--input))' }}
                  >
                    <Icon size={20} style={{ color: 'hsl(var(--primary))' }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
