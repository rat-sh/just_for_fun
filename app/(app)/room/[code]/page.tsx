'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Video, VideoOff, Send, Phone, Loader, MoreVertical } from 'lucide-react'

interface RoomPageProps {
  params: Promise<{
    code: string
  }>
}

interface Message {
  _id?: string
  username: string
  message: string
  timestamp: Date
}

export default function RoomPage({ params }: RoomPageProps) {
  const [roomCode, setRoomCode] = useState('')
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Unwrap params promise
  useEffect(() => {
    params.then(p => setRoomCode(p.code))
  }, [params])

  // Load messages on mount
  useEffect(() => {
    if (!roomCode) return
    loadMessages()
    const interval = setInterval(loadMessages, 2000)
    return () => clearInterval(interval)
  }, [roomCode])

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadMessages = async () => {
    try {
      const response = await fetch(`/api/rooms/${roomCode}/messages`)
      if (!response.ok) throw new Error('Failed to load messages')
      const data = await response.json()
      setMessages(data.messages || [])
      setLoading(false)
    } catch (err) {
      console.error('[v0] Error loading messages:', err)
      setLoading(false)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      setSending(true)
      const response = await fetch(`/api/rooms/${roomCode}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'You',
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
    { id: 1, name: 'You', isAudio: !isMuted, isVideo: isVideoOn, online: true },
    { id: 2, name: 'Alex', isAudio: true, isVideo: true, online: true },
    { id: 3, name: 'Jordan', isAudio: true, isVideo: false, online: true },
    { id: 4, name: 'Taylor', isAudio: false, isVideo: true, online: false },
  ]

  const formatTime = (date: Date | string) => {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
      {/* Header */}
      <div className="border-b border-[hsl(var(--border))] px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Study Room</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">{roomCode}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[hsl(var(--muted-foreground))]">{participants.length} participants</span>
          <button className="p-2 rounded-lg hover:bg-[hsl(var(--input))] transition-all">
            <MoreVertical size={20} className="text-[hsl(var(--muted-foreground))]" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 p-4 overflow-hidden">
        {/* Video Grid */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 flex-1">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="relative rounded-lg bg-[hsl(var(--input))] overflow-hidden flex items-center justify-center"
              >
                {/* Video Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {participant.isVideo ? (
                    <div className="text-center">
                      <Video size={40} className="mx-auto mb-2 text-[hsl(var(--muted-foreground))]" />
                      <p className="text-sm font-medium">{participant.name}</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-[hsl(var(--border))] mx-auto mb-2 flex items-center justify-center">
                        <span className="text-xl font-semibold">{participant.name[0]}</span>
                      </div>
                      <p className="text-sm font-medium">{participant.name}</p>
                    </div>
                  )}
                </div>

                {/* Status Indicators */}
                <div className="absolute top-3 right-3 flex gap-2">
                  {participant.isAudio ? (
                    <div className="p-1.5 rounded-full bg-[hsl(var(--primary))]">
                      <Mic size={12} className="text-white" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-full bg-red-500">
                      <MicOff size={12} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Online Status */}
                <div className="absolute top-3 left-3">
                  <div className={`w-2 h-2 rounded-full ${participant.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 bg-[hsl(var(--card))] rounded-lg p-4 border border-[hsl(var(--border))]">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-3 rounded-lg transition-all ${
                isMuted 
                  ? 'bg-red-500/10 text-red-500' 
                  : 'bg-[hsl(var(--input))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--border))]'
              }`}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-lg transition-all ${
                !isVideoOn 
                  ? 'bg-red-500/10 text-red-500' 
                  : 'bg-[hsl(var(--input))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--border))]'
              }`}
              title={isVideoOn ? 'Stop video' : 'Start video'}
            >
              {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
            </button>

            <div className="h-6 w-px bg-[hsl(var(--border))]"></div>

            <button
              className="p-3 rounded-lg bg-[hsl(var(--input))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--border))] transition-all"
              title="Screen share"
            >
              <Video size={20} />
            </button>

            <button
              className="p-3 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all ml-auto"
              title="Leave call"
            >
              <Phone size={20} />
            </button>
          </div>
        </div>

        {/* Chat Panel */}
        <div className="w-80 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="border-b border-[hsl(var(--border))] px-4 py-3">
            <h2 className="font-semibold">Chat</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {loading ? (
              <div className="flex items-center justify-center py-8 gap-2">
                <Loader size={16} className="animate-spin" />
                <span className="text-sm text-[hsl(var(--muted-foreground))]">Loading...</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-8 text-[hsl(var(--muted-foreground))]">
                <p className="text-sm">No messages yet</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-sm">{msg.username}</span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-[hsl(var(--foreground))] break-words">{msg.message}</p>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-[hsl(var(--border))] p-3 space-y-2">
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={sending}
                className="flex-1 px-3 py-2 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] text-sm focus:outline-none focus:ring-1"
              />
              <button
                type="submit"
                disabled={sending || !newMessage.trim()}
                className="p-2 rounded-lg bg-[hsl(var(--primary))] text-white hover:opacity-90 transition-all disabled:opacity-50"
              >
                {sending ? <Loader size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
