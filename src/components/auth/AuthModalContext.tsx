'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { getToken } from '@/lib/auth'
import { AuthModal } from './AuthModal'

type AuthModalMode = 'login' | 'register'

interface AuthModalContextValue {
  openLogin: () => void
  openRegister: () => void
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null)

export function useAuthModal() {
  const ctx = useContext(AuthModalContext)
  if (!ctx) throw new Error('useAuthModal must be used within AuthModalProvider')
  return ctx
}

const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:3001'

export function AuthModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialMode, setInitialMode] = useState<AuthModalMode>('login')

  const openLogin = useCallback(() => {
    setInitialMode('login')
    setIsOpen(true)
  }, [])

  const openRegister = useCallback(() => {
    setInitialMode('register')
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => setIsOpen(false), [])

  const handleAuthenticated = useCallback((token?: string) => {
    setIsOpen(false)
    const authToken = token || getToken()
    if (authToken) {
      window.location.href = `${dashboardUrl}?token=${encodeURIComponent(authToken)}`
    }
  }, [])

  return (
    <AuthModalContext.Provider value={{ openLogin, openRegister }}>
      {children}
      <AuthModal
        isOpen={isOpen}
        onClose={handleClose}
        onAuthenticated={handleAuthenticated}
        initialMode={initialMode}
      />
    </AuthModalContext.Provider>
  )
}
