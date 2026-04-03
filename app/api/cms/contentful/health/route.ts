import { NextResponse } from "next/server";

import { getContentfulHealth } from "@/backend/modules/cms/application/get-contentful-health";

export async function GET() {
  const result = await getContentfulHealth();
  return NextResponse.json(result.data, { status: result.status });
}
