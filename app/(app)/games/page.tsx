'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Medal, Flame } from 'lucide-react'

export default function LeaderboardPage() {
  const [leaderboard] = useState([
    { rank: 1, name: 'Alex Chen', xp: 12500, level: 15, streak: 45, badges: 12 },
    { rank: 2, name: 'Jordan Smith', xp: 11200, level: 14, streak: 38, badges: 10 },
    { rank: 3, name: 'Taylor Brown', xp: 9800, level: 12, streak: 32, badges: 8 },
    { rank: 4, name: 'Casey Johnson', xp: 8900, level: 11, streak: 28, badges: 7 },
    { rank: 5, name: 'Morgan Williams', xp: 8100, level: 10, streak: 25, badges: 6 },
    { rank: 6, name: 'Riley Davis', xp: 7600, level: 9, streak: 20, badges: 5 },
  ])

  const getMedalColor = (rank: number) => {
    if (rank === 1) return '#FFD700' // Gold
    if (rank === 2) return '#C0C0C0' // Silver
    if (rank === 3) return '#CD7F32' // Bronze
    return 'hsl(var(--muted-foreground))'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>
          Top performers in the StudyRoom community
        </p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {leaderboard.slice(0, 3).map((user) => (
          <Card
            key={user.rank}
            gradient={
              user.rank === 1 ? 'primary' : user.rank === 2 ? 'secondary' : 'accent'
            }
            className="relative overflow-hidden"
          >
            <CardBody className="flex flex-col items-center gap-4 text-white">
              <div className="text-5xl font-bold opacity-20 absolute top-2 right-4">
                #{user.rank}
              </div>
              <Medal size={32} />
              <h3 className="font-bold text-lg">{user.name}</h3>
              <div className="text-3xl font-bold">{user.xp} XP</div>
              <div className="text-sm opacity-80">Level {user.level}</div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Top 10 Players</h2>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className="flex items-center gap-4 p-3 rounded-lg transition-all hover:opacity-80"
                style={{
                  backgroundColor: user.rank <= 3 ? 'hsl(var(--input))' : 'transparent',
                }}
              >
                {/* Rank */}
                <div
                  className="font-bold text-lg min-w-12 text-center"
                  style={{
                    color: getMedalColor(user.rank),
                  }}
                >
                  {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : `#${user.rank}`}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <p className="font-semibold">{user.name}</p>
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    <span>Level {user.level}</span>
                    <span>•</span>
                    <Flame size={14} /> {user.streak} day streak
                  </div>
                </div>

                {/* Badges */}
                <div className="flex gap-1">
                  {user.badges > 0 && (
                    <Badge className="bg-yellow-600 text-white">
                      {user.badges} 🏆
                    </Badge>
                  )}
                </div>

                {/* XP */}
                <div className="text-right min-w-24">
                  <p className="font-bold text-lg">{user.xp}</p>
                  <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>XP</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
