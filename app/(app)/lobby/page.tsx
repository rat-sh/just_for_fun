'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardHeader, CardBody } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Users, Plus, Search, Lock, Globe, Loader } from 'lucide-react'
import Link from 'next/link'

interface Room {
  id: number
  code: string
  name: string
  description: string
  members: number
  maxMembers: number
  isPrivate: boolean
  category: string
}

export default function LobbyPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRooms()
  }, [])

  const loadRooms = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/rooms')
      if (!response.ok) throw new Error('Failed to load rooms')
      const data = await response.json()
      setRooms(data.rooms)
    } catch (err) {
      console.error('[v0] Error loading rooms:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Study Rooms</h1>
        <Button variant="primary" size="lg" className="flex items-center gap-2">
          <Plus size={20} />
          Create Room
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <Input
          icon={<Search size={18} />}
          placeholder="Search rooms or categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-12 gap-2">
            <Loader size={20} className="animate-spin" />
            <span>Loading rooms...</span>
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="col-span-full text-center py-12" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <p>No rooms found matching your search.</p>
          </div>
        ) : (
          filteredRooms.map((room) => (
            <Card key={room.id} gradient="none">
              <CardBody className="flex flex-col gap-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg">{room.name}</h3>
                    {room.isPrivate ? (
                      <Lock size={18} style={{ color: 'hsl(var(--primary))' }} />
                    ) : (
                      <Globe size={18} style={{ color: 'hsl(var(--secondary))' }} />
                    )}
                  </div>
                  <p style={{ color: 'hsl(var(--muted-foreground))' }} className="text-sm mb-3">
                    {room.description}
                  </p>
                </div>

                <Badge className="w-fit">{room.category}</Badge>

                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
                  <div className="flex items-center gap-2">
                    <Users size={18} style={{ color: 'hsl(var(--secondary))' }} />
                    <span className="text-sm">
                      {room.members} / {room.maxMembers} members
                    </span>
                  </div>
                  <Link href={`/room/${room.code}`}>
                    <Button
                      variant="primary"
                      size="sm"
                    >
                      Join
                    </Button>
                  </Link>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
