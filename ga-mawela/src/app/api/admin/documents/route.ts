import { NextRequest, NextResponse } from "next/server";
import {
  listPlatformDocuments,
  savePlatformDocument,
  updatePlatformDocument,
  deletePlatformDocument,
  type PlatformRole,
} from "@/server/platform/service";
import { verifyPlatformSessionToken, PLATFORM_SESSION_COOKIE } from "@/lib/platform-auth";
import type { DocumentCategory } from "@/data/platformData";

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get(PLATFORM_SESSION_COOKIE)?.value;
  const session = verifyPlatformSessionToken(sessionToken);

  if (!session || session.role !== "admin") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const documents = await listPlatformDocuments();

    if (id) {
      const doc = documents.find((d) => d.id === id);
      if (!doc) {
        return NextResponse.json({ success: false, error: "Document not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: doc });
    }

    return NextResponse.json({ success: true, data: documents });
  } catch (error) {
    console.error("Failed to fetch documents:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch documents" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const sessionToken = request.cookies.get(PLATFORM_SESSION_COOKIE)?.value;
  const session = verifyPlatformSessionToken(sessionToken);

  if (!session || session.role !== "admin") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      title: string;
      category: string;
      description: string;
      source: string;
      date: string;
      href?: string;
      fileName?: string;
    };

    if (!body.title || !body.category || !body.source) {
      return NextResponse.json({ success: false, error: "Title, category, and source are required" }, { status: 400 });
    }

    const doc = await savePlatformDocument({
      id: crypto.randomUUID(),
      title: body.title,
      category: body.category,
      description: body.description || "",
      source: body.source,
      date: body.date || new Date().toISOString().slice(0, 10),
      href: body.href,
      fileName: body.fileName,
    });

    return NextResponse.json({ success: true, data: doc }, { status: 201 });
  } catch (error) {
    console.error("Failed to create document:", error);
    return NextResponse.json({ success: false, error: "Failed to create document" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const sessionToken = request.cookies.get(PLATFORM_SESSION_COOKIE)?.value;
  const session = verifyPlatformSessionToken(sessionToken);

  if (!session || session.role !== "admin") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      id: string;
      title?: string;
      category?: string;
      description?: string;
      source?: string;
      date?: string;
      href?: string;
    };

    if (!body.id) {
      return NextResponse.json({ success: false, error: "Document ID is required" }, { status: 400 });
    }

    const doc = await updatePlatformDocument(body.id, {
      title: body.title,
      category: body.category as DocumentCategory | undefined,
      description: body.description,
      source: body.source,
      date: body.date,
    });

    if (!doc) {
      return NextResponse.json({ success: false, error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: doc });
  } catch (error) {
    console.error("Failed to update document:", error);
    return NextResponse.json({ success: false, error: "Failed to update document" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const sessionToken = request.cookies.get(PLATFORM_SESSION_COOKIE)?.value;
  const session = verifyPlatformSessionToken(sessionToken);

  if (!session || session.role !== "admin") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Document ID is required" }, { status: 400 });
    }

    const success = await deletePlatformDocument(id);

    if (!success) {
      return NextResponse.json({ success: false, error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete document:", error);
    return NextResponse.json({ success: false, error: "Failed to delete document" }, { status: 500 });
  }
}