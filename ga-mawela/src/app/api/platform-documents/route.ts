import { NextRequest, NextResponse } from "next/server";
import { savePlatformUpload } from "@/server/platform/files";
import { listPlatformDocuments, savePlatformDocument } from "@/server/platform/service";

export async function GET() {
  const data = await listPlatformDocuments();

  return NextResponse.json({
    success: true,
    data,
  });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const title = String(formData.get("title") ?? "").trim();
  const category = String(formData.get("category") ?? "Community Letters").trim();
  const description = String(formData.get("description") ?? "").trim();
  const source = String(formData.get("source") ?? "Local resident upload").trim();
  const file = formData.get("file");

  if (!title) {
    return NextResponse.json(
      { success: false, error: "Title is required" },
      { status: 400 },
    );
  }

  const upload =
    file instanceof File && file.size > 0
      ? await savePlatformUpload(file, "documents")
      : undefined;

  const document = await savePlatformDocument({
    id: crypto.randomUUID(),
    title,
    category,
    description: description || "Resident-uploaded document",
    source,
    date: new Date().toISOString().slice(0, 10),
    href: upload?.fileUrl,
    fileName: upload?.fileName,
  });

  return NextResponse.json({
    success: true,
    data: document,
  });
}
