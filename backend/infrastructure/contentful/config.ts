import "server-only";

import { requireEnv } from "@/backend/shared/env";

const CONTENTFUL_ENV_DEFAULT = "master";

function readEnv(name: string) {
  return process.env[name]?.trim() ?? "";
}

export interface ContentfulConfig {
  spaceId: string;
  environment: string;
  deliveryAccessToken: string;
  previewAccessToken?: string;
}

export function isContentfulConfigured() {
  return Boolean(
    readEnv("CONTENTFUL_SPACE_ID") &&
    readEnv("CONTENTFUL_DELIVERY_ACCESS_TOKEN"),
  );
}

export function getContentfulConfig(): ContentfulConfig {
  return {
    spaceId: requireEnv("CONTENTFUL_SPACE_ID"),
    environment: readEnv("CONTENTFUL_ENVIRONMENT") || CONTENTFUL_ENV_DEFAULT,
    deliveryAccessToken: requireEnv("CONTENTFUL_DELIVERY_ACCESS_TOKEN"),
    previewAccessToken: readEnv("CONTENTFUL_PREVIEW_ACCESS_TOKEN") || undefined,
  };
}
