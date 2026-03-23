import { NextResponse } from "next/server";

import { isContentfulConfigured } from "@/shared/config";
import { getContentfulEntries } from "@/shared/lib/contentful";
import {
  emptyHomeCmsContent,
  type HomeCmsAdoptionStep,
  type HomeCmsContent,
  type HomeCmsFaqItem,
} from "@/types";

type HomeEntryLike = {
  fields?: Record<string, unknown>;
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

function resolveHeroImage(entry: HomeEntryLike | undefined) {
  const heroImage = entry?.fields?.heroImage as
    | {
        fields?: {
          title?: unknown;
          file?: { url?: unknown };
        };
      }
    | undefined;
  return {
    heroImageUrl: resolveAssetUrl(heroImage?.fields?.file?.url),
    heroImageAlt: resolveTextField(heroImage?.fields?.title),
  };
}

function normalizeJsonField(field: unknown): unknown {
  if (typeof field === "string") {
    try {
      return JSON.parse(field) as unknown;
    } catch {
      return field;
    }
  }
  return field;
}

/** Contentful Object: array direto ou `{ steps | items | adoptionHowSteps: [...] }`. */
function parseAdoptionStepsFromObject(
  field: unknown,
): HomeCmsAdoptionStep[] | null {
  const raw = normalizeJsonField(field);
  const arr = unwrapArray(raw, ["steps", "items", "adoptionHowSteps"]);
  if (!arr) return null;

  const out: HomeCmsAdoptionStep[] = [];
  for (const row of arr) {
    if (!row || typeof row !== "object") continue;
    const title = resolveTextField((row as { title?: unknown }).title);
    const description = resolveTextField(
      (row as { description?: unknown }).description,
    );
    if (title && description) out.push({ title, description });
  }
  return out.length ? out : null;
}

/** Contentful Object: array direto ou `{ items | faq | questions: [...] }`. */
function parseFaqItemsFromObject(field: unknown): HomeCmsFaqItem[] | null {
  const raw = normalizeJsonField(field);
  const arr = unwrapArray(raw, ["items", "faq", "questions", "faqItems"]);
  if (!arr) return null;

  const out: HomeCmsFaqItem[] = [];
  for (const row of arr) {
    if (!row || typeof row !== "object") continue;
    const question = resolveTextField((row as { question?: unknown }).question);
    const answer = resolveTextField((row as { answer?: unknown }).answer);
    if (question && answer) out.push({ question, answer });
  }
  return out.length ? out : null;
}

function unwrapArray(raw: unknown, objectKeys: string[]): unknown[] | null {
  if (Array.isArray(raw)) return raw;
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  for (const key of objectKeys) {
    const v = o[key];
    if (Array.isArray(v)) return v;
  }
  return null;
}

function mapHomeEntry(entry: HomeEntryLike | undefined): HomeCmsContent {
  const fields = entry?.fields;
  const hero = resolveHeroImage(entry);

  const base = emptyHomeCmsContent();
  return {
    ...base,
    title: resolveTextField(fields?.title),
    subtitle: resolveTextField(fields?.subtitle),
    primaryCtaLabel: resolveTextField(fields?.primaryCtaLabel),
    secondaryCtaLabel: resolveTextField(fields?.secondaryCtaLabel),
    heroImageUrl: hero.heroImageUrl,
    heroImageAlt: hero.heroImageAlt,
    entryId: entry?.sys?.id ?? null,
    petsTitle: resolveTextField(fields?.petsSectionTitle),
    petsSeeAll: resolveTextField(fields?.petsSectionCtaLabel),
    petsSeeAllHref: resolveTextField(fields?.petsSectionCtaHref),
    adoptionHowTitle: resolveTextField(fields?.adoptionHowTitle),
    adoptionHowSubtitle: resolveTextField(fields?.adoptionHowSubtitle),
    adoptionHowCta: resolveTextField(fields?.adoptionHowCtaLabel),
    adoptionHowCtaHref: resolveTextField(fields?.adoptionHowCtaHref),
    adoptionHowSteps: parseAdoptionStepsFromObject(
      fields?.adoptionHowStepsJson,
    ),
    donationTitle: resolveTextField(fields?.donationTitle),
    donationImpactTitle: resolveTextField(fields?.donationSubtitle),
    donationPixLabel: resolveTextField(fields?.donationPixLabel),
    donationPixCopy: resolveTextField(fields?.donationPixCopyLabel),
    donationSeeMoreWays: resolveTextField(fields?.donationMoreWaysLabel),
    donationSeeMoreWaysHref: resolveTextField(fields?.donationMoreWaysHref),
    transparencyTitle: resolveTextField(fields?.transparencyTitle),
    transparencySubtitle: resolveTextField(fields?.transparencySubtitle),
    transparencyCta: resolveTextField(fields?.transparencyCtaLabel),
    transparencyCtaHref: resolveTextField(fields?.transparencyCtaHref),
    bazaarTitle: resolveTextField(fields?.bazaarTitle),
    bazaarSubtitle: resolveTextField(fields?.bazaarSubtitle),
    bazaarCta: resolveTextField(fields?.bazaarCtaLabel),
    bazaarCtaHref: resolveTextField(fields?.bazaarCtaHref),
    storiesTitle: resolveTextField(fields?.storiesTitle),
    storiesSubtitle: resolveTextField(fields?.storiesSubtitle),
    storiesCta: resolveTextField(fields?.storiesCtaLabel),
    storiesCtaHref: resolveTextField(fields?.storiesCtaHref),
    faqTitle: resolveTextField(fields?.faqTitle),
    faqContactLink: resolveTextField(fields?.faqContactLabel),
    faqContactHref: resolveTextField(fields?.faqContactHref),
    faqItems: parseFaqItemsFromObject(fields?.faqItems),
  };
}

export async function GET() {
  if (!isContentfulConfigured()) {
    return NextResponse.json(emptyHomeCmsContent());
  }

  try {
    const response = await getContentfulEntries({
      content_type: "home",
      limit: 1,
      include: 2,
    });

    const entry = response.items[0] as HomeEntryLike | undefined;
    const result = mapHomeEntry(entry);

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(emptyHomeCmsContent(), { status: 500 });
  }
}
