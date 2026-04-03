import { NextResponse } from "next/server";

import { getHomeCmsContent } from "@/backend/modules/cms/application/get-home-cms-content";

export async function GET() {
  const result = await getHomeCmsContent();
  return NextResponse.json(result.data, { status: result.status });
}
