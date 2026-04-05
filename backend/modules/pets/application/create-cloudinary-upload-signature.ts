import "server-only";

import { requireEnv } from "@/backend/shared/env";
import { getCloudinaryClient } from "@/shared/lib/cloudinary/server";

import {
  type CloudinarySignUploadInput,
  cloudinarySignUploadSchema,
} from "../schemas/cloudinary-sign.schema";

type CloudinarySignUploadResponse = {
  apiKey: string;
  cloudName: string;
  folder: string;
  resourceType: "auto";
  signature: string;
  timestamp: number;
};

export async function createCloudinaryUploadSignature(
  input: CloudinarySignUploadInput,
): Promise<CloudinarySignUploadResponse> {
  const payload = cloudinarySignUploadSchema.parse(input);
  const cloudinary = getCloudinaryClient();

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = `pets/${payload.petId}`;

  const signature = cloudinary.utils.api_sign_request(
    {
      folder,
      timestamp,
    },
    requireEnv("CLOUDINARY_API_SECRET"),
  );

  return {
    apiKey: requireEnv("CLOUDINARY_API_KEY"),
    cloudName: requireEnv("CLOUDINARY_CLOUD_NAME"),
    folder,
    resourceType: "auto",
    signature,
    timestamp,
  };
}
