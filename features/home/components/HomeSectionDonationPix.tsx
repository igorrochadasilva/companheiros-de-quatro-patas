"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { PUBLIC_ROUTES } from "@/constants";
import { useDonationConfig } from "@/features/home/hooks/useDonationConfig";
import { useHomeCmsContent } from "@/features/home/hooks/useHomeCmsContent";
import { homeMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Skeleton } from "@/shared/ui/skeleton";
import { H2, Muted } from "@/shared/ui/typography";

const pixCopiedToast = homeMessages.donation.pixCopied;

export function HomeSectionDonationPix() {
  const [copying, setCopying] = useState(false);
  const { data: cms, isPending: isCmsPending } = useHomeCmsContent();
  const { data: donationConfig } = useDonationConfig();
  const pixKey = donationConfig?.pixKey || "pix@companheiros.org.br";

  const title = cms?.donationTitle?.trim() ?? "";
  const impactTitle = cms?.donationImpactTitle?.trim() ?? "";
  const pixLabel = cms?.donationPixLabel?.trim() ?? "";
  const pixCopy = cms?.donationPixCopy?.trim() ?? "";
  const seeMoreWays = cms?.donationSeeMoreWays?.trim() ?? "";
  const seeMoreWaysHref = cms?.donationSeeMoreWaysHref || PUBLIC_ROUTES.donate;

  async function handleCopy() {
    try {
      setCopying(true);
      await navigator.clipboard.writeText(pixKey);
      toast.success(pixCopiedToast);
    } catch {
      toast.error("Não foi possível copiar a chave. Tente novamente.");
    } finally {
      setCopying(false);
    }
  }

  if (isCmsPending) {
    return (
      <section
        id="doar"
        className="scroll-mt-24 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] md:items-center"
      >
        <div className="space-y-3">
          <Skeleton className="h-9 w-56 rounded" />
          <Skeleton className="h-5 w-full max-w-md rounded" />
        </div>
        <Card>
          <CardContent className="flex flex-col gap-3 p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-9 w-40 rounded-md" />
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section
      id="doar"
      className="scroll-mt-24 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.5fr)] md:items-center"
    >
      <div className="space-y-3">
        {title ? <H2>{title}</H2> : null}
        {impactTitle ? (
          <Muted className="text-base">{impactTitle}</Muted>
        ) : null}
      </div>

      <Card>
        <CardContent className="flex flex-col gap-3 p-4">
          <label className="space-y-1">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {pixLabel}
            </span>
            <div className="flex gap-2">
              <Input value={pixKey} readOnly className="font-mono text-xs" />
              <Button
                type="button"
                size="sm"
                variant="primary"
                onClick={handleCopy}
                disabled={copying}
              >
                {pixCopy}
              </Button>
            </div>
          </label>

          {seeMoreWays ? (
            <Button asChild variant="outline" size="sm">
              <Link href={seeMoreWaysHref}>{seeMoreWays}</Link>
            </Button>
          ) : null}
        </CardContent>
      </Card>
    </section>
  );
}
