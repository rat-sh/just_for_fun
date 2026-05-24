'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, MessageSquare, Users, Trophy, X, CheckCircle } from 'lucide-react'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      title: 'New message from Alex',
      message: 'Hey, ready for the study session?',
      timestamp: new Date(Date.now() - 300000),
      read: false,
      actionUrl: '/room/data-101',
    },
    {
      id: 2,
      type: 'room',
      title: 'Physics Group Study started',
      message: 'A study room you joined has started',
      timestamp: new Date(Date.now() - 900000),
      read: false,
      actionUrl: '/room/physics-qs',
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'You completed 10 interviews - "Code Master"',
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
    {
      id: 4,
      type: 'group',
      title: 'Jordan joined your room',
      message: 'Jordan Smith has joined Data Structures 101',
      timestamp: new Date(Date.now() - 7200000),
      read: true,
      actionUrl: '/room/data-101',
    },
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare size={20} className="text-blue-500" />
      case 'room':
        return <Users size={20} className="text-purple-500" />
      case 'achievement':
        return <Trophy size={20} className="text-yellow-500" />
      case 'group':
        return <Users size={20} className="text-green-500" />
      default:
        return <Bell size={20} />
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="bg-red-600 text-white">
              {unreadCount} unread
            </Badge>
          )}
        </div>
        <p style={{ color: 'hsl(var(--muted-foreground))' }}>
          Stay updated with messages, rooms, and achievements
        </p>
      </div>

      {notifications.length === 0 ? (
        <Card>
          <CardBody className="text-center py-12">
            <Bell size={32} className="mx-auto mb-3" style={{ color: 'hsl(var(--muted-foreground))' }} />
            <p style={{ color: 'hsl(var(--muted-foreground))' }}>
              You&apos;re all caught up!
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              gradient="none"
              className={`${!notification.read ? 'border-l-4' : ''}`}
              style={{
                borderLeftColor: !notification.read ? 'hsl(var(--primary))' : undefined,
              }}
            >
              <CardBody className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold">{notification.title}</h3>
                    {!notification.read && (
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                        style={{ backgroundColor: 'hsl(var(--primary))' }}
                      />
                    )}
                  </div>
                  <p
                    className="text-sm mb-2"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  >
                    {notification.message}
                  </p>
                  <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {formatTime(notification.timestamp)}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {notification.actionUrl && (
                    <Button variant="primary" size="sm">
                      View
                    </Button>
                  )}
                  {!notification.read && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                      className="flex items-center gap-1"
                    >
                      <CheckCircle size={14} />
                    </Button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1 rounded-lg transition-all hover:bg-red-600/10"
                  >
                    <X size={16} className="text-red-600" />
                  </button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
