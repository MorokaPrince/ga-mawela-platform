import { NextRequest, NextResponse } from "next/server";
import {
  listPlatformDocuments,
  listPlatformEngagement,
  listPlatformOpportunities,
} from "@/server/platform/service";
import { verifyPlatformSessionToken, PLATFORM_SESSION_COOKIE } from "@/lib/platform-auth";

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get(PLATFORM_SESSION_COOKIE)?.value;
  const session = verifyPlatformSessionToken(sessionToken);

  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (type === "documents") {
      const docs = await listPlatformDocuments();
      return NextResponse.json({ success: true, data: docs });
    }

    if (type === "submissions") {
      const engagement = await listPlatformEngagement();
      // Filter to show user's submissions (by email)
      const userSubmissions = engagement.filter(
        (e) => e.name.includes(session.email.split("@")[0]) || e.name === session.name
      );
      return NextResponse.json({ success: true, data: userSubmissions });
    }

    if (type === "opportunities") {
      const opportunities = await listPlatformOpportunities();
      return NextResponse.json({ success: true, data: opportunities });
    }

    // Get all data
    const [docs, engagement, opportunities] = await Promise.all([
      listPlatformDocuments(),
      listPlatformEngagement(),
      listPlatformOpportunities(),
    ]);

    const userSubmissions = engagement.filter(
      (e) => e.name.includes(session.email.split("@")[0]) || e.name === session.name
    );

    return NextResponse.json({
      success: true,
      data: {
        documents: docs,
        submissions: userSubmissions,
        opportunities,
      },
    });
  } catch (error) {
    console.error("Failed to fetch member data:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}