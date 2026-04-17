const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);
const FALSE_VALUES = new Set(["0", "false", "no", "off"]);

function readFlagFromMany(names: string[], defaultValue: boolean) {
  for (const name of names) {
    const rawValue = process.env[name];
    if (!rawValue) continue;

    const normalized = rawValue.trim().toLowerCase();
    if (TRUE_VALUES.has(normalized)) return true;
    if (FALSE_VALUES.has(normalized)) return false;
  }

  return defaultValue;
}

const globalFeatureFlags = {
  adoption: readFlagFromMany(["NEXT_PUBLIC_FLAG_ADOPTION"], true),
  shelter: readFlagFromMany(["NEXT_PUBLIC_FLAG_SHELTER"], true),
  donate: readFlagFromMany(["NEXT_PUBLIC_FLAG_DONATE"], true),
  bazaar: readFlagFromMany(["NEXT_PUBLIC_FLAG_BAZAAR"], true),
  about: readFlagFromMany(["NEXT_PUBLIC_FLAG_ABOUT"], true),
  contact: readFlagFromMany(["NEXT_PUBLIC_FLAG_CONTACT"], true),
  transparency: readFlagFromMany(["NEXT_PUBLIC_FLAG_TRANSPARENCY"], true),
  hero: readFlagFromMany(["NEXT_PUBLIC_FLAG_HERO"], true),
  stories: readFlagFromMany(["NEXT_PUBLIC_FLAG_STORIES"], true),
  faq: readFlagFromMany(["NEXT_PUBLIC_FLAG_FAQ"], true),
} as const;

export const featureFlags = {
  global: globalFeatureFlags,
  routes: {
    adoption: globalFeatureFlags.adoption,
    shelter: globalFeatureFlags.shelter,
    donate: globalFeatureFlags.donate,
    bazaar: globalFeatureFlags.bazaar,
    about: globalFeatureFlags.about,
    contact: globalFeatureFlags.contact,
    transparency: globalFeatureFlags.transparency,
  },
  header: {
    adoption: globalFeatureFlags.adoption,
    shelter: globalFeatureFlags.shelter,
    donate: globalFeatureFlags.donate,
    bazaar: globalFeatureFlags.bazaar,
    about: globalFeatureFlags.about,
    contact: globalFeatureFlags.contact,
    transparency: globalFeatureFlags.transparency,
    supportCta: globalFeatureFlags.donate,
  },
  home: {
    hero: globalFeatureFlags.hero,
    pets: globalFeatureFlags.adoption,
    adoptionHow: globalFeatureFlags.adoption,
    donationPix: globalFeatureFlags.donate,
    transparency: globalFeatureFlags.transparency,
    bazaar: globalFeatureFlags.bazaar,
    stories: globalFeatureFlags.stories,
    faq: globalFeatureFlags.faq,
  },
} as const;

export type FeatureRouteKey = keyof typeof featureFlags.routes;

export function isFeatureRouteEnabled(route: FeatureRouteKey) {
  return featureFlags.routes[route];
}
