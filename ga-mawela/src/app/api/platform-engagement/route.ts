import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";
import { COLLECTIONS } from "@/lib/mongodb-schemas";

type EngagementKind = "comment" | "report";
const LOCAL_ENGAGEMENT_PATH = path.join(
  process.cwd(),
  "data",
  "platform-engagement.json",
);

function normalizeEntry(doc: Record<string, unknown>) {
  const metadata = (doc.metadata as Record<string, unknown> | undefined) ?? {};

  return {
    id:
      doc._id instanceof ObjectId
        ? doc._id.toString()
        : String(doc._id ?? crypto.randomUUID()),
    kind: String(metadata.kind ?? "comment") as EngagementKind,
    section: String(metadata.section ?? "transparency"),
    name: String(doc.submittedBy ?? "Anonymous"),
    message: String(doc.message ?? ""),
    issueType: metadata.issueType ? String(metadata.issueType) : undefined,
    fileName: metadata.fileName ? String(metadata.fileName) : undefined,
    locale: metadata.locale ? String(metadata.locale) : "en",
    submittedAt:
      doc.submittedAt instanceof Date
        ? doc.submittedAt.toISOString().slice(0, 10)
        : String(doc.submittedAt ?? new Date().toISOString().slice(0, 10)),
  };
}

async function readLocalEntries() {
  try {
    const raw = await readFile(LOCAL_ENGAGEMENT_PATH, "utf8");
    return JSON.parse(raw) as Array<Record<string, unknown>>;
  } catch {
    return [];
  }
}

async function writeLocalEntries(entries: Array<Record<string, unknown>>) {
  await mkdir(path.dirname(LOCAL_ENGAGEMENT_PATH), { recursive: true });
  await writeFile(LOCAL_ENGAGEMENT_PATH, JSON.stringify(entries, null, 2), "utf8");
}

export async function GET(request: NextRequest) {
  const kind = request.nextUrl.searchParams.get("kind");
  const section = request.nextUrl.searchParams.get("section");

  try {
    const formsCollection = await getCollection(COLLECTIONS.FORMS);

    const query: Record<string, unknown> = {
      "metadata.platformSurface": "community-mining-platform",
    };

    if (kind) {
      query["metadata.kind"] = kind;
    }

    if (section) {
      query["metadata.section"] = section;
    }

    const entries = await formsCollection
      .find(query)
      .sort({ submittedAt: -1 })
      .limit(40)
      .toArray();

    return NextResponse.json({
      success: true,
      data: entries.map((entry) => normalizeEntry(entry as Record<string, unknown>)),
      storageMode: "mongodb",
    });
  } catch (error) {
    console.error("Error fetching platform engagement from MongoDB:", error);

    const localEntries = (await readLocalEntries())
      .map((entry) => normalizeEntry(entry))
      .filter((entry) => (kind ? entry.kind === kind : true))
      .filter((entry) => (section ? entry.section === section : true));

    return NextResponse.json({
      success: true,
      data: localEntries,
      storageMode: "local-file",
    });
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    kind?: EngagementKind;
    section?: string;
    name?: string;
    message?: string;
    issueType?: string;
    fileName?: string;
    locale?: string;
  };

  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json(
      { success: false, error: "Message is required" },
      { status: 400 },
    );
  }

  const kind = body.kind === "report" ? "report" : "comment";
  const record = {
    formType: kind === "report" ? "report" : "feedback",
    submittedBy: body.name?.trim() || "Anonymous",
    email: "",
    subject:
      kind === "report"
        ? `${body.issueType ?? "Community issue"} report`
        : "Transparency comment",
    message,
    status: "new",
    submittedAt: new Date(),
    metadata: {
      kind,
      section: body.section ?? (kind === "report" ? "report" : "transparency"),
      issueType: body.issueType ?? null,
      fileName: body.fileName ?? null,
      locale: body.locale ?? "en",
      platformSurface: "community-mining-platform",
    },
  };

  try {
    const formsCollection = await getCollection(COLLECTIONS.FORMS);

    const result = await formsCollection.insertOne(record);

    return NextResponse.json({
      success: true,
      data: normalizeEntry({
        _id: result.insertedId,
        ...record,
      }),
      storageMode: "mongodb",
    });
  } catch (error) {
    console.error("Error saving platform engagement to MongoDB:", error);

    const localEntries = await readLocalEntries();
    const localRecord = {
      _id: crypto.randomUUID(),
      ...record,
    };

    localEntries.unshift(localRecord);
    await writeLocalEntries(localEntries);

    return NextResponse.json({
      success: true,
      data: normalizeEntry(localRecord),
      storageMode: "local-file",
    });
  }
}
