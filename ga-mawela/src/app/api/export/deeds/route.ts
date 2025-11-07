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
    doc.text('Deeds Office Search Request Form', 20, 30);

    // Date
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);

    // Office Details
    doc.text('Deeds Office:', 20, 70);
    doc.text('Regional Office: [Specify Region]', 20, 80);

    // Applicant Details
    doc.setFontSize(14);
    doc.text('Applicant Details:', 20, 100);
    doc.setFontSize(12);
    doc.text('Name: [Your Full Name]', 20, 115);
    doc.text('Identity Number: [Your ID Number]', 20, 125);
    doc.text('Contact Number: [Your Phone Number]', 20, 135);
    doc.text('Email Address: [Your Email]', 20, 145);

    // Property Details
    doc.setFontSize(14);
    doc.text('Property Details:', 20, 165);
    doc.setFontSize(12);
    doc.text(`Property Description: ${investigation.title}`, 20, 180);
    doc.text(`Investigation Reference: ${investigation.description}`, 20, 190);

    // Search Requirements
    doc.setFontSize(14);
    doc.text('Search Requirements:', 20, 210);
    doc.setFontSize(12);
    const requirements = [
      '□ Current registered owner(s)',
      '□ Title deed details',
      '□ Bond/mortgage information',
      '□ Restrictions and conditions',
      '□ Transfer history',
      '□ Surveyor General diagram',
      '□ Other: ________________________'
    ];

    requirements.forEach((req, index) => {
      doc.text(req, 20, 225 + (index * 10));
    });

    // Purpose
    doc.setFontSize(14);
    doc.text('Purpose of Search:', 20, 225 + (requirements.length * 10) + 10);
    doc.setFontSize(12);
    doc.text('Legal investigation and due diligence', 20, 225 + (requirements.length * 10) + 25);

    // Declaration
    doc.setFontSize(14);
    doc.text('Declaration:', 20, 225 + (requirements.length * 10) + 45);
    doc.setFontSize(12);
    doc.text('I declare that the information provided is true and correct.', 20, 225 + (requirements.length * 10) + 60);
    doc.text('Signature: ___________________________ Date: _______________', 20, 225 + (requirements.length * 10) + 75);

    // Generate PDF buffer
    const pdfBuffer = doc.output('arraybuffer');

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="deeds-office-form-${investigationId}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Deeds Office export error:', error);
    return NextResponse.json({ error: 'Failed to generate Deeds Office form' }, { status: 500 });
  }
}