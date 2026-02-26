'use client'

import { useState } from 'react'
import { register, saveToken } from '@/lib/auth'

interface RegisterFormProps {
  onSuccess: () => void
  onSwitchToLogin: () => void
}

const MIN_PASSWORD_LENGTH = 8

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`)
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      const result = await register(email, password, displayName.trim())
      saveToken(result.token)
      onSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="font-display text-2xl font-bold text-center text-[var(--fg)]">Create Account</h2>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="displayName" className="block text-sm font-medium mb-1 text-[var(--fg)]">
          Name
        </label>
        <input
          id="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1 text-[var(--fg)]">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1 text-[var(--fg)]">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={MIN_PASSWORD_LENGTH}
          className="w-full px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
        />
        <p className="mt-1 text-xs text-[var(--fg-muted)]">
          At least {MIN_PASSWORD_LENGTH} characters
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-[var(--fg)]">
          Confirm password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={MIN_PASSWORD_LENGTH}
          className="w-full px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border)] text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
        />
        {confirmPassword && password !== confirmPassword && (
          <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || (!!confirmPassword && password !== confirmPassword)}
        className="w-full py-2.5 px-4 bg-[var(--accent)] text-[var(--bg)] font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>

      <p className="text-center text-sm text-[var(--fg-muted)]">
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-[var(--accent)] hover:underline"
        >
          Login
        </button>
      </p>
    </form>
  )
}