/**
 * API Route: /api/documents
 * Handles document listing, creation, and download functionality
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/mongodb-schemas';
import axios from 'axios';
import { put } from '@vercel/blob';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
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
      downloadCount: 0,
      isPublic: true,
      requiresAuthentication: false,
      tags: [],
      metadata: {
        source: 'web',
        downloadedFrom: url,
      },
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

/**
 * Download a document from a URL and store it in Vercel Blob storage
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, filename, category = 'general', description = '' } = body;

    if (!url) {
      return NextResponse.json(
        { success: false, error: 'URL is required' },
        { status: 400 }
      );
    }

    // Download the file from the URL
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      timeout: 30000,
    });

    if (!response.data) {
      return NextResponse.json(
        { success: false, error: 'Failed to download file from URL' },
        { status: 400 }
      );
    }

    // Determine file type from content type or URL
    const contentType = response.headers['content-type'] || 'application/octet-stream';
    const fileExtension = contentType.includes('pdf') ? 'pdf' :
                         contentType.includes('word') ? 'docx' :
                         contentType.includes('excel') ? 'xlsx' :
                         contentType.includes('image') ? 'jpg' : 'bin';

    const finalFilename = filename || `document_${Date.now()}.${fileExtension}`;

    // Upload to Vercel Blob storage
    const blob = await put(finalFilename, response.data, {
      contentType,
      access: 'public',
    });

    // Store document metadata in database
    const documentsCollection = await getCollection(COLLECTIONS.DOCUMENTS);

    const documentData = {
      filename: finalFilename,
      type: contentType,
      url: blob.url,
      size: response.data.byteLength,
      description: description || `Document downloaded from ${url}`,
      category: category,
      investigationId: null,
      lineageId: null,
      uploadedAt: new Date(),
      uploadedBy: 'system',
      downloadCount: 0,
      isPublic: true,
      requiresAuthentication: false,
      tags: ['web-download', category],
      metadata: {
        source: 'web',
        originalUrl: url,
        downloadedAt: new Date(),
      },
    };

    const result = await documentsCollection.insertOne(documentData);

    return NextResponse.json({
      success: true,
      document: {
        id: result.insertedId,
        ...documentData,
      },
      blobUrl: blob.url,
    });

  } catch (error) {
    console.error('Error downloading and storing document:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to download and store document' },
      { status: 500 }
    );
  }
}

/**
 * Get a specific document by ID
 */
export async function GET_SINGLE(request: NextRequest) {
  try {
    const documentId = request.nextUrl.searchParams.get('id');
    if (!documentId) {
      return NextResponse.json(
        { success: false, error: 'Document ID is required' },
        { status: 400 }
      );
    }

    const documentsCollection = await getCollection(COLLECTIONS.DOCUMENTS);
    const document = await documentsCollection.findOne({ _id: new ObjectId(documentId) });

    if (!document) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      document,
    });

  } catch (error) {
    console.error('Error fetching document:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch document' },
      { status: 500 }
    );
  }
}

/**
 * Handle document download requests
 */
export async function GET_DOWNLOAD(request: NextRequest) {
  try {
    const documentId = request.nextUrl.searchParams.get('id');
    if (!documentId) {
      return NextResponse.json(
        { success: false, error: 'Document ID is required' },
        { status: 400 }
      );
    }

    const documentsCollection = await getCollection(COLLECTIONS.DOCUMENTS);
    const document = await documentsCollection.findOne({ _id: new ObjectId(documentId) });

    if (!document) {
      return NextResponse.json(
        { success: false, error: 'Document not found' },
        { status: 404 }
      );
    }

    // Increment download count
    await documentsCollection.updateOne(
      { _id: new ObjectId(documentId) },
      { $inc: { downloadCount: 1 }, $set: { lastDownloadedAt: new Date() } }
    );

    // Redirect to the document URL
    return NextResponse.redirect(document.url);

  } catch (error) {
    console.error('Error handling document download:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to handle document download' },
      { status: 500 }
    );
  }
}