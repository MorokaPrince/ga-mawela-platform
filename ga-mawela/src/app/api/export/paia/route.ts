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
    doc.text('Promotion of Access to Information Act (PAIA) Request', 20, 30);

    // Date
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);

    // Recipient
    doc.text('To: Information Officer', 20, 70);
    doc.text('[Organization Name]', 20, 80);
    doc.text('[Organization Address]', 20, 90);
    doc.text('[City, Postal Code]', 20, 100);

    // Subject
    doc.setFontSize(14);
    doc.text('Subject: Request for Access to Records in terms of PAIA', 20, 120);

    // Body
    doc.setFontSize(12);
    const bodyText = `
Dear Information Officer,

In terms of section 53(1) of the Promotion of Access to Information Act 2 of 2000 (PAIA), I request access to the following records held by your organization:

Investigation Details: ${investigation.title}

Description: ${investigation.description}

Specifically, I request access to:

1. All documents, correspondence, and records related to the above-mentioned investigation.
2. Any reports, assessments, or evaluations conducted.
3. Communications between your organization and relevant parties.
4. Any other records that may be relevant to this matter.

Please provide the requested information in electronic format where possible.

I am prepared to pay the prescribed fee for reproduction and postage, if applicable.

Yours faithfully,

[Your Full Name]
[Your Identity Number]
[Your Contact Details]
[Your Physical Address]
[Your Postal Address]

Reference: PAIA Request - ${investigation._id}
    `;

    const lines = doc.splitTextToSize(bodyText, 170);
    doc.text(lines, 20, 140);

    // Generate PDF buffer
    const pdfBuffer = doc.output('arraybuffer');

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="paia-request-${investigationId}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PAIA export error:', error);
    return NextResponse.json({ error: 'Failed to generate PAIA request' }, { status: 500 });
  }
}