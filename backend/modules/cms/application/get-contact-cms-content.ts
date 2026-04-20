import "server-only";

import { getContentfulEntries } from "@/backend/infrastructure/contentful/client";
import { isContentfulConfigured } from "@/backend/infrastructure/contentful/config";
import { type ContactCmsContent, emptyContactCmsContent } from "@/types";

type ContactPageEntryLike = {
  fields?: Record<string, unknown>;
  sys?: { id?: string };
};

type ContentfulAssetLike = {
  fields?: {
    title?: unknown;
    file?: { url?: unknown };
  };
};

type ApplicationResult<T> = {
  data: T;
  status: number;
};

function resolveAssetUrl(url: unknown) {
  if (typeof url !== "string" || !url) return null;
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

function resolveTextField(field: unknown) {
  return typeof field === "string" && field.trim() ? field : null;
}

function mapContactEntry(
  entry: ContactPageEntryLike | undefined,
): ContactCmsContent {
  const fields = entry?.fields ?? {};
  const heroAsset = fields.heroImage as ContentfulAssetLike | undefined;

  return {
    ...emptyContactCmsContent(),
    entryId: entry?.sys?.id ?? null,
    heroImageUrl: resolveAssetUrl(heroAsset?.fields?.file?.url),
    heroImageAlt: resolveTextField(heroAsset?.fields?.title),
  };
}

export async function getContactCmsContent(): Promise<
  ApplicationResult<ContactCmsContent>
> {
  if (!isContentfulConfigured()) {
    return { data: emptyContactCmsContent(), status: 200 };
  }

  try {
    const response = await getContentfulEntries({
      content_type: "contactPage",
      limit: 1,
      include: 2,
    });

    const entry = response.items[0] as ContactPageEntryLike | undefined;

    if (process.env.NODE_ENV !== "production") {
      console.log("[contentful][contact] entryId:", entry?.sys?.id ?? null);
      console.log(
        "[contentful][contact] fieldKeys:",
        Object.keys(entry?.fields ?? {}),
      );
      console.log("[contentful][contact] rawFields:");
      console.dir(entry?.fields ?? null, { depth: null });
      console.log("[contentful][contact] fieldsPreview:", {
        hasHeroImage: Boolean(entry?.fields?.heroImage),
      });
    }

    return { data: mapContactEntry(entry), status: 200 };
  } catch {
    return { data: emptyContactCmsContent(), status: 500 };
  }
}

