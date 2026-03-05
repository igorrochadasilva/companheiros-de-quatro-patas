import type { PetFilters, PetSort } from "@/types";

export function parsePetFiltersFromSearchParams(
  searchParams: URLSearchParams,
): PetFilters {
  const species = searchParams.get("species") as PetFilters["species"];
  const size = searchParams.get("size") as PetFilters["size"];
  const ageGroup = searchParams.get("ageGroup") as PetFilters["ageGroup"];
  const city = searchParams.get("city") ?? undefined;
  const urgentOnly = searchParams.get("urgentOnly") === "1";

  return {
    species: species ?? undefined,
    size: size ?? undefined,
    ageGroup: ageGroup ?? undefined,
    city,
    urgentOnly,
  };
}

export function toPetFiltersSearchParams(filters: PetFilters): URLSearchParams {
  const params = new URLSearchParams();

  if (filters.species) params.set("species", filters.species);
  if (filters.size) params.set("size", filters.size);
  if (filters.ageGroup) params.set("ageGroup", filters.ageGroup);
  if (filters.city) params.set("city", filters.city);
  if (filters.urgentOnly) params.set("urgentOnly", "1");

  return params;
}

const ADOPTION_SORT_VALUES: PetSort[] = [
  "recent",
  "urgent",
  "age_asc",
  "age_desc",
  "name_asc",
];

export type AdoptionSearchState = {
  filters: PetFilters;
  page: number;
  sort: PetSort;
};

export function parseAdoptionSearchParams(
  searchParams: URLSearchParams,
): AdoptionSearchState {
  const filters = parsePetFiltersFromSearchParams(searchParams);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const sortParam = searchParams.get("sort");
  const sort: PetSort =
    sortParam && ADOPTION_SORT_VALUES.includes(sortParam as PetSort)
      ? (sortParam as PetSort)
      : "recent";

  return { filters, page, sort };
}

export function toAdoptionSearchParams(
  state: AdoptionSearchState,
): URLSearchParams {
  const params = toPetFiltersSearchParams(state.filters);
  if (state.page > 1) params.set("page", String(state.page));
  if (state.sort !== "recent") params.set("sort", state.sort);
  return params;
}
