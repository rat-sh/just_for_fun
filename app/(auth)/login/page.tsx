'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, Loader } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Mock login - replace with Supabase
      await new Promise(r => setTimeout(r, 500))
      router.push('/dashboard')
    } catch (err) {
      setError('Login failed')
      console.error('[v0] Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))]">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-lg border bg-[hsl(var(--card))] p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="h-10 w-10 rounded-lg bg-[hsl(var(--primary))] mb-4"></div>
            <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
            <p className="text-[hsl(var(--muted-foreground))] text-sm">
              Sign in to continue your study sessions
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-1"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border bg-[hsl(var(--input))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-1"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[hsl(var(--primary))] text-white font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-[hsl(var(--border))]"></div>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">or</span>
            <div className="flex-1 h-px bg-[hsl(var(--border))]"></div>
          </div>

          {/* Alt Actions */}
          <div className="space-y-2">
            <button className="w-full py-2.5 rounded-lg border bg-white text-[hsl(var(--foreground))] font-medium hover:bg-[hsl(var(--input))] transition-all text-sm">
              Join with Room Code
            </button>
            <button className="w-full py-2.5 rounded-lg border bg-white text-[hsl(var(--foreground))] font-medium hover:bg-[hsl(var(--input))] transition-all text-sm">
              Browse Public Rooms
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm">
            <span className="text-[hsl(var(--muted-foreground))]">Don't have an account? </span>
            <Link href="/signup" className="text-[hsl(var(--primary))] font-medium hover:underline">
              Create one
            </Link>
          </div>
        </div>

        {/* Theme Toggle - Minimal */}
        <button className="absolute top-6 right-6 p-2 rounded-lg hover:bg-[hsl(var(--input))] transition-all">
          <div className="w-6 h-6 rounded-full border border-[hsl(var(--muted-foreground))]"></div>
        </button>
      </div>
    </div>
  )
}
