import "server-only";

import { createClient } from "contentful";

import { getContentfulConfig } from "@/shared/config";

export interface ContentfulClientOptions {
  preview?: boolean;
}

type ContentfulClient = ReturnType<typeof createClient>;

export type ContentfulGetEntriesQuery = Parameters<
  ContentfulClient["getEntries"]
>[0];

export function getContentfulClient(options: ContentfulClientOptions = {}) {
  const { preview = false } = options;
  const config = getContentfulConfig();

  if (preview && !config.previewAccessToken) {
    throw new Error(
      "[contentful] Missing required env var for preview: CONTENTFUL_PREVIEW_ACCESS_TOKEN",
    );
  }

  return createClient({
    space: config.spaceId,
    environment: config.environment,
    accessToken: preview
      ? (config.previewAccessToken as string)
      : config.deliveryAccessToken,
    host: preview ? "preview.contentful.com" : "cdn.contentful.com",
  });
}

export async function getContentfulEntries(
  query?: ContentfulGetEntriesQuery,
  options?: ContentfulClientOptions,
) {
  const client = getContentfulClient(options);
  return client.getEntries(query);
}
