export const PUBLIC_ROUTES = {
  home: "/",
  adoption: "/adocao",
  donate: "/doar",
  bazaar: "/bazar",
  about: "/sobre",
  contact: "/contato",
  transparency: "/transparencia",
};

export type PublicRouteKey = keyof typeof PUBLIC_ROUTES;
