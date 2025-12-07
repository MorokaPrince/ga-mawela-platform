import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import HistoricalEvent from '@/lib/models/HistoricalEvent';

export async function GET() {
  try {
    await dbConnect();
    const events = await HistoricalEvent.find({}).sort({ year: 1 });
    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    console.error('Error fetching historical events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch historical events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const event = await HistoricalEvent.create(body);
    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    console.error('Error creating historical event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create historical event' },
      { status: 500 }
    );
  }
}