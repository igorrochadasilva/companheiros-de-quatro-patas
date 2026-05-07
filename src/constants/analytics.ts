export const ANALYTICS_EVENTS = {
  pageView: "page_view",
  navigationClick: "navigation_click",
  socialClick: "social_click",
  viewPetList: "view_pet_list",
  filterPets: "filter_pets",
  sortPets: "sort_pets",
  clearFilters: "clear_filters",
  paginate: "paginate",
  adoptionContactWhatsapp: "adoption_contact_whatsapp",
  adoptionContactForm: "adoption_contact_form",
  selectPet: "select_pet",
  startAdoption: "start_adoption",
  donateClick: "donate_click",
  pixCopy: "pix_copy",
  donateTierClick: "donate_tier_click",
  openWhatsapp: "open_whatsapp",
  viewAbrigo: "view_abrigo",
  expandMilestone: "expand_milestone",
  openEmail: "open_email",
  submitContact: "submit_contact",
  contactSuccess: "contact_success",
  contactError: "contact_error",
  prefillContact: "prefill_contact",
  viewTransparency: "view_transparency",
} as const;

export type AnalyticsEventName =
  (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
