import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Community from '@/lib/models/Community';

export async function GET() {
  try {
    await dbConnect();
    const communities = await Community.find({});
    return NextResponse.json({ success: true, data: communities });
  } catch (error) {
    console.error('Error fetching communities:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch communities' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const community = await Community.create(body);
    return NextResponse.json({ success: true, data: community }, { status: 201 });
  } catch (error) {
    console.error('Error creating community:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create community' },
      { status: 500 }
    );
  }
}