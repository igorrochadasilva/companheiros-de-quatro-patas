"use client";

import { useEffect } from "react";

import { useShelterProgress } from "@/features/shelter/hooks/useShelterProgress";

import { shelterMessages } from "@/messages";
import { track } from "@/shared/lib/analytics";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Muted } from "@/shared/ui/typography";

import { resolvePercentComplete, toWhatsappUrl } from "./shelter.utils";
import { ShelterBudgetSection } from "./ShelterBudgetSection";
import { ShelterDonateSection } from "./ShelterDonateSection";
import { ShelterFaqSection } from "./ShelterFaqSection";
import { ShelterHeroSection } from "./ShelterHeroSection";
import { ShelterMilestonesSection } from "./ShelterMilestonesSection";
import { ShelterMissingSection } from "./ShelterMissingSection";
import { ShelterUpdatesSection } from "./ShelterUpdatesSection";

function ShelterLoadingState() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-80 rounded" />
      <Skeleton className="h-6 w-full rounded" />
      <Card>
        <CardContent className="space-y-3 p-6">
          <Skeleton className="h-12 w-28 rounded" />
          <Skeleton className="h-3 w-full rounded" />
        </CardContent>
      </Card>
      <div className="grid gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="space-y-2 p-4">
              <Skeleton className="h-8 w-24 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function ShelterContent() {
  const {
    data,
    isLoading,
    isError,
    refetch: refetchProgress,
  } = useShelterProgress();

  useEffect(() => {
    track("view_abrigo");
  }, []);

  if (isLoading) return <ShelterLoadingState />;

  if (isError || !data) {
    return (
      <Alert variant="destructive">
        <AlertTitle>{shelterMessages.error.title}</AlertTitle>
        <AlertDescription className="space-y-3">
          <Muted>{shelterMessages.error.description}</Muted>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => refetchProgress()}
          >
            {shelterMessages.error.retry}
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const percentComplete = resolvePercentComplete(
    data.percentComplete,
    data.milestones,
  );
  const whatsappUrl =
    data.donation.whatsapp && data.donation.pixKey
      ? toWhatsappUrl(
          data.donation.whatsapp,
          shelterMessages.donate.whatsappPrefilledMessage.replace(
            "{pixKey}",
            data.donation.pixKey,
          ),
        )
      : null;

  return (
    <div className="space-y-16">
      <ShelterHeroSection
        title={shelterMessages.hero.title}
        subtitle={shelterMessages.hero.subtitle}
        ctaPrimary={shelterMessages.hero.primaryCta}
        ctaSecondary={shelterMessages.hero.secondaryCta}
        progressHint={shelterMessages.hero.progressHint}
        progressAriaLabel={shelterMessages.hero.progressAriaLabel}
        goalLabel={shelterMessages.hero.goalLabel}
        raisedLabel={shelterMessages.hero.raisedLabel}
        remainingLabel={shelterMessages.hero.remainingLabel}
        goalAmount={data.goalAmount}
        raisedAmount={data.raisedAmount}
        remainingAmount={data.remainingAmount}
        percentComplete={percentComplete}
      />

      <ShelterBudgetSection
        title={shelterMessages.budget.title}
        transparencyCta={shelterMessages.budget.transparencyCta}
        plannedLabel={shelterMessages.budget.plannedLabel}
        spentLabel={shelterMessages.budget.spentLabel}
        milestones={data.milestones}
      />

      <ShelterMilestonesSection
        title={shelterMessages.milestones.title}
        filterAllLabel={shelterMessages.milestones.filters.all}
        filterInProgressLabel={shelterMessages.milestones.filters.inProgress}
        filterPendingLabel={shelterMessages.milestones.filters.pending}
        statusDoneLabel={shelterMessages.milestones.status.done}
        statusInProgressLabel={shelterMessages.milestones.status.inProgress}
        statusPendingLabel={shelterMessages.milestones.status.pending}
        weightLabelSuffix={shelterMessages.milestones.weightSuffix}
        plannedLabel={shelterMessages.milestones.plannedLabel}
        spentLabel={shelterMessages.milestones.spentLabel}
        helpCta={shelterMessages.milestones.helpCta}
        milestones={data.milestones}
      />

      <ShelterMissingSection
        title={shelterMessages.missing.title}
        cta={shelterMessages.missing.cta}
        missingStepsLabel={shelterMessages.missing.missingStepsLabel}
        remainingEstimateLabel={shelterMessages.missing.remainingEstimateLabel}
        milestones={data.milestones}
      />

      <ShelterUpdatesSection
        title={shelterMessages.updates.title}
        cta={shelterMessages.updates.cta}
        updates={data.updates ?? []}
      />

      <ShelterDonateSection
        title={shelterMessages.donate.title}
        subtitle={shelterMessages.donate.subtitle}
        pixLabel={shelterMessages.donate.pixLabel}
        unavailableTitle={shelterMessages.donate.unavailableTitle}
        unavailableDescription={shelterMessages.donate.unavailableDescription}
        qrAlt={shelterMessages.donate.qrAlt}
        qrUnavailable={shelterMessages.donate.qrUnavailable}
        pixKey={data.donation.pixKey}
        pixQrUrl={data.donation.pixQrUrl}
        whatsappUrl={whatsappUrl}
        whatsappCta={shelterMessages.donate.whatsappCta}
        copyCta={shelterMessages.donate.copyCta}
        copyAriaLabel={shelterMessages.donate.copyAriaLabel}
        copySuccess={shelterMessages.donate.copySuccess}
        copyError={shelterMessages.donate.copyError}
        pixInputAriaLabel={shelterMessages.donate.pixInputAriaLabel}
      />

      <ShelterFaqSection
        title={shelterMessages.faq.title}
        items={shelterMessages.faq.items}
        cta={shelterMessages.faq.cta}
      />
    </div>
  );
}
