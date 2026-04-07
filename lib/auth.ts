// Simple authentication for admin panel
// Default password: "admin123" - Change this in settings

const DEFAULT_PASSWORD_HASH = "240be518fabd2724ddb6f04eeb9d5f2cc08c0a1f6d3b5e2a9f5e3c7f8a9b0c1d" // admin123

export function hashPassword(password: string): string {
  // Simple hash for demo - in production use bcrypt
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16).padStart(32, '0')
}

export function verifyPassword(password: string): boolean {
  const storedHash = getStoredPasswordHash()
  const inputHash = hashPassword(password)
  return inputHash === storedHash
}

export function getStoredPasswordHash(): string {
  if (typeof window === 'undefined') return DEFAULT_PASSWORD_HASH
  return localStorage.getItem('admin_password_hash') || DEFAULT_PASSWORD_HASH
}

export function setPassword(newPassword: string): void {
  const hash = hashPassword(newPassword)
  localStorage.setItem('admin_password_hash', hash)
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  const session = sessionStorage.getItem('admin_session')
  if (!session) return false
  
  try {
    const { expiry } = JSON.parse(session)
    return Date.now() < expiry
  } catch {
    return false
  }
}

export function login(password: string): boolean {
  if (verifyPassword(password)) {
    const expiry = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    sessionStorage.setItem('admin_session', JSON.stringify({ expiry }))
    return true
  }
  return false
}

export function logout(): void {
  sessionStorage.removeItem('admin_session')
}

// Default password hash for "admin123"
export function resetToDefaultPassword(): void {
  localStorage.setItem('admin_password_hash', hashPassword('admin123'))
}
