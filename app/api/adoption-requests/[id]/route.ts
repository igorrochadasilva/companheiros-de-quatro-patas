import { NextRequest, NextResponse } from "next/server";

import { buildErrorResponse } from "@/app/api/_shared/route-error";
import { deleteAdoptionRequest } from "@/backend/modules/adoption-requests/application/delete-adoption-request";
import { getAdoptionRequestById } from "@/backend/modules/adoption-requests/application/get-adoption-request-by-id";
import { updateAdoptionRequestStatus } from "@/backend/modules/adoption-requests/application/update-adoption-request-status";

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const adoptionRequest = await getAdoptionRequestById(id);

    if (!adoptionRequest) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(adoptionRequest);
  } catch (error) {
    return buildErrorResponse(error);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const adoptionRequest = await updateAdoptionRequestStatus(id, body);
    return NextResponse.json(adoptionRequest);
  } catch (error) {
    return buildErrorResponse(error);
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    await deleteAdoptionRequest(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return buildErrorResponse(error);
  }
}
