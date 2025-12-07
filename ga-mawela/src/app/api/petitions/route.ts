/**
 * API Route: /api/petitions
 * Handles petition listing and signature submission
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/mongodb-schemas';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'active';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const petitionsCollection = await getCollection(COLLECTIONS.PETITIONS);

    const query: any = {};
    if (status) {
      query.status = status;
    }

    const total = await petitionsCollection.countDocuments(query);

    const petitions = await petitionsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      data: petitions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching petitions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch petitions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { petitionId, name, email, message } = body;

    // Validate required fields
    if (!petitionId || !name || !email) {
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

    const signaturesCollection = await getCollection(COLLECTIONS.PETITION_SIGNATURES);
    const petitionsCollection = await getCollection(COLLECTIONS.PETITIONS);

    // Check if user already signed this petition
    const existingSignature = await signaturesCollection.findOne({
      petitionId,
      email,
    });

    if (existingSignature) {
      return NextResponse.json(
        { success: false, error: 'You have already signed this petition' },
        { status: 400 }
      );
    }

    // Add signature
    const signature = {
      petitionId,
      name,
      email,
      message: message || '',
      signedAt: new Date(),
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      verified: false,
    };

    const signatureResult = await signaturesCollection.insertOne(signature);

    // Update petition signature count
    await petitionsCollection.updateOne(
      { _id: petitionId },
      { $inc: { currentSignatures: 1 } }
    );

    return NextResponse.json({
      success: true,
      data: { _id: signatureResult.insertedId, ...signature },
      message: 'Thank you for signing the petition!',
    });
  } catch (error) {
    console.error('Error submitting petition signature:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit signature' },
      { status: 500 }
    );
  }
}

