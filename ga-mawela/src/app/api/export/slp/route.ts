import { NextRequest, NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';
import dbConnect from '../../../../../lib/db';
import Investigation from '../../../../../lib/models/Investigation';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const investigationId = searchParams.get('investigationId');

    if (!investigationId) {
      return NextResponse.json({ error: 'Investigation ID is required' }, { status: 400 });
    }

    await dbConnect();

    const investigation = await Investigation.findById(investigationId);
    if (!investigation) {
      return NextResponse.json({ error: 'Investigation not found' }, { status: 404 });
    }

    // Create PDF
    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text('Sectional Land Parcel (SLP) Request Letter', 20, 30);

    // Date
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);

    // Recipient
    doc.text('To: The Registrar of Deeds', 20, 70);
    doc.text('Department of Rural Development and Land Reform', 20, 80);
    doc.text('Private Bag X833', 20, 90);
    doc.text('Pretoria, 0001', 20, 100);

    // Subject
    doc.setFontSize(14);
    doc.text('Subject: Request for Sectional Land Parcel Information', 20, 120);

    // Body
    doc.setFontSize(12);
    const bodyText = `
Dear Sir/Madam,

I am writing to request information regarding the Sectional Land Parcel (SLP) for the property located at:

Property Details: ${investigation.title}

Description: ${investigation.description}

In terms of the Sectional Titles Act 95 of 1986 and the Promotion of Access to Information Act 2 of 2000 (PAIA), I kindly request access to the following information:

1. The current registered owner(s) of the sectional title unit.
2. Any registered bonds or mortgages over the property.
3. Any restrictions or conditions registered against the title.
4. The sectional plan number and registration details.

Please provide this information in electronic format where possible.

Yours faithfully,

[Your Name]
[Your Contact Details]
[Your Address]

Investigation Reference: ${investigation._id}
    `;

    const lines = doc.splitTextToSize(bodyText, 170);
    doc.text(lines, 20, 140);

    // Generate PDF buffer
    const pdfBuffer = doc.output('arraybuffer');

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="slp-request-${investigationId}.pdf"`,
      },
    });
  } catch (error) {
    console.error('SLP export error:', error);
    return NextResponse.json({ error: 'Failed to generate SLP request' }, { status: 500 });
  }
}