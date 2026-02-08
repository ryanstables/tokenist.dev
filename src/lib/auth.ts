// tokenist.dev/src/lib/auth.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8081'

export interface AuthResponse {
  user: {
    userId: string
    email: string
    displayName?: string
    orgId?: string
  }
  token: string
}

export async function register(
  email: string,
  password: string,
  displayName?: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, displayName }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'Registration failed')
  }

  return res.json()
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.error || 'Login failed')
  }

  return res.json()
}

export function saveToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token)
  }
}

export function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token')
  }
  return null
}

export function clearToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token')
  }
}
