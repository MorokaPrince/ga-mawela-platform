/**
 * API Route: /api/upload
 * Handles file uploads to MongoDB and Vercel Blob Storage
 */

import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getCollection } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/mongodb-schemas';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
  'image/gif',
  'text/plain',
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const investigationId = formData.get('investigationId') as string;
    const lineageId = formData.get('lineageId') as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'File type not allowed' },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob Storage
    const blob = await put(file.name, file, {
      access: 'public',
    });

    // Save to MongoDB
    const documentsCollection = await getCollection(COLLECTIONS.DOCUMENTS);

    const documentData = {
      filename: file.name,
      type: file.type,
      url: blob.url,
      size: file.size,
      description: description || '',
      category: category || 'general',
      investigationId: investigationId || null,
      lineageId: lineageId || null,
      uploadedAt: new Date(),
      uploadedBy: 'system', // In a real app, this would be the authenticated user
    };

    const result = await documentsCollection.insertOne(documentData);

    return NextResponse.json({
      success: true,
      document: {
        id: result.insertedId,
        filename: file.name,
        url: blob.url,
        size: file.size,
      },
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}