import "server-only";

import { getContentfulEntries } from "@/backend/infrastructure/contentful/client";
import { isContentfulConfigured } from "@/backend/infrastructure/contentful/config";
import { type AboutCmsContent, emptyAboutCmsContent } from "@/types";

type AboutPageEntryLike = {
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

function parseStoriesImages(field: unknown): string[] | null {
  if (!Array.isArray(field)) return null;

  const urls = field
    .map((assetLike) => {
      const asset = assetLike as ContentfulAssetLike | undefined;
      return resolveAssetUrl(asset?.fields?.file?.url);
    })
    .filter((url): url is string => Boolean(url));

  return urls.length ? urls : null;
}

function mapAboutEntry(entry: AboutPageEntryLike | undefined): AboutCmsContent {
  const fields = entry?.fields ?? {};
  const heroAsset = fields.aboutHeroImage as ContentfulAssetLike | undefined;

  return {
    ...emptyAboutCmsContent(),
    entryId: entry?.sys?.id ?? null,
    heroImageUrl: resolveAssetUrl(heroAsset?.fields?.file?.url),
    heroImageAlt: resolveTextField(heroAsset?.fields?.title),
    storiesImages: parseStoriesImages(fields.storiesOfNewBeginningsImages),
  };
}

export async function getAboutCmsContent(): Promise<
  ApplicationResult<AboutCmsContent>
> {
  if (!isContentfulConfigured()) {
    return { data: emptyAboutCmsContent(), status: 200 };
  }

  try {
    const response = await getContentfulEntries({
      content_type: "aboutPage",
      limit: 1,
      include: 2,
    });

    const entry = response.items[0] as AboutPageEntryLike | undefined;

    if (process.env.NODE_ENV !== "production") {
      console.log("[contentful][about] entryId:", entry?.sys?.id ?? null);
      console.log(
        "[contentful][about] fieldKeys:",
        Object.keys(entry?.fields ?? {}),
      );
      console.log("[contentful][about] rawFields:");
      console.dir(entry?.fields ?? null, { depth: null });
      console.log("[contentful][about] fieldsPreview:", {
        hasAboutHeroImage: Boolean(entry?.fields?.aboutHeroImage),
        hasStoriesOfNewBeginningsImages: Array.isArray(
          entry?.fields?.storiesOfNewBeginningsImages,
        ),
      });
    }

    return { data: mapAboutEntry(entry), status: 200 };
  } catch {
    return { data: emptyAboutCmsContent(), status: 500 };
  }
}
