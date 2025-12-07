import type { Session } from 'next-auth'

// Temporary implementation for static deployment without API routes
export async function getServerSession(): Promise<Session | null> {
  // Return null for static deployment - no authentication
  return null
}

// Temporary implementation for static deployment
export function isAdmin(session: Session | null): boolean {
  // For static deployment, no admin functionality
  return false
}

export function requireAdmin(session: Session | null) {
  // For static deployment, skip admin checks
  return
}