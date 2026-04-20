import { NextResponse } from "next/server";

import { getContactCmsContent } from "@/backend/modules/cms/application/get-contact-cms-content";

export async function GET() {
  const result = await getContactCmsContent();
  return NextResponse.json(result.data, { status: result.status });
}

