import { NextRequest, NextResponse } from "next/server";
import {
  PLATFORM_SESSION_COOKIE,
  verifyPlatformSessionToken,
} from "@/lib/platform-auth";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(PLATFORM_SESSION_COOKIE)?.value;
  const session = verifyPlatformSessionToken(token);

  return NextResponse.json({
    authenticated: !!session,
    user: session
      ? {
          id: session.id,
          email: session.email,
          name: session.name,
          role: session.role,
        }
      : null,
  });
}
