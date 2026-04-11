import { NextResponse } from "next/server";

import { getShelterProgress } from "@/backend/modules/shelter/application/get-shelter-progress";

export async function GET() {
  const data = await getShelterProgress();
  return NextResponse.json(data);
}
