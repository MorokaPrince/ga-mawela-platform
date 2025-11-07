import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import dbConnect from '../../../../lib/db';
import Document from '../../../../lib/models/Document';

export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // const session = await auth();
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    await dbConnect();

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;
    const investigationId = formData.get('investigationId') as string;
    const lineageId = formData.get('lineageId') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Sanitize filename to prevent path traversal
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type. Only PDF, images, and documents are allowed.' }, { status: 400 });
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 10MB.' }, { status: 400 });
    }

    // Additional security: Check for malicious file signatures
    const buffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(buffer);

    // Check for PDF header
    if (file.type === 'application/pdf' && !(uint8Array[0] === 0x25 && uint8Array[1] === 0x50 && uint8Array[2] === 0x44 && uint8Array[3] === 0x46)) {
      return NextResponse.json({ error: 'Invalid PDF file' }, { status: 400 });
    }

    // Check for image headers
    if (file.type.startsWith('image/')) {
      const isValidImage = (
        // JPEG
        (uint8Array[0] === 0xFF && uint8Array[1] === 0xD8) ||
        // PNG
        (uint8Array[0] === 0x89 && uint8Array[1] === 0x50 && uint8Array[2] === 0x4E && uint8Array[3] === 0x47) ||
        // GIF
        (uint8Array[0] === 0x47 && uint8Array[1] === 0x49 && uint8Array[2] === 0x46)
      );
      if (!isValidImage) {
        return NextResponse.json({ error: 'Invalid image file' }, { status: 400 });
      }
    }

    // Upload to Vercel Blob
    const blob = await put(sanitizedFilename, file, {
      access: 'public',
    });

    // Save metadata to database
    const document = new Document({
      filename: sanitizedFilename,
      type: file.type,
      url: blob.url,
      size: file.size,
      description: description || undefined,
      category: category || undefined,
      investigationId: investigationId ? investigationId : undefined,
      lineageId: lineageId ? lineageId : undefined,
      uploadedBy: 'user-id', // TODO: Replace with actual user ID from session
    });

    await document.save();

    return NextResponse.json({
      success: true,
      document: {
        id: document._id,
        filename: document.filename,
        url: document.url,
        size: document.size,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}