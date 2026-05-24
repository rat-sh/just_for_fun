'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/card'
import { createSupabaseClient } from '@/lib/supabase'
import { Mail, Lock, ArrowRight } from 'lucide-react'

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
      const supabase = createSupabaseClient()
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        return
      }

      if (data.user) {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('[v0] Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-4xl font-bold">
          <span className="gradient-primary bg-clip-text text-transparent">Study</span>
          <span className="gradient-secondary ml-2 bg-clip-text text-transparent">Room</span>
        </div>
        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Premium collaborative study platform
        </p>
      </div>

      {/* Login Card */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Sign in to your account to continue
          </p>
        </CardHeader>

        <CardBody className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-600/10 p-3 text-sm text-red-600 border border-red-500/30">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              icon={<Mail size={18} />}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              icon={<Lock size={18} />}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Sign In
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </form>
        </CardBody>

        <CardFooter>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold hover:underline" style={{ color: 'hsl(var(--primary))' }}>
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>

      {/* Footer */}
      <div className="text-center text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
        <p>Secure and encrypted • Fast performance • Always available</p>
      </div>
    </div>
  )
}
