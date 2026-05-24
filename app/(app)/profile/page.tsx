'use client'

import React from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trophy, Star, Zap, Users, BookOpen, Target, Share2, Settings } from 'lucide-react'

export default function ProfilePage() {
  const user = {
    name: 'Alex Johnson',
    email: 'alex@studyroom.com',
    level: 15,
    xp: 12500,
    nextLevelXp: 15000,
    joinDate: 'March 2024',
    studyStreak: 45,
    totalStudyTime: 1250,
    roomsJoined: 12,
    interviewsCompleted: 23,
  }

  const achievements = [
    { id: 1, title: 'Code Master', description: 'Completed 10 interviews', icon: Trophy, unlocked: true, date: '2026-05-20' },
    { id: 2, title: 'Study Junkie', description: 'Maintained 7-day streak', icon: Zap, unlocked: true, date: '2026-04-15' },
    { id: 3, title: 'Team Player', description: 'Joined 5 study rooms', icon: Users, unlocked: true, date: '2026-04-10' },
    { id: 4, title: 'Early Bird', description: 'Complete 5 morning sessions', icon: Star, unlocked: false },
    { id: 5, title: 'Night Owl', description: 'Complete 5 evening sessions', icon: BookOpen, unlocked: false },
    { id: 6, title: 'Legendary', description: 'Reach level 50', icon: Target, unlocked: false },
  ]

  const getProgressPercentage = (current: number, max: number) => (current / max) * 100

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Profile Card */}
        <Card gradient="primary" className="md:col-span-1 p-6">
          <div className="text-center text-white">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
              style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
            >
              AJ
            </div>
            <h2 className="text-xl font-bold mb-1">{user.name}</h2>
            <p className="text-sm opacity-80 mb-3">{user.email}</p>
            <p className="text-xs opacity-70">Joined {user.joinDate}</p>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="md:col-span-2 grid grid-cols-3 gap-3">
          {[
            { label: 'Level', value: user.level, icon: Star },
            { label: 'Streak', value: `${user.studyStreak}d`, icon: Zap },
            { label: 'Study Time', value: `${user.totalStudyTime}h`, icon: BookOpen },
          ].map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardBody className="text-center py-4">
                  <Icon size={20} className="mx-auto mb-2" style={{ color: 'hsl(var(--primary))' }} />
                  <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardBody>
              </Card>
            )
          })}
        </div>
      </div>

      {/* XP Progress */}
      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Level Progress</h3>
            <span style={{ color: 'hsl(var(--primary))' }} className="font-bold">
              {user.xp} / {user.nextLevelXp} XP
            </span>
          </div>
          <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
              style={{ width: `${getProgressPercentage(user.xp, user.nextLevelXp)}%` }}
            />
          </div>
        </CardBody>
      </Card>

      {/* Achievements */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <Card
                key={achievement.id}
                gradient="none"
                className={achievement.unlocked ? '' : 'opacity-60'}
              >
                <CardBody className="flex items-start gap-4">
                  <div
                    className="p-3 rounded-lg flex-shrink-0"
                    style={{
                      backgroundColor: achievement.unlocked
                        ? 'hsl(var(--primary))'
                        : 'hsl(var(--input))',
                    }}
                  >
                    <Icon
                      size={24}
                      style={{
                        color: achievement.unlocked
                          ? 'white'
                          : 'hsl(var(--muted-foreground))',
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{achievement.title}</h3>
                      {achievement.unlocked && (
                        <Badge className="bg-yellow-600 text-white text-xs">
                          ✓ Unlocked
                        </Badge>
                      )}
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: 'hsl(var(--muted-foreground))' }}
                    >
                      {achievement.description}
                    </p>
                    {achievement.unlocked && achievement.date && (
                      <p className="text-xs mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </CardBody>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Stats */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Statistics</h2>
        <Card>
          <CardBody>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: 'Rooms Joined', value: user.roomsJoined },
                { label: 'Interviews', value: user.interviewsCompleted },
                { label: 'Study Sessions', value: 156 },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-sm mb-2"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  >
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="primary" size="lg" className="flex-1 flex items-center justify-center gap-2">
          <Share2 size={18} />
          Share Profile
        </Button>
        <Button variant="secondary" size="lg" className="flex-1 flex items-center justify-center gap-2">
          <Settings size={18} />
          Settings
        </Button>
      </div>
    </div>
  )
}
