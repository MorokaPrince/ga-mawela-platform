/**
 * API Route: /api/documents/[id]
 * Handles individual document retrieval and download
 */

import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getCollection } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/mongodb-schemas';
import { getServerSession } from 'next-auth/next';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const action = new URL(request.url).searchParams.get('action');

    // Validate ID
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid document ID' },
        { status: 400 }
      );
    }

    const documentsCollection = await getCollection(COLLECTIONS.DOCUMENTS);
    const document = await documentsCollection.findOne({
      _id: new ObjectId(id),
    });

    if (!document) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      );
    }

    // Check access permissions
    const session = await getServerSession();
    const isAuthenticated = !!session;

    if (!document.isPublic && !isAuthenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // If action is download, increment counter and redirect
    if (action === 'download') {
      await documentsCollection.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: { lastDownloadedAt: new Date() },
          $inc: { downloadCount: 1 },
        }
      );

      // Redirect to file URL
      return NextResponse.redirect(document.fileUrl);
    }

    // Otherwise return document metadata
    return NextResponse.json({
      success: true,
      data: document,
    });
  } catch (error) {
    console.error('Error fetching document:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch document' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession();

    // Only admins can delete documents
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid document ID' },
        { status: 400 }
      );
    }

    const documentsCollection = await getCollection(COLLECTIONS.DOCUMENTS);
    const result = await documentsCollection.deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Document deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete document' },
      { status: 500 }
    );
  }
}

