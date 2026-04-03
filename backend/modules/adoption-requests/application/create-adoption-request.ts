import "server-only";

import { prisma } from "@/backend/infrastructure/prisma/client";
import {
  type CreateAdoptionRequestInput,
  createAdoptionRequestSchema,
} from "@/backend/modules/adoption-requests/schemas/adoption-request.schema";

export async function createAdoptionRequest(input: CreateAdoptionRequestInput) {
  const payload = createAdoptionRequestSchema.parse(input);

  return prisma.adoptionRequest.create({
    data: payload,
  });
}
