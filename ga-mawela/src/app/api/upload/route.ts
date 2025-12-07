/**
 * API Route: /api/upload
 * Handles document file uploads to Vercel Blob storage
 */

import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getServerSession } from 'next-auth/next';
import { getCollection } from '@/lib/mongodb';
import { COLLECTIONS } from '@/lib/mongodb-schemas';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Only admins can upload documents.' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const isPublic = formData.get('isPublic') === 'true';
    const tags = formData.get('tags') as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!title || !category) {
      return NextResponse.json(
        { success: false, error: 'Title and category are required' },
        { status: 400 }
      );
    }

    // Sanitize filename
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only PDF, images, and documents are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Upload to Vercel Blob
    const blob = await put(sanitizedFilename, file, {
      access: 'public',
    });

    // Save metadata to MongoDB
    const documentsCollection = await getCollection(COLLECTIONS.DOCUMENTS);
    const document = {
      title,
      description: description || '',
      category,
      fileUrl: blob.url,
      fileName: sanitizedFilename,
      fileSize: file.size,
      fileType: file.type,
      uploadedBy: session.user?.email || 'admin',
      uploadedAt: new Date(),
      isPublic,
      requiresAuthentication: !isPublic,
      tags: tags ? tags.split(',').map((t) => t.trim()) : [],
      downloadCount: 0,
    };

    const result = await documentsCollection.insertOne(document);

    return NextResponse.json({
      success: true,
      data: {
        _id: result.insertedId,
        ...document,
      },
      message: 'Document uploaded successfully',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    );
  }
}