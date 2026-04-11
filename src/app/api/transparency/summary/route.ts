import { NextResponse } from "next/server";

import { getTransparencySummary } from "@/backend/modules/transparency/application/get-transparency-summary";

export async function GET() {
  const data = await getTransparencySummary();
  return NextResponse.json(data);
}
