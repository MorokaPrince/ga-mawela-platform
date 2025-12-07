/**
 * API Route: /api/forms
 * Handles form submissions (contact, inquiry, feedback, etc.)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/mongodb-schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      formType,
      name,
      email,
      phone,
      subject,
      message,
      attachments,
      metadata,
    } = body;

    // Validate required fields
    if (!formType || !name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate form type
    const validFormTypes = ['contact', 'inquiry', 'report', 'feedback', 'other'];
    if (!validFormTypes.includes(formType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid form type' },
        { status: 400 }
      );
    }

    const formsCollection = await getCollection(COLLECTIONS.FORMS);

    const submission = {
      formType,
      submittedBy: name,
      email,
      phone: phone || '',
      subject,
      message,
      attachments: attachments || [],
      status: 'new',
      submittedAt: new Date(),
      metadata: metadata || {
        userAgent: request.headers.get('user-agent'),
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      },
    };

    const result = await formsCollection.insertOne(submission);

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to user

    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...submission },
      message: 'Thank you for your submission. We will get back to you soon.',
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const formType = searchParams.get('formType');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const formsCollection = await getCollection(COLLECTIONS.FORMS);

    const query: any = {};
    if (formType) query.formType = formType;
    if (status) query.status = status;

    const total = await formsCollection.countDocuments(query);

    const forms = await formsCollection
      .find(query)
      .sort({ submittedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      data: forms,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching forms:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch forms' },
      { status: 500 }
    );
  }
}

