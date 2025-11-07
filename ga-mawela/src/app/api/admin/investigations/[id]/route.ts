import { NextResponse } from 'next/server'

// Temporarily disabled - pending database configuration
export async function GET() {
  return NextResponse.json({ error: 'Admin API temporarily disabled' }, { status: 503 })
}

export async function PATCH() {
  return NextResponse.json({ error: 'Admin API temporarily disabled' }, { status: 503 })
}