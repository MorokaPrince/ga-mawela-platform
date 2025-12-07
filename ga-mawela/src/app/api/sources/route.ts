import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Source from '@/lib/models/Source';

export async function GET() {
  try {
    await dbConnect();
    const sources = await Source.find({ isActive: true }).sort({ lastVerified: -1 });
    return NextResponse.json({ success: true, data: sources });
  } catch (error) {
    console.error('Error fetching sources:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch sources' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const source = await Source.create(body);
    return NextResponse.json({ success: true, data: source }, { status: 201 });
  } catch (error) {
    console.error('Error creating source:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create source' },
      { status: 500 }
    );
  }
}