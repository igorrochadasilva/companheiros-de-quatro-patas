import { NextResponse } from "next/server";

import { listFeaturedBazaarItems } from "@/backend/modules/bazaar/application/list-featured-bazaar-items";

export async function GET() {
  const items = await listFeaturedBazaarItems();
  return NextResponse.json({ items });
}
