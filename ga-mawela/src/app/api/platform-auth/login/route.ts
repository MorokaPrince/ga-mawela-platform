import { NextRequest, NextResponse } from "next/server";
import {
  authenticatePlatformUser,
  createPlatformSessionToken,
  PLATFORM_SESSION_COOKIE,
} from "@/lib/platform-auth";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      email?: string;
      password?: string;
    };

    if (!body.email || !body.password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await authenticatePlatformUser(body.email, body.password);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // At this point, passwordHash is guaranteed to exist since authenticatePlatformUser
    // only returns a user when password verification succeeds (which requires passwordHash)
    const authenticatedUser = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      passwordHash: user.passwordHash!,
      membershipNumber: user.membershipNumber,
      preferredLanguage: user.preferredLanguage,
    };

    const token = createPlatformSessionToken(authenticatedUser);
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });

    response.cookies.set({
      name: PLATFORM_SESSION_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Platform login failed:", error);
    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 },
    );
  }
}
