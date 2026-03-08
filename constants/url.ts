export const PUBLIC_ROUTES = {
  home: "/",
  adoption: "/adocao",
  donate: "/doar",
  bazaar: "/bazar",
  about: "/sobre",
  contact: "/contato",
  transparency: "/transparencia",
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
  volunteer: "/contato?assunto=voluntariado",
  foster: "/contato?assunto=lar-temporario",
  partnership: "/contato?assunto=parceria",
};

export type PublicRouteKey = keyof typeof PUBLIC_ROUTES;
