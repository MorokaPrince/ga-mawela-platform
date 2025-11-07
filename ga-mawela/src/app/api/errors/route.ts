import { NextRequest, NextResponse } from 'next/server';
import { logError } from '../../../lib/logger';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the incoming log data
    const {
      timestamp,
      level,
      message,
      stack,
      context
    } = body;

    // Basic validation
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid log message' },
        { status: 400 }
      );
    }

    // Log the error server-side
    await logError(message, {
      level: level || 'error',
      context: {
        ...context,
        clientTimestamp: timestamp,
        stack,
        // Add server-side context
        serverTimestamp: new Date().toISOString(),
        userAgent: request.headers.get('user-agent'),
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        // Note: In production, consider anonymizing IP addresses for privacy
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in /api/errors:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}