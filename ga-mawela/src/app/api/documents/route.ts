/**
 * API Route: /api/documents
 * Handles document listing, filtering, and retrieval
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/mongodb-schemas';
import { getServerSession } from 'next-auth/next';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const isPublic = searchParams.get('public') === 'true';

    const documentsCollection = await getCollection(COLLECTIONS.DOCUMENTS);

    // Build query
    const query: any = {};

    if (isPublic) {
      query.isPublic = true;
    } else {
      // Check if user is authenticated
      const session = await getServerSession();
      if (!session) {
        query.isPublic = true;
      }
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Get total count
    const total = await documentsCollection.countDocuments(query);

    // Get paginated results
    const documents = await documentsCollection
      .find(query)
      .sort({ uploadedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      data: documents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
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
    const session = await getServerSession();

    // Only admins can upload documents
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      description,
      category,
      fileUrl,
      fileName,
      fileSize,
      fileType,
      isPublic,
      requiresAuthentication,
      tags,
      metadata,
    } = body;

    // Validate required fields
    if (!title || !category || !fileUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const documentsCollection = await getCollection(COLLECTIONS.DOCUMENTS);

    const document = {
      title,
      description,
      category,
      fileUrl,
      fileName,
      fileSize,
      fileType,
      uploadedBy: session.user?.email || 'admin',
      uploadedAt: new Date(),
      isPublic: isPublic || false,
      requiresAuthentication: requiresAuthentication || false,
      tags: tags || [],
      downloadCount: 0,
      metadata: metadata || {},
    };

    const result = await documentsCollection.insertOne(document);

    return NextResponse.json({
      success: true,
      data: { _id: result.insertedId, ...document },
    });
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create document' },
      { status: 500 }
    );
  }
}

