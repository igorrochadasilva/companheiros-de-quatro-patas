/**
 * Rotas da API usadas nos services (fetch).
 * Base para chamadas client-side; query params são montados em cada service.
 */
export const API_ROUTES = {
  stats: "/api/stats",
  pets: "/api/pets",
  donationsConfig: "/api/donations/config",
  transparencySummary: "/api/transparency/summary",
  bazaarFeatured: "/api/bazaar/featured",
  stories: "/api/stories",
};

export type ApiRouteKey = keyof typeof API_ROUTES;
