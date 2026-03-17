import { NextResponse } from "next/server";

import { isContentfulConfigured } from "@/shared/config";
import { getContentfulEntries } from "@/shared/lib/contentful";
import type { HomeCmsContent } from "@/types";

type HomeEntryLike = {
  fields?: {
    title?: unknown;
    subtitle?: unknown;
    primaryCtaLabel?: unknown;
    secondaryCtaLabel?: unknown;
    heroImage?: {
      fields?: {
        title?: unknown;
        file?: {
          url?: unknown;
        };
      };
    };
  };
  sys?: {
    id?: string;
  };
};

function resolveAssetUrl(url: unknown) {
  if (typeof url !== "string" || !url) return null;
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

function resolveTextField(field: unknown) {
  return typeof field === "string" && field.trim() ? field : null;
}

export async function GET() {
  if (!isContentfulConfigured()) {
    const fallback: HomeCmsContent = {
      title: null,
      subtitle: null,
      primaryCtaLabel: null,
      secondaryCtaLabel: null,
      heroImageUrl: null,
      heroImageAlt: null,
      entryId: null,
    };
    return NextResponse.json(fallback);
  }

  try {
    const response = await getContentfulEntries({
      content_type: "home",
      limit: 1,
    });

    const entry = response.items[0] as HomeEntryLike | undefined;
    const result: HomeCmsContent = {
      title: resolveTextField(entry?.fields?.title),
      subtitle: resolveTextField(entry?.fields?.subtitle),
      primaryCtaLabel: resolveTextField(entry?.fields?.primaryCtaLabel),
      secondaryCtaLabel: resolveTextField(entry?.fields?.secondaryCtaLabel),
      heroImageUrl: resolveAssetUrl(
        entry?.fields?.heroImage?.fields?.file?.url,
      ),
      heroImageAlt: resolveTextField(entry?.fields?.heroImage?.fields?.title),
      entryId: entry?.sys?.id ?? null,
    };

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        title: null,
        subtitle: null,
        primaryCtaLabel: null,
        secondaryCtaLabel: null,
        heroImageUrl: null,
        heroImageAlt: null,
        entryId: null,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
