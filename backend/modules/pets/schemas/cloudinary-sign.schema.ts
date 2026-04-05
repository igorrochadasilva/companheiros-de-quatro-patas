import { z } from "zod";

export const cloudinarySignUploadSchema = z.object({
  petId: z.string().uuid(),
  fileName: z.string().trim().min(1).max(255).optional(),
  contentType: z.string().trim().min(1).max(120).optional(),
});

export type CloudinarySignUploadInput = z.infer<
  typeof cloudinarySignUploadSchema
>;
