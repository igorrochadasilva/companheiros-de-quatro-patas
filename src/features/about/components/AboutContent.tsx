"use client";

import { useMemo } from "react";

import { useStats } from "@/features/about/hooks/useStats";
import { useStories } from "@/features/about/hooks/useStories";
import { useWhenVisible } from "@/shared/hooks/useWhenVisible";

import { AboutFaq } from "./AboutFaq";
import { AboutHero } from "./AboutHero";
import { AboutImpact } from "./AboutImpact";
import { AboutMission } from "./AboutMission";
import { AboutPartners } from "./AboutPartners";
import { AboutStories } from "./AboutStories";
import { AboutTeam } from "./AboutTeam";
import { AboutWhatWeDo } from "./AboutWhatWeDo";

export function AboutContent() {
  const { data: stats, isLoading: isStatsLoading } = useStats();

  const [storiesRef, isStoriesVisible] = useWhenVisible<HTMLDivElement>({
    rootMargin: "140px",
  });
  const { data: storiesData, isLoading: isStoriesLoading } = useStories({
    enabled: isStoriesVisible,
  });

  const stories = useMemo(
    () => storiesData?.items.slice(0, 6) ?? [],
    [storiesData],
  );

  return (
    <div className="space-y-16">
      <AboutHero />
      <AboutMission />
      <AboutWhatWeDo />
      <AboutImpact stats={stats} isLoading={isStatsLoading} />
      <div ref={storiesRef}>
        <AboutStories stories={stories} isLoading={isStoriesLoading} />
      </div>
      <AboutTeam />
      <AboutPartners />
      <AboutFaq />
    </div>
  );
}
