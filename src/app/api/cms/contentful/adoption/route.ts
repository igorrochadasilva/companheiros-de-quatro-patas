import { NextResponse } from "next/server";

import { getAdoptionCmsContent } from "@/backend/modules/cms/application/get-adoption-cms-content";

export async function GET() {
  const result = await getAdoptionCmsContent();
  return NextResponse.json(result.data, { status: result.status });
}
