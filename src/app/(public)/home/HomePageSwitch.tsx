"use client";

import { useSearchParams } from "next/navigation";

import { Home } from "./Home";
import { HomeV2 } from "./HomeV2";

function isTruthyParam(value: string | null) {
  if (!value) return false;
  return ["1", "true", "v2", "yes"].includes(value.trim().toLowerCase());
}

export function HomePageSwitch() {
  const searchParams = useSearchParams();
  const useV2 = isTruthyParam(searchParams.get("layout"));

  return useV2 ? <HomeV2 /> : <Home />;
}
