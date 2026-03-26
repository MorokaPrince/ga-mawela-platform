import { NextRequest, NextResponse } from "next/server";
import {
  listPlatformEngagement,
  moderatePlatformEngagement,
  type PlatformEngagementRecord,
} from "@/server/platform/service";
import { verifyPlatformSessionToken, PLATFORM_SESSION_COOKIE } from "@/lib/platform-auth";

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get(PLATFORM_SESSION_COOKIE)?.value;
  const session = verifyPlatformSessionToken(sessionToken);

  if (!session || session.role !== "admin") {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section") || undefined;
    const kind = searchParams.get("kind") as "comment" | "report" | undefined;

    const entries = await listPlatformEngagement(section, kind);
    return NextResponse.json({ success: true, data: entries });
  } catch (error) {
    console.error("Failed to fetch engagement:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch engagement" }, { status: 500 });
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
      action: "approve" | "reject" | "delete";
    };

    if (!body.id || !body.action) {
      return NextResponse.json({ success: false, error: "ID and action are required" }, { status: 400 });
    }

    const result = await moderatePlatformEngagement(body.id, body.action);

    if (!result) {
      return NextResponse.json({ success: false, error: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Failed to moderate engagement:", error);
    return NextResponse.json({ success: false, error: "Failed to moderate engagement" }, { status: 500 });
  }
}