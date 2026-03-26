import { NextResponse } from "next/server";
import { getPlatformOverview } from "@/server/platform/service";

export async function GET() {
  const data = await getPlatformOverview();

  return NextResponse.json({
    success: true,
    data,
  });
}
