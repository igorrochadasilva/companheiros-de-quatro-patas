import { NextRequest, NextResponse } from "next/server";

import { requireAdminApi } from "@/app/api/_shared/require-admin";
import { buildErrorResponse } from "@/app/api/_shared/route-error";
import { createPetMedia } from "@/backend/modules/pets/application/create-pet-media";

export async function POST(request: NextRequest) {
  try {
    const authError = await requireAdminApi();
    if (authError) return authError;

    const body = await request.json();
    const media = await createPetMedia(body);
    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    return buildErrorResponse(error);
  }
}
