import { NextRequest, NextResponse } from "next/server";
import {
  listPlatformUsers,
  findPlatformUserByEmail,
  createPlatformUser,
  updatePlatformUser,
  deletePlatformUser,
  type PlatformRole,
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
    const email = searchParams.get("email");

    if (email) {
      const user = await findPlatformUserByEmail(email);
      if (!user) {
        return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: user });
    }

    const users = await listPlatformUsers();
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch users" }, { status: 500 });
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
      email: string;
      name: string;
      role?: PlatformRole;
      password?: string;
      membershipNumber?: string;
      preferredLanguage?: string;
    };

    if (!body.email || !body.name) {
      return NextResponse.json({ success: false, error: "Email and name are required" }, { status: 400 });
    }

    const existingUser = await findPlatformUserByEmail(body.email);
    if (existingUser) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 409 });
    }

    const user = await createPlatformUser({
      email: body.email,
      name: body.name,
      role: body.role || "member",
      password: body.password || "changeme123",
      membershipNumber: body.membershipNumber,
      preferredLanguage: body.preferredLanguage,
    });

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    console.error("Failed to create user:", error);
    return NextResponse.json({ success: false, error: "Failed to create user" }, { status: 500 });
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
      email?: string;
      name?: string;
      role?: PlatformRole;
      membershipNumber?: string;
      preferredLanguage?: string;
    };

    if (!body.id) {
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
    }

    const user = await updatePlatformUser(body.id, {
      email: body.email,
      name: body.name,
      role: body.role,
      membershipNumber: body.membershipNumber,
      preferredLanguage: body.preferredLanguage,
    });

    if (!user) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json({ success: false, error: "Failed to update user" }, { status: 500 });
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
      return NextResponse.json({ success: false, error: "User ID is required" }, { status: 400 });
    }

    const success = await deletePlatformUser(id);

    if (!success) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return NextResponse.json({ success: false, error: "Failed to delete user" }, { status: 500 });
  }
}