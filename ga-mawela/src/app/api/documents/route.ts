/**
 * API Route: /api/documents
 * Handles document listing and creation
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/mongodb-schemas';

export async function GET() {
  try {
    const documentsCollection = await getCollection(COLLECTIONS.DOCUMENTS);

    const documents = await documentsCollection
      .find({})
      .sort({ uploadedAt: -1 })
      .toArray();

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { filename, type, url, size, description, category, investigationId, lineageId } = body;

    const documentsCollection = await getCollection(COLLECTIONS.DOCUMENTS);

    const documentData = {
      filename,
      type,
      url,
      size,
      description: description || '',
      category: category || 'general',
      investigationId: investigationId || null,
      lineageId: lineageId || null,
      uploadedAt: new Date(),
      uploadedBy: 'system',
    };

    const result = await documentsCollection.insertOne(documentData);

    return NextResponse.json({
      success: true,
      document: {
        id: result.insertedId,
        ...documentData,
      },
    });

  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create document' },
      { status: 500 }
    );
  }
}