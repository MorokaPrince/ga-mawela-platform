import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import LegalFramework from '@/lib/models/LegalFramework';

export async function GET() {
  try {
    await dbConnect();
    const frameworks = await LegalFramework.find({ isActive: true }).sort({ lastUpdated: -1 });
    return NextResponse.json({ success: true, data: frameworks });
  } catch (error) {
    console.error('Error fetching legal frameworks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch legal frameworks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const framework = await LegalFramework.create(body);
    return NextResponse.json({ success: true, data: framework }, { status: 201 });
  } catch (error) {
    console.error('Error creating legal framework:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create legal framework' },
      { status: 500 }
    );
  }
}