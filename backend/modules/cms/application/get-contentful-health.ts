import "server-only";

import { getContentfulEntries } from "@/backend/infrastructure/contentful/client";
import { isContentfulConfigured } from "@/backend/infrastructure/contentful/config";

type ContentfulHealthResponse = {
  ok: boolean;
  message?: string;
  total?: number;
  fetched?: number;
  error?: string;
};

type ApplicationResult<T> = {
  data: T;
  status: number;
};

export async function getContentfulHealth(): Promise<
  ApplicationResult<ContentfulHealthResponse>
> {
  if (!isContentfulConfigured()) {
    return {
      data: {
        ok: false,
        message:
          "Contentful is not configured. Please set CONTENTFUL_SPACE_ID and CONTENTFUL_DELIVERY_ACCESS_TOKEN.",
      },
      status: 503,
    };
  }

  try {
    const response = await getContentfulEntries({ limit: 1 });
    return {
      data: {
        ok: true,
        total: response.total,
        fetched: response.items.length,
      },
      status: 200,
    };
  } catch (error) {
    return {
      data: {
        ok: false,
        message: "Failed to query Contentful.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      status: 500,
    };
  }
}
