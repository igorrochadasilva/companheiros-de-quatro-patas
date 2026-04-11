type FeatureFlagMap = Record<string, boolean>;

const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);
const FALSE_VALUES = new Set(["0", "false", "no", "off"]);

function readFlag(name: string, defaultValue: boolean) {
  const rawValue = process.env[name];
  if (!rawValue) return defaultValue;

  const normalized = rawValue.trim().toLowerCase();
  if (TRUE_VALUES.has(normalized)) return true;
  if (FALSE_VALUES.has(normalized)) return false;

  return defaultValue;
}

function buildFlags<T extends FeatureFlagMap>(
  input: Record<keyof T, { env: string; defaultValue?: boolean }>,
): T {
  const output = {} as T;

  for (const [key, config] of Object.entries(input)) {
    output[key as keyof T] = readFlag(
      config.env,
      config.defaultValue ?? true,
    ) as T[keyof T];
  }

  return output;
}

export const featureFlags = {
  routes: buildFlags({
    adoption: { env: "NEXT_PUBLIC_FLAG_ROUTE_ADOPTION", defaultValue: true },
    shelter: { env: "NEXT_PUBLIC_FLAG_ROUTE_SHELTER", defaultValue: true },
    donate: { env: "NEXT_PUBLIC_FLAG_ROUTE_DONATE", defaultValue: true },
    bazaar: { env: "NEXT_PUBLIC_FLAG_ROUTE_BAZAAR", defaultValue: true },
    about: { env: "NEXT_PUBLIC_FLAG_ROUTE_ABOUT", defaultValue: true },
    contact: { env: "NEXT_PUBLIC_FLAG_ROUTE_CONTACT", defaultValue: true },
    transparency: {
      env: "NEXT_PUBLIC_FLAG_ROUTE_TRANSPARENCY",
      defaultValue: true,
    },
  }),
  header: buildFlags({
    adoption: {
      env: "NEXT_PUBLIC_FLAG_HEADER_LINK_ADOPTION",
      defaultValue: true,
    },
    shelter: {
      env: "NEXT_PUBLIC_FLAG_HEADER_LINK_SHELTER",
      defaultValue: true,
    },
    donate: { env: "NEXT_PUBLIC_FLAG_HEADER_LINK_DONATE", defaultValue: true },
    bazaar: { env: "NEXT_PUBLIC_FLAG_HEADER_LINK_BAZAAR", defaultValue: true },
    about: { env: "NEXT_PUBLIC_FLAG_HEADER_LINK_ABOUT", defaultValue: true },
    contact: {
      env: "NEXT_PUBLIC_FLAG_HEADER_LINK_CONTACT",
      defaultValue: true,
    },
    transparency: {
      env: "NEXT_PUBLIC_FLAG_HEADER_LINK_TRANSPARENCY",
      defaultValue: true,
    },
    supportCta: {
      env: "NEXT_PUBLIC_FLAG_HEADER_SUPPORT_CTA",
      defaultValue: true,
    },
  }),
  home: buildFlags({
    hero: { env: "NEXT_PUBLIC_FLAG_HOME_HERO", defaultValue: true },
    pets: { env: "NEXT_PUBLIC_FLAG_HOME_PETS", defaultValue: true },
    adoptionHow: {
      env: "NEXT_PUBLIC_FLAG_HOME_ADOPTION_HOW",
      defaultValue: true,
    },
    donationPix: {
      env: "NEXT_PUBLIC_FLAG_HOME_DONATION_PIX",
      defaultValue: true,
    },
    transparency: {
      env: "NEXT_PUBLIC_FLAG_HOME_TRANSPARENCY",
      defaultValue: true,
    },
    bazaar: { env: "NEXT_PUBLIC_FLAG_HOME_BAZAAR", defaultValue: true },
    stories: { env: "NEXT_PUBLIC_FLAG_HOME_STORIES", defaultValue: true },
    faq: { env: "NEXT_PUBLIC_FLAG_HOME_FAQ", defaultValue: true },
  }),
} as const;

export type FeatureRouteKey = keyof typeof featureFlags.routes;

export function isFeatureRouteEnabled(route: FeatureRouteKey) {
  return featureFlags.routes[route];
}
