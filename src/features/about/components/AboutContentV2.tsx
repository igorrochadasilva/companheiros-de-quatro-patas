"use client";

import { useStats } from "@/features/about/hooks/useStats";

import { AboutFaqV2 } from "./AboutFaqV2";
import { AboutHeroV2 } from "./AboutHeroV2";
import { AboutHowWeHelpV2 } from "./AboutHowWeHelpV2";
import { AboutImpactV2 } from "./AboutImpactV2";
import { AboutMissionV2 } from "./AboutMissionV2";
import { AboutPartnersV2 } from "./AboutPartnersV2";
import { AboutStoriesV2 } from "./AboutStoriesV2";
import { AboutTeamV2 } from "./AboutTeamV2";

export function AboutContentV2() {
  const { data: stats } = useStats();

  return (
    <div className="relative left-1/2 w-dvw -translate-x-1/2 overflow-x-clip bg-[#faf7f2] text-[#2f2a26] [font-family:var(--font-v2-body)]">
      <AboutHeroV2 />
      <AboutMissionV2 />
      <AboutHowWeHelpV2 />
      <AboutImpactV2 stats={stats} />
      <AboutStoriesV2 />
      <AboutTeamV2 />
      <AboutPartnersV2 />
      <AboutFaqV2 />
    </div>
  );
}
