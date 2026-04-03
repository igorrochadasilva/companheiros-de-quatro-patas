import { NextRequest, NextResponse } from "next/server";

import { listBazaarItems } from "@/backend/modules/bazaar/application/list-bazaar-items";
import type { BazaarItemStatus } from "@/types";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query") ?? "";
  const status = request.nextUrl.searchParams.get("status") as
    | BazaarItemStatus
    | "all"
    | null;
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");
  const pageSize = Number(request.nextUrl.searchParams.get("pageSize") ?? "6");
  const includeSold =
    request.nextUrl.searchParams.get("includeSold") === "true";

  const response = await listBazaarItems({
    query,
    status,
    page,
    pageSize,
    includeSold,
  });

  return NextResponse.json(response);
}
