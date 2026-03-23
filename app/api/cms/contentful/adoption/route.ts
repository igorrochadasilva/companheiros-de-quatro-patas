import { NextResponse } from "next/server";

import { isContentfulConfigured } from "@/shared/config";
import { getContentfulEntries } from "@/shared/lib/contentful";
import { type AdoptionCmsContent, emptyAdoptionCmsContent } from "@/types";

type AdoptPageEntryLike = {
  fields?: {
    adoptionTitle?: unknown;
    adoptionSubtitle?: unknown;
  };
  sys?: { id?: string };
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

export async function GET() {
  if (!isContentfulConfigured()) {
    return NextResponse.json(emptyAdoptionCmsContent());
  }

  try {
    const response = await getContentfulEntries({
      content_type: "adoptPage",
      limit: 1,
    });

    const entry = response.items[0] as AdoptPageEntryLike | undefined;
    return NextResponse.json(mapEntry(entry));
  } catch {
    return NextResponse.json(emptyAdoptionCmsContent(), { status: 500 });
  }
}
