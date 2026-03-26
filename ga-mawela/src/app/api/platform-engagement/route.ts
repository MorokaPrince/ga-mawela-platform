import { NextRequest, NextResponse } from "next/server";
import { savePlatformUpload } from "@/server/platform/files";
import {
  listPlatformEngagement,
  savePlatformEngagement,
  type PlatformEngagementRecord,
} from "@/server/platform/service";

export async function GET(request: NextRequest) {
  const kind = request.nextUrl.searchParams.get("kind");
  const section = request.nextUrl.searchParams.get("section");

  const data = await listPlatformEngagement(
    section ?? undefined,
    kind === "report" || kind === "comment" ? kind : undefined,
  );

  return NextResponse.json({
    success: true,
    data,
  });
}

async function parseIncomingRecord(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    const file = formData.get("file");
    const upload =
      file instanceof File && file.size > 0
        ? await savePlatformUpload(file, "reports")
        : undefined;

    return {
      kind: formData.get("kind"),
      section: formData.get("section"),
      name: formData.get("name"),
      message: formData.get("message"),
      issueType: formData.get("issueType"),
      locale: formData.get("locale"),
      fileName: upload?.fileName,
      fileUrl: upload?.fileUrl,
    };
  }

  const body = (await request.json()) as Record<string, unknown>;
  return {
    kind: body.kind,
    section: body.section,
    name: body.name,
    message: body.message,
    issueType: body.issueType,
    locale: body.locale,
    fileName: body.fileName,
    fileUrl: body.fileUrl,
  };
}

export async function POST(request: NextRequest) {
  const payload = await parseIncomingRecord(request);
  const message = String(payload.message ?? "").trim();

  if (!message) {
    return NextResponse.json(
      { success: false, error: "Message is required" },
      { status: 400 },
    );
  }

  const record: PlatformEngagementRecord = {
    id: crypto.randomUUID(),
    kind: payload.kind === "report" ? "report" : "comment",
    section:
      typeof payload.section === "string" && payload.section.trim()
        ? payload.section.trim()
        : payload.kind === "report"
          ? "report"
          : "transparency",
    name:
      typeof payload.name === "string" && payload.name.trim()
        ? payload.name.trim()
        : "Anonymous",
    message,
    issueType:
      typeof payload.issueType === "string" && payload.issueType.trim()
        ? payload.issueType.trim()
        : undefined,
    fileName:
      typeof payload.fileName === "string" && payload.fileName.trim()
        ? payload.fileName.trim()
        : undefined,
    fileUrl:
      typeof payload.fileUrl === "string" && payload.fileUrl.trim()
        ? payload.fileUrl.trim()
        : undefined,
    locale:
      typeof payload.locale === "string" && payload.locale.trim()
        ? payload.locale.trim()
        : "en",
    submittedAt: new Date().toISOString().slice(0, 10),
  };

  const data = await savePlatformEngagement(record);

  return NextResponse.json({
    success: true,
    data,
  });
}
