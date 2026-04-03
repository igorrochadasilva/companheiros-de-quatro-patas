import "server-only";

import { prisma } from "@/backend/infrastructure/prisma/client";
import {
  type UpdateAdoptionRequestStatusInput,
  updateAdoptionRequestStatusSchema,
} from "@/backend/modules/adoption-requests/schemas/adoption-request.schema";

export async function updateAdoptionRequestStatus(
  id: string,
  input: UpdateAdoptionRequestStatusInput,
) {
  const payload = updateAdoptionRequestStatusSchema.parse(input);

  return prisma.adoptionRequest.update({
    where: { id },
    data: payload,
  });
}
