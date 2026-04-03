import { AdoptionRequestStatus } from "@prisma/client";
import { z } from "zod";

export const createAdoptionRequestSchema = z.object({
  petId: z.string().uuid(),
  fullName: z.string().trim().min(3).max(160),
  email: z.string().trim().email().max(255).optional(),
  phone: z.string().trim().min(8).max(40),
  city: z.string().trim().max(120).optional(),
  state: z.string().trim().max(2).optional(),
  message: z.string().trim().max(4000).optional(),
});

export const updateAdoptionRequestStatusSchema = z.object({
  status: z.nativeEnum(AdoptionRequestStatus),
});

export type CreateAdoptionRequestInput = z.infer<
  typeof createAdoptionRequestSchema
>;
export type UpdateAdoptionRequestStatusInput = z.infer<
  typeof updateAdoptionRequestStatusSchema
>;
