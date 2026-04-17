import "server-only";

import { getContentfulEntries } from "@/backend/infrastructure/contentful/client";
import { isContentfulConfigured } from "@/backend/infrastructure/contentful/config";
import {
  emptyHomeCmsContent,
  type HomeCmsAdoptionStep,
  type HomeCmsContent,
  type HomeCmsFaqItem,
  type HomeCmsImpactStory,
} from "@/types";

type HomeEntryLike = {
  fields?: Record<string, unknown>;
  sys?: {
    id?: string;
  };
};

type ApplicationResult<T> = {
  data: T;
  status: number;
};

type ContentfulAssetLike = {
  fields?: {
    title?: unknown;
    file?: { url?: unknown };
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

function resolvePixKeyField(field: unknown): string | null {
  const value = resolveTextField(field);
  if (!value) return null;

  const normalized = value.toLowerCase();
  // Avoid treating label-like placeholders as actual PIX keys.
  if (
    normalized === "chave pix" ||
    normalized === "pix key" ||
    normalized.includes("chave pix")
  ) {
    return null;
  }

  return value;
}

function resolveHeroImage(entry: HomeEntryLike | undefined) {
  const heroImage = entry?.fields?.heroImage as ContentfulAssetLike | undefined;
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

function parseFaqItemsFromObject(field: unknown): HomeCmsFaqItem[] | null {
  const raw = normalizeJsonField(field);
  const arr = unwrapArray(raw, ["items", "faq", "questions", "faqItems"]);
  if (!arr) return null;

  const out: HomeCmsFaqItem[] = [];
  for (const row of arr) {
    if (!row || typeof row !== "object") continue;
    const question = resolveTextField((row as { question?: unknown }).question);
    const answer = resolveTextField((row as { answer?: unknown }).answer) ?? "";
    if (question) out.push({ question, answer });
  }
  return out.length ? out : null;
}

function resolveStoryImageUrl(row: Record<string, unknown>): string | null {
  const direct = resolveAssetUrl(row.imageUrl);
  if (direct) return direct;

  const image = row.image as ContentfulAssetLike | undefined;
  return resolveAssetUrl(image?.fields?.file?.url);
}

function parseHistoryImages(field: unknown): string[] {
  if (!Array.isArray(field)) return [];

  const out: string[] = [];
  for (const item of field) {
    const asset = item as ContentfulAssetLike | undefined;
    const url = resolveAssetUrl(asset?.fields?.file?.url);
    if (url) out.push(url);
  }
  return out;
}

function parseHistoryInfoRows(field: unknown): Array<Record<string, unknown>> {
  const raw = normalizeJsonField(field);
  const arr = unwrapArray(raw, [
    "items",
    "stories",
    "history",
    "historyInfo",
    "cards",
  ]);
  if (!arr) return [];

  return arr.filter(
    (row): row is Record<string, unknown> =>
      Boolean(row) && typeof row === "object",
  );
}

function parseImpactStoriesFromHistoryFields(
  historyImagesField: unknown,
  historyInfoField: unknown,
): HomeCmsImpactStory[] | null {
  const images = parseHistoryImages(historyImagesField);
  const rows = parseHistoryInfoRows(historyInfoField);
  if (!images.length && !rows.length) return null;

  const maxLength = Math.max(images.length, rows.length);
  const out: HomeCmsImpactStory[] = [];

  for (let index = 0; index < maxLength; index += 1) {
    const row = rows[index] ?? {};
    const title = resolveTextField(row.title ?? row.titulo);
    const text = resolveTextField(
      row.text ?? row.texto ?? row.summary ?? row.quote,
    );
    const family = resolveTextField(
      row.family ?? row.dono ?? row.byline ?? row.author,
    );
    const imageUrl = images[index] ?? resolveStoryImageUrl(row);

    if (title && text && family && imageUrl) {
      out.push({ imageUrl, title, text, family });
    }
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
  const impactStoriesFromHistory = parseImpactStoriesFromHistoryFields(
    fields?.historyImages,
    fields?.historyInfo,
  );

  const base = emptyHomeCmsContent();
  return {
    ...base,
    entryId: entry?.sys?.id ?? null,
    heroImageUrl: hero.heroImageUrl,
    heroImageAlt: hero.heroImageAlt,
    adoptionHowSteps: parseAdoptionStepsFromObject(
      fields?.adoptionHowStepsJson,
    ),
    donationPixKey: resolvePixKeyField(
      fields?.donationPixLabel ?? fields?.donationPixKey ?? fields?.pixKey,
    ),
    impactStories: impactStoriesFromHistory,
    faqItems: parseFaqItemsFromObject(fields?.faqItems),
  };
}

export async function getHomeCmsContent(): Promise<
  ApplicationResult<HomeCmsContent>
> {
  if (!isContentfulConfigured()) {
    return { data: emptyHomeCmsContent(), status: 200 };
  }

  try {
    const response = await getContentfulEntries({
      content_type: "home",
      limit: 1,
      include: 2,
    });

    const entry = response.items[0] as HomeEntryLike | undefined;
    if (process.env.NODE_ENV !== "production") {
      console.log("[contentful][home] entryId:", entry?.sys?.id ?? null);
      console.log(
        "[contentful][home] fieldKeys:",
        Object.keys(entry?.fields ?? {}),
      );
      console.log("[contentful][home] rawFields:");
      console.dir(entry?.fields ?? null, { depth: null });
      console.log("[contentful][home] fieldsPreview:", {
        donationPixLabel: entry?.fields?.donationPixLabel ?? null,
        hasHeroImage: Boolean(entry?.fields?.heroImage),
        hasFaqItems: Boolean(entry?.fields?.faqItems),
        hasAdoptionHowStepsJson: Boolean(entry?.fields?.adoptionHowStepsJson),
        hasHistoryImages: Array.isArray(entry?.fields?.historyImages),
        hasHistoryInfo: Boolean(entry?.fields?.historyInfo),
      });
    }
    return { data: mapHomeEntry(entry), status: 200 };
  } catch {
    return { data: emptyHomeCmsContent(), status: 500 };
  }
}
