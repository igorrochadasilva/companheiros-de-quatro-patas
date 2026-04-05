"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { useDonationConfig } from "@/features/donatation/hooks/useDonationConfig";
import { useStats } from "@/features/donatation/hooks/useStats";
import { useStories } from "@/features/donatation/hooks/useStories";
import { useTransparencySummary } from "@/features/donatation/hooks/useTransparencySummary";
import { donateMessages } from "@/messages";
import { useWhenVisible } from "@/shared/hooks/useWhenVisible";
import { track } from "@/shared/lib/analytics";

import { type PixCopySource, toWhatsappUrl } from "./donatation.utils";
import { DonatationFaqSection } from "./DonatationFaqSection";
import { DonatationHeroSection } from "./DonatationHeroSection";
import { DonatationImpactSection } from "./DonatationImpactSection";
import { DonatationItemsSection } from "./DonatationItemsSection";
import { DonatationPixSection } from "./DonatationPixSection";
import { DonatationRecurringSection } from "./DonatationRecurringSection";
import { DonatationTransparencySection } from "./DonatationTransparencySection";

export function DonatationContent() {
  const [trackedTransparencyView, setTrackedTransparencyView] = useState(false);
  const [copyingPix, setCopyingPix] = useState(false);

  const {
    data: donationConfig,
    isLoading: isDonationLoading,
    isError: isDonationError,
    refetch: refetchDonationConfig,
  } = useDonationConfig();
  const { data: stats, isLoading: isStatsLoading } = useStats();

  const [impactRef, isImpactVisible] = useWhenVisible({ rootMargin: "120px" });
  const { data: storiesData, isLoading: isStoriesLoading } = useStories({
    enabled: isImpactVisible,
  });

  const [transparencyRef, isTransparencyVisible] = useWhenVisible({
    rootMargin: "120px",
  });
  const {
    data: transparencySummary,
    isLoading: isTransparencyLoading,
    isError: isTransparencyError,
  } = useTransparencySummary({ enabled: isTransparencyVisible });

  useEffect(() => {
    if (!isTransparencyVisible || trackedTransparencyView) return;

    track("view_transparency", { from: "donate_page" });
    setTrackedTransparencyView(true);
  }, [isTransparencyVisible, trackedTransparencyView]);

  async function copyPixKey(source: PixCopySource, tierId?: string) {
    if (!donationConfig?.pixKey) return;

    try {
      setCopyingPix(true);
      await navigator.clipboard.writeText(donationConfig.pixKey);
      toast.success(donateMessages.pix.copySuccess);
      track("pix_copy", { source, tierId });
    } catch {
      toast.error(donateMessages.pix.copyError);
    } finally {
      setCopyingPix(false);
    }
  }

  const whatsappUrl = useMemo(() => {
    if (!donationConfig?.whatsapp || !donationConfig.pixKey) return null;

    return toWhatsappUrl(
      donationConfig.whatsapp,
      donateMessages.pix.whatsappPrefilledMessage.replace(
        "{pixKey}",
        donationConfig.pixKey,
      ),
    );
  }, [donationConfig]);

  const highlightStories = storiesData?.items.slice(0, 2) ?? [];

  return (
    <div className="space-y-16">
      <DonatationHeroSection
        isStatsLoading={isStatsLoading}
        inTreatmentCount={stats?.inTreatmentCount}
        totalSpent={transparencySummary?.totalSpent}
        adoptedCount={stats?.adoptedCount}
      />

      <DonatationPixSection
        donationConfig={donationConfig}
        isDonationLoading={isDonationLoading}
        isDonationError={isDonationError}
        copyingPix={copyingPix}
        whatsappUrl={whatsappUrl}
        onRetry={() => refetchDonationConfig()}
        onCopyPixKey={copyPixKey}
      />

      <DonatationRecurringSection donationConfig={donationConfig} />
      <DonatationItemsSection />

      <DonatationImpactSection
        impactRef={impactRef}
        isStoriesLoading={isStoriesLoading}
        highlightStories={highlightStories}
      />

      <DonatationTransparencySection
        transparencyRef={transparencyRef}
        isTransparencyLoading={isTransparencyLoading}
        isTransparencyError={isTransparencyError}
        transparencySummary={transparencySummary}
      />

      <DonatationFaqSection />
    </div>
  );
}
