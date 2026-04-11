import { NextRequest, NextResponse } from "next/server";

import { requireAdminApi } from "@/app/api/_shared/require-admin";
import { buildErrorResponse } from "@/app/api/_shared/route-error";
import { importPets } from "@/backend/modules/pets/application/import-pets";

export async function POST(request: NextRequest) {
  try {
    const authError = await requireAdminApi();
    if (authError) return authError;

    const body = (await request.json()) as {
      items?: Record<string, unknown>[];
    };
    const items = Array.isArray(body.items) ? body.items : [];

    const result = await importPets({ items });
    return NextResponse.json(result);
  } catch (error) {
    return buildErrorResponse(error);
  }
}
