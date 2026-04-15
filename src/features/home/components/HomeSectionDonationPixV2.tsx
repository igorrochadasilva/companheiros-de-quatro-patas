"use client";

import { CopyIcon, HandHeartIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { useDonationConfig } from "@/features/home/hooks/useDonationConfig";
import { homeMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";

const pixCopiedToast = homeMessages.donation.pixCopied;

export function HomeSectionDonationPixV2() {
  const [copying, setCopying] = useState(false);
  const { data: donationConfig } = useDonationConfig();
  const pixKey = donationConfig?.pixKey || "pix@companheiros.org.br";

  async function handleCopy() {
    try {
      setCopying(true);
      await navigator.clipboard.writeText(pixKey);
      toast.success(pixCopiedToast);
    } catch {
      toast.error("Nao foi possivel copiar a chave. Tente novamente.");
    } finally {
      setCopying(false);
    }
  }

  return (
    <section
      id="doar"
      className="v2-section scroll-mt-24 bg-[var(--v2-secondary)] text-[var(--v2-on-secondary)]"
    >
      <div className="v2-container mx-auto flex max-w-4xl flex-col items-center gap-12 md:flex-row">
        <div className="flex-1">
          <Typography as="h2" variant="v2H2" className="mb-6 text-[var(--v2-on-secondary)]">
            {homeMessages.donation.v2.title}
          </Typography>
          <Typography
            as="p"
            variant="v2Body"
            className="text-lg leading-relaxed text-[var(--v2-on-secondary)]/90"
          >
            {homeMessages.donation.v2.impactTitle}
          </Typography>
        </div>

        <div className="w-full min-w-[320px] md:w-auto">
          <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-xl">
            <Typography
              as="p"
              variant="v2Label"
              className="mb-4 text-sm tracking-[0.16em] text-[var(--v2-on-secondary)]/70"
            >
              {homeMessages.donation.v2.pixLabel}
            </Typography>

            <div className="mb-6 flex items-center justify-between rounded-xl bg-[var(--v2-surface)] p-4 text-[var(--v2-on-surface)]">
              <code className="text-sm font-bold">{pixKey}</code>
              <Button
                type="button"
                variant="ghost"
                onClick={handleCopy}
                disabled={copying}
                className="h-auto p-0 text-[var(--v2-on-surface)] transition-colors hover:bg-transparent hover:text-[var(--v2-primary)] disabled:cursor-not-allowed disabled:opacity-60"
                aria-label={homeMessages.donation.v2.pixCopy}
              >
                <CopyIcon className="size-5" />
              </Button>
            </div>

            <Button
              type="button"
              onClick={handleCopy}
              disabled={copying}
              className="h-14 w-full rounded-full bg-[var(--v2-primary-container)] font-bold text-[var(--v2-on-primary-container)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <HandHeartIcon className="size-4" aria-hidden />
              {homeMessages.donation.v2.pixCopy}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
