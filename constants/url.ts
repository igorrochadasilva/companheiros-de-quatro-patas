export const PUBLIC_ROUTES = {
  home: "/",
  login: "/login",
  adoption: "/adocao",
  shelter: "/abrigo",
  donate: "/doar",
  bazaar: "/bazar",
  about: "/sobre",
  contact: "/contato",
  transparency: "/transparencia",
};

export const ADMIN_ROUTES = {
  dashboard: "/dashboard",
  pets: "/dashboard/pets",
  petsImport: "/dashboard/pets/import",
  petDetail: (id: string) => `/dashboard/pets/${id}`,
};

export const PUBLIC_ANCHOR_ROUTES = {
  aboutMission: "/sobre#missao",
  aboutHowWeHelp: "/sobre#como-ajudamos",
  aboutStories: "/sobre#historias",
  aboutTeam: "/sobre#time",
  aboutPartners: "/sobre#parceiros",
  adoptionRules: "/adocao#regras",
};

export const CONTACT_SUBJECT_ROUTES = {
  adoption: "/contato?assunto=adocao",
  donation: "/contato?assunto=doacao",
  volunteer: "/contato?assunto=voluntariado",
  foster: "/contato?assunto=lar-temporario",
  partnership: "/contato?assunto=parceria",
  others: "/contato?assunto=outros",
};

export type PublicRouteKey = keyof typeof PUBLIC_ROUTES;
export type AdminRouteKey = Exclude<keyof typeof ADMIN_ROUTES, "petDetail">;
