import { NextRequest, NextResponse } from "next/server";

import { requireAdminApi } from "@/app/api/_shared/require-admin";
import { buildErrorResponse } from "@/app/api/_shared/route-error";
import { createCloudinaryUploadSignature } from "@/backend/modules/pets/application/create-cloudinary-upload-signature";

export async function POST(request: NextRequest) {
  try {
    const authError = await requireAdminApi();
    if (authError) return authError;

    const body = (await request.json()) as {
      petId?: string;
      fileName?: string;
      contentType?: string;
    };

    const signature = await createCloudinaryUploadSignature({
      petId: body.petId ?? "",
      fileName: body.fileName,
      contentType: body.contentType,
    });

    return NextResponse.json(signature);
  } catch (error) {
    return buildErrorResponse(error);
  }
}
