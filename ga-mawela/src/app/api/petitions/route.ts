/**
 * API Route: /api/petitions
 * Handles petition signatures and management
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/mongodb-schemas';

export async function GET() {
  try {
    const petitionsCollection = await getCollection(COLLECTIONS.PETITIONS);

    const petitions = await petitionsCollection
      .find({})
      .sort({ signedAt: -1 })
      .toArray();

    const totalSignatures = await petitionsCollection.countDocuments();

    return NextResponse.json({
      petitions,
      totalSignatures,
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
    const { name, email, message, petitionType } = body;

    const petitionsCollection = await getCollection(COLLECTIONS.PETITIONS);

    const petitionData = {
      name: name || 'Anonymous',
      email: email || null,
      message: message || 'I support Ga-Mawela land restitution',
      petitionType: petitionType || 'youth-empowerment',
      signedAt: new Date(),
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
    };

    const result = await petitionsCollection.insertOne(petitionData);

    return NextResponse.json({
      success: true,
      petition: {
        id: result.insertedId,
        ...petitionData,
      },
    });

  } catch (error) {
    console.error('Error creating petition:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create petition' },
      { status: 500 }
    );
  }
}