'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { getToken } from '@/lib/auth'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthenticated: (token?: string) => void
}

export function AuthModal({ isOpen, onClose, onAuthenticated }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!isOpen || !mounted) return null

  const handleRegisterSuccess = () => {
    const token = getToken()
    onAuthenticated(token || undefined)
  }

  const handleClose = () => {
    setMode('login')
    onClose()
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 max-w-md w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[var(--fg-muted)] hover:text-[var(--fg)] text-xl leading-none transition-colors"
          aria-label="Close"
        >
          &times;
        </button>

        {mode === 'login' ? (
          <LoginForm
            onSuccess={onAuthenticated}
            onSwitchToRegister={() => setMode('register')}
          />
        ) : (
          <RegisterForm
            onSuccess={handleRegisterSuccess}
            onSwitchToLogin={() => setMode('login')}
          />
        )}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
