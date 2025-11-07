import { NextResponse } from 'next/server'

// Temporarily disabled - pending database configuration
export async function POST() {
  return NextResponse.json({ error: 'Admin API temporarily disabled' }, { status: 503 })
}