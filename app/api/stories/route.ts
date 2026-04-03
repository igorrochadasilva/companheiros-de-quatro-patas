import { NextResponse } from "next/server";

import { listStories } from "@/backend/modules/stories/application/list-stories";

export async function GET() {
  const items = await listStories();
  return NextResponse.json({ items });
}
