import { NextRequest, NextResponse } from "next/server";

import { buildErrorResponse } from "@/app/api/_shared/route-error";
import { createAdoptionRequest } from "@/backend/modules/adoption-requests/application/create-adoption-request";
import { listAdoptionRequests } from "@/backend/modules/adoption-requests/application/list-adoption-requests";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") ?? "1");
    const pageSize = Number(searchParams.get("pageSize") ?? "20");
    const petId = searchParams.get("petId");
    const status = searchParams.get("status");

    const response = await listAdoptionRequests({
      page,
      pageSize,
      petId: petId?.trim() ? petId : null,
      status: status?.trim() ? status : null,
    });

    return NextResponse.json(response);
  } catch (error) {
    return buildErrorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const adoptionRequest = await createAdoptionRequest(body);
    return NextResponse.json(adoptionRequest, { status: 201 });
  } catch (error) {
    return buildErrorResponse(error);
  }
}
