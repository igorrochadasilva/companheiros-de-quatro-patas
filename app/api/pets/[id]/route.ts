import { NextRequest, NextResponse } from "next/server";

import { requireAdminApi } from "@/app/api/_shared/require-admin";
import { buildErrorResponse } from "@/app/api/_shared/route-error";
import { deletePet } from "@/backend/modules/pets/application/delete-pet";
import { getPetById } from "@/backend/modules/pets/application/get-pet-by-id";
import { updatePet } from "@/backend/modules/pets/application/update-pet";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const authError = await requireAdminApi();
    if (authError) return authError;

    const { id } = await params;
    const pet = await getPetById(id);

    if (!pet) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(pet);
  } catch (error) {
    return buildErrorResponse(error);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const authError = await requireAdminApi();
    if (authError) return authError;

    const { id } = await params;
    const body = await request.json();
    const pet = await updatePet(id, body);
    return NextResponse.json(pet);
  } catch (error) {
    return buildErrorResponse(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const authError = await requireAdminApi();
    if (authError) return authError;

    const { id } = await params;
    await deletePet(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return buildErrorResponse(error);
  }
}
