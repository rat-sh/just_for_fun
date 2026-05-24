'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Users, Mic, MicOff, Video, VideoOff, Share2, Send, Phone, Loader } from 'lucide-react'

interface RoomPageProps {
  params: {
    code: string
  }
}

interface Message {
  id: number
  user: string
  message: string
  timestamp: Date
}

export default function RoomPage({ params }: RoomPageProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load messages on mount
  useEffect(() => {
    loadMessages()
    // Simulate real-time updates
    const interval = setInterval(loadMessages, 3000)
    return () => clearInterval(interval)
  }, [params.code])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadMessages = async () => {
    try {
      const response = await fetch(`/api/rooms/${params.code}/messages`)
      if (!response.ok) throw new Error('Failed to load messages')
      const data = await response.json()
      setMessages(data.messages)
      setLoading(false)
    } catch (err) {
      console.error('[v0] Error loading messages:', err)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      setSending(true)
      const response = await fetch(`/api/rooms/${params.code}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: 'You',
          message: newMessage,
          userId: 'current_user',
        }),
      })
      if (!response.ok) throw new Error('Failed to send message')
      const newMsg = await response.json()
      setMessages([...messages, newMsg])
      setNewMessage('')
    } catch (err) {
      console.error('[v0] Error sending message:', err)
    } finally {
      setSending(false)
    }
  }

  const participants = [
    { id: 1, name: 'You', isAudio: !isMuted, isVideo: isVideoOn },
    { id: 2, name: 'Alex Chen', isAudio: true, isVideo: true },
    { id: 3, name: 'Jordan Smith', isAudio: true, isVideo: false },
    { id: 4, name: 'Taylor Brown', isAudio: false, isVideo: true },
  ]

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Video Grid */}
      <div className="flex-1 grid grid-cols-2 gap-4 auto-rows-max">
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="relative rounded-lg overflow-hidden aspect-video"
            style={{
              backgroundColor: 'hsl(var(--input))',
            }}
          >
            {/* Video Placeholder */}
            <div className="w-full h-full flex items-center justify-center">
              {participant.isVideo ? (
                <div className="text-center">
                  <Video size={32} className="mx-auto mb-2" style={{ color: 'hsl(var(--primary))' }} />
                  <p className="text-sm">{participant.name}</p>
                </div>
              ) : (
                <div className="text-center">
                  <Users size={32} className="mx-auto mb-2" style={{ color: 'hsl(var(--muted-foreground))' }} />
                  <p className="text-sm">{participant.name}</p>
                </div>
              )}
            </div>

            {/* Status Indicators */}
            <div className="absolute top-2 right-2 flex gap-1">
              {participant.isAudio ? (
                <div className="p-1 rounded-full" style={{ backgroundColor: 'hsl(var(--primary))' }}>
                  <Mic size={14} className="text-white" />
                </div>
              ) : (
                <div className="p-1 rounded-full bg-red-600">
                  <MicOff size={14} className="text-white" />
                </div>
              )}
            </div>

            {/* Name Badge */}
            <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <p className="text-xs font-semibold text-white">{participant.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        {/* Chat Panel */}
        <Card className="flex-1">
          <CardHeader>
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Users size={20} />
              Chat
            </h2>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 max-h-64">
            <div className="flex-1 overflow-auto space-y-2">
              {loading ? (
                <div className="flex items-center justify-center py-4 gap-2">
                  <Loader size={16} className="animate-spin" />
                  <span className="text-sm">Loading messages...</span>
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center py-4" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  <p className="text-sm">No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="p-2 rounded-lg" style={{ backgroundColor: 'hsl(var(--input))' }}>
                    <p className="font-semibold text-sm">{msg.user}</p>
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={sending}
                className="flex-1"
              />
              <Button variant="primary" size="sm" disabled={sending}>
                {sending ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
              </Button>
            </form>
          </CardBody>
        </Card>

        {/* Controls */}
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => setIsMuted(!isMuted)}
            variant={isMuted ? 'secondary' : 'primary'}
            size="lg"
            className="p-4"
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </Button>
          <Button
            onClick={() => setIsVideoOn(!isVideoOn)}
            variant={isVideoOn ? 'primary' : 'secondary'}
            size="lg"
            className="p-4"
          >
            {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
          </Button>
          <Button variant="secondary" size="lg" className="p-4">
            <Share2 size={24} />
          </Button>
          <Button variant="secondary" size="lg" className="p-4 text-red-500">
            <Phone size={24} />
          </Button>
        </div>
      </div>
    </div>
  )
}

