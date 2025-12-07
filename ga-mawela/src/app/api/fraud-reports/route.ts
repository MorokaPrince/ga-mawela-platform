import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import FraudReport from '@/lib/models/FraudReport';

export async function GET() {
  try {
    await dbConnect();
    const reports = await FraudReport.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: reports });
  } catch (error) {
    console.error('Error fetching fraud reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fraud reports' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const report = await FraudReport.create(body);
    return NextResponse.json({ success: true, data: report }, { status: 201 });
  } catch (error) {
    console.error('Error creating fraud report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create fraud report' },
      { status: 500 }
    );
  }
}