import { ADMIN_ROUTES } from "./url";

export const ADMIN_DASHBOARD_NAV_ITEMS = [
  { href: ADMIN_ROUTES.dashboard, labelKey: "overview" },
  { href: ADMIN_ROUTES.pets, labelKey: "pets" },
  { href: ADMIN_ROUTES.petsImport, labelKey: "importPets" },
] as const;

export type AdminDashboardNavItemLabelKey =
  (typeof ADMIN_DASHBOARD_NAV_ITEMS)[number]["labelKey"];
