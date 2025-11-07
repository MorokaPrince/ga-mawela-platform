import { auth } from '@/app/api/auth/[...nextauth]/route'
import type { Session } from 'next-auth'

export async function getServerSession() {
  return await auth()
}

export function isAdmin(session: Session | null) {
  return session?.user?.role === 'admin'
}

export function requireAdmin(session: Session | null) {
  if (!isAdmin(session)) {
    throw new Error('Admin access required')
  }
}