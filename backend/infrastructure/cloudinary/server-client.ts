import "server-only";

import { v2 as cloudinary } from "cloudinary";

import { requireEnv } from "@/backend/shared/env";

let configured = false;

function ensureCloudinaryConfigured() {
  if (configured) return;

  cloudinary.config({
    cloud_name: requireEnv("CLOUDINARY_CLOUD_NAME"),
    api_key: requireEnv("CLOUDINARY_API_KEY"),
    api_secret: requireEnv("CLOUDINARY_API_SECRET"),
    secure: true,
  });

  configured = true;
}

export function getCloudinaryClient() {
  ensureCloudinaryConfigured();
  return cloudinary;
}
