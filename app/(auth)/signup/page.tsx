'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui/card'
import { createSupabaseClient } from '@/lib/supabase'
import { Mail, Lock, User, ArrowRight } from 'lucide-react'

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const supabase = createSupabaseClient()
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            level: 1,
            xp: 0,
          },
        },
      })

      if (authError) {
        setError(authError.message)
        return
      }

      if (data.user) {
        // Create user profile in database
        const { error: insertError } = await supabase
          .from('users')
          .insert([{
            id: data.user.id,
            name,
            email,
            level: 1,
            xp: 0,
          }])

        if (insertError) {
          console.error('[v0] User creation error:', insertError)
        }

        router.push('/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('[v0] Signup error:', err)
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
          Join the premium study community
        </p>
      </div>

      {/* Signup Card */}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Join thousands of students studying smarter
          </p>
        </CardHeader>

        <CardBody className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-600/10 p-3 text-sm text-red-600 border border-red-500/30">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              icon={<User size={18} />}
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

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

            <Input
              label="Confirm Password"
              type="password"
              icon={<Lock size={18} />}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
            >
              Create Account
              <ArrowRight className="ml-2" size={18} />
            </Button>
          </form>
        </CardBody>

        <CardFooter>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold hover:underline" style={{ color: 'hsl(var(--primary))' }}>
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>

      {/* Footer */}
      <div className="text-center text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
        <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
      </div>
    </div>
  )
}
