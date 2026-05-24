'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Settings, Home, Gamepad2, BookOpen, CheckSquare, Users, LogOut, Bell, User } from 'lucide-react'

interface AppLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: Home },
    { label: 'Rooms', href: '/lobby', icon: Users },
    { label: 'Games', href: '/games', icon: Gamepad2 },
    { label: 'Interviews', href: '/interviews', icon: BookOpen },
    { label: 'Todos', href: '/todos', icon: CheckSquare },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <div className="flex h-screen" style={{ backgroundColor: 'hsl(var(--background))' }}>
      {/* Sidebar */}
      <aside
        className={`transform transition-all duration-300 border-r ${
          sidebarOpen ? 'w-64' : 'w-0'
        }`}
        style={{
          backgroundColor: 'hsl(var(--card))',
          borderColor: 'hsl(var(--border))',
        }}
      >
        <div className="flex h-full flex-col p-4 overflow-hidden">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">
              <span className="gradient-primary bg-clip-text text-transparent">Study</span>
              <span className="gradient-secondary ml-2 bg-clip-text text-transparent">Room</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-all ${
                    active
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                  style={{
                    backgroundColor: active ? 'hsl(var(--primary))' : undefined,
                    color: active ? 'white' : 'hsl(var(--muted-foreground))',
                  }}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="space-y-2 border-t pt-4" style={{ borderColor: 'hsl(var(--border))' }}>
            <Link href="/notifications">
              <button
                className="flex w-full items-center gap-3 rounded-lg px-4 py-2 transition-all hover:bg-gray-800"
                style={{
                  color: 'hsl(var(--muted-foreground))',
                }}
              >
                <Bell size={20} />
                <span>Notifications</span>
              </button>
            </Link>
            <Link href="/profile">
              <button
                className="flex w-full items-center gap-3 rounded-lg px-4 py-2 transition-all hover:bg-gray-800"
                style={{
                  color: 'hsl(var(--muted-foreground))',
                }}
              >
                <User size={20} />
                <span>Profile</span>
              </button>
            </Link>
            <button
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2 transition-all"
              style={{
                color: 'hsl(var(--muted-foreground))',
              }}
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
            <button
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2 transition-all text-red-500 hover:bg-red-600/10"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header
          className="border-b px-6 py-4 flex items-center gap-4"
          style={{
            backgroundColor: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))',
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg transition-all hover:bg-gray-800"
            style={{
              backgroundColor: sidebarOpen ? undefined : 'hsl(var(--input))',
            }}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-xl font-semibold flex-1">StudyRoom</h1>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
