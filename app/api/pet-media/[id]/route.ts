import { NextRequest, NextResponse } from "next/server";

import { requireAdminApi } from "@/app/api/_shared/require-admin";
import { buildErrorResponse } from "@/app/api/_shared/route-error";
import { deletePetMedia } from "@/backend/modules/pets/application/delete-pet-media";
import { updatePetMedia } from "@/backend/modules/pets/application/update-pet-media";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const authError = await requireAdminApi();
    if (authError) return authError;

    const { id } = await params;
    const body = await request.json();
    const media = await updatePetMedia(id, body);
    return NextResponse.json(media);
  } catch (error) {
    return buildErrorResponse(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const authError = await requireAdminApi();
    if (authError) return authError;

    const { id } = await params;
    await deletePetMedia(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return buildErrorResponse(error);
  }
}
