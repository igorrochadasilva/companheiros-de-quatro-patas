import "server-only";

import { getContentfulEntries } from "@/backend/infrastructure/contentful/client";
import { isContentfulConfigured } from "@/backend/infrastructure/contentful/config";
import { type AdoptionCmsContent, emptyAdoptionCmsContent } from "@/types";

type AdoptPageEntryLike = {
  fields?: {
    adoptionTitle?: unknown;
    adoptionSubtitle?: unknown;
  };
  sys?: { id?: string };
};

type ApplicationResult<T> = {
  data: T;
  status: number;
};

function resolveTextField(field: unknown) {
  return typeof field === "string" && field.trim() ? field : null;
}

function mapEntry(entry: AdoptPageEntryLike | undefined): AdoptionCmsContent {
  const fields = entry?.fields;
  return {
    adoptionTitle: resolveTextField(fields?.adoptionTitle),
    adoptionSubtitle: resolveTextField(fields?.adoptionSubtitle),
    entryId: entry?.sys?.id ?? null,
  };
}

export async function getAdoptionCmsContent(): Promise<
  ApplicationResult<AdoptionCmsContent>
> {
  if (!isContentfulConfigured()) {
    return { data: emptyAdoptionCmsContent(), status: 200 };
  }

  try {
    const response = await getContentfulEntries({
      content_type: "adoptPage",
      limit: 1,
    });

    const entry = response.items[0] as AdoptPageEntryLike | undefined;
    return { data: mapEntry(entry), status: 200 };
  } catch {
    return { data: emptyAdoptionCmsContent(), status: 500 };
  }
}
