import { NextResponse } from "next/server";

import { getAboutCmsContent } from "@/backend/modules/cms/application/get-about-cms-content";

export async function GET() {
  const result = await getAboutCmsContent();
  return NextResponse.json(result.data, { status: result.status });
}
