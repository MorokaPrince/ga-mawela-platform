import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Lineage from '../../../../lib/models/Lineage';
import Document from '../../../../lib/models/Document';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const ancestors = JSON.parse(formData.get('ancestors') as string || '[]');
    const files = formData.getAll('documents') as File[];

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Handle file uploads
    const documentIds: string[] = [];
    for (const file of files) {
      if (file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create uploads directory if it doesn't exist
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadDir, { recursive: true });

        const filename = `${Date.now()}-${file.name}`;
        const filepath = path.join(uploadDir, filename);
        await writeFile(filepath, buffer);

        // Create Document entry
        const document = new Document({
          filename: file.name,
          type: file.type,
          url: `/uploads/${filename}`,
          size: file.size,
        });
        const savedDoc = await document.save();
        documentIds.push(savedDoc._id);
      }
    }

    // Create Lineage entry
    const lineage = new Lineage({
      name,
      ancestors,
      documents: documentIds,
    });

    await lineage.save();

    return NextResponse.json({ message: 'Lineage registered successfully', lineage }, { status: 201 });
  } catch (error) {
    console.error('Error registering lineage:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}