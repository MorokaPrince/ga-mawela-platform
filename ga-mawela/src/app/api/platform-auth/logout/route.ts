import { NextResponse } from "next/server";
import { PLATFORM_SESSION_COOKIE } from "@/lib/platform-auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: PLATFORM_SESSION_COOKIE,
    value: "",
    path: "/",
    maxAge: 0,
  });
  return response;
}
