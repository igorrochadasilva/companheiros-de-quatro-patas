"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { track } from "@/shared/lib/analytics";
import {
  parsePetFiltersFromSearchParams,
  toPetFiltersSearchParams,
} from "@/shared/lib/search-params";
import type { PetFilters } from "@/types";

const DEBOUNCE_MS = 300;

export function usePetFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // React Compiler memoiza automaticamente; useMemo não é necessário
  const filters = parsePetFiltersFromSearchParams(searchParams);

  const [cityInput, setCityInput] = useState(filters.city ?? "");
  const searchParamsRef = useRef(searchParams);

  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  // Sincroniza input com a URL quando os filtros vêm de fora (ex.: limpar, voltar, link)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync URL → state ao navegar
    setCityInput(filters.city ?? "");
  }, [filters.city]);

  useEffect(() => {
    const t = setTimeout(() => {
      const current = new URLSearchParams(searchParamsRef.current.toString());
      if (cityInput.trim()) current.set("city", cityInput.trim());
      else current.delete("city");
      const qs = current.toString();
      const newUrl = qs ? `${pathname}?${qs}` : pathname;
      const currentQs = searchParamsRef.current.toString();
      const currentUrl = currentQs ? `${pathname}?${currentQs}` : pathname;
      if (newUrl !== currentUrl) {
        router.replace(newUrl, { scroll: false });
      }
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [cityInput, pathname, router]);

  // React Compiler memoiza automaticamente; useCallback não é necessário
  function updateFilters(next: Partial<PetFilters>) {
    const merged = { ...filters, ...next };
    const params = toPetFiltersSearchParams(merged);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    track("filter_pets", { filters: merged });
  }

  function clearFilters() {
    setCityInput("");
    router.replace(pathname, { scroll: false });
    track("filter_pets", { filters: {} });
  }

  const hasActiveFilters =
    !!filters.species ||
    !!filters.size ||
    !!filters.ageGroup ||
    !!filters.city ||
    !!filters.urgentOnly;

  return {
    filters,
    cityInput,
    setCityInput,
    updateFilters,
    clearFilters,
    hasActiveFilters,
  };
}
