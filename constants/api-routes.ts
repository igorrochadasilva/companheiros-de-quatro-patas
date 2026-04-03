/**
 * Rotas da API usadas nos services (fetch).
 * Base para chamadas client-side; query params sao montados em cada service.
 */
export const API_ROUTES = {
  stats: "/api/stats",
  pets: "/api/pets",
  donationsConfig: "/api/donations/config",
  transparencySummary: "/api/transparency/summary",
  bazaarFeatured: "/api/bazaar/featured",
  bazaarItems: "/api/bazaar/items",
  stories: "/api/stories",
  contact: "/api/contact",
  shelterProgress: "/api/shelter/progress",
  auth: "/api/auth",
  homeCms: "/api/cms/contentful/home",
  adoptionCms: "/api/cms/contentful/adoption",
};

export type ApiRouteKey = keyof typeof API_ROUTES;
