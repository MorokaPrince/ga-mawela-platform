import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Resource from '@/lib/models/Resource';

export async function GET() {
  try {
    await dbConnect();
    const resources = await Resource.find({ isActive: true }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: resources });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const resource = await Resource.create(body);
    return NextResponse.json({ success: true, data: resource }, { status: 201 });
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create resource' },
      { status: 500 }
    );
  }
}