import { NextResponse } from "next/server";

import { getStats } from "@/backend/modules/stats/application/get-stats";

export async function GET() {
  const data = await getStats();
  return NextResponse.json(data);
}
