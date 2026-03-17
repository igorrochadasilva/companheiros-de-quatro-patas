import { NextResponse } from "next/server";

import { isContentfulConfigured } from "@/shared/config";
import { getContentfulEntries } from "@/shared/lib/contentful";

export async function GET() {
  if (!isContentfulConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Contentful is not configured. Please set CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_ACCESS_TOKEN.",
      },
      { status: 503 },
    );
  }

  try {
    const response = await getContentfulEntries({ limit: 1 });
    return NextResponse.json({
      ok: true,
      total: response.total,
      fetched: response.items.length,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to query Contentful.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
