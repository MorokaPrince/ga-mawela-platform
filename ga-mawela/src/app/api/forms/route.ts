/**
 * API Route: /api/forms
 * Handles form submissions and evidence uploads
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/mongodb-schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { formType, data } = body;

    const formsCollection = await getCollection(COLLECTIONS.FORMS);

    const formData = {
      formType: formType || 'general',
      data,
      submittedAt: new Date(),
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    const result = await formsCollection.insertOne(formData);

    return NextResponse.json({
      success: true,
      form: {
        id: result.insertedId,
        ...formData,
      },
    });

  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const formsCollection = await getCollection(COLLECTIONS.FORMS);

    const forms = await formsCollection
      .find({})
      .sort({ submittedAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch forms' },
      { status: 500 }
    );
  }
}