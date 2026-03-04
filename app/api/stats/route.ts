import { NextResponse } from "next/server";

import type { Stats } from "@/types";

export async function GET() {
  const data: Stats = {
    adoptedCount: 128,
    inTreatmentCount: 23,
    rescuedCount: 312,
    lastUpdatedAt: new Date().toISOString(),
  };

  return NextResponse.json(data);
}
