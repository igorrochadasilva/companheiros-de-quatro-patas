import Link from "next/link";
import { PawPrintIcon, ScissorsIcon, ShieldCheckIcon } from "lucide-react";

import { PUBLIC_ROUTES } from "@/constants";
import { adoptionMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";

type AdocaoPetDetailMobileContentProps = {
  description: string;
  vaccinated: boolean;
  castrated: boolean;
  whatsappUrl: string;
};

export function AdocaoPetDetailMobileContent({
  description,
  vaccinated,
  castrated,
  whatsappUrl,
}: AdocaoPetDetailMobileContentProps) {
  return (
    <div className="space-y-6 md:hidden">
      <div className="flex flex-wrap gap-2">
        {vaccinated ? (
          <div className="flex items-center gap-2 rounded-full border border-[var(--v2-outline-variant)]/20 bg-[var(--v2-surface-container-low)] px-4 py-2">
            <ShieldCheckIcon className="size-4 text-[var(--v2-secondary)]" />
            <Typography as="span" variant="v2Muted" className="!font-semibold">
              {adoptionMessages.petDetail.status.vaccinated}
            </Typography>
          </div>
        ) : null}
        {castrated ? (
          <div className="flex items-center gap-2 rounded-full border border-[var(--v2-outline-variant)]/20 bg-[var(--v2-surface-container-low)] px-4 py-2">
            <ScissorsIcon className="size-4 text-[var(--v2-secondary)]" />
            <Typography as="span" variant="v2Muted" className="!font-semibold">
              {adoptionMessages.petDetail.status.castrated}
            </Typography>
          </div>
        ) : null}
        <div className="flex items-center gap-2 rounded-full border border-[var(--v2-outline-variant)]/20 bg-[var(--v2-surface-container-low)] px-4 py-2">
          <PawPrintIcon className="size-4 text-[var(--v2-secondary)]" />
          <Typography as="span" variant="v2Muted" className="!font-semibold">
            {adoptionMessages.petDetail.status.available}
          </Typography>
        </div>
      </div>

      <section>
        <Typography as="h3" variant="v2H2" className="mb-3 !text-4xl">
          {adoptionMessages.petDetail.mobileDescriptionTitle}
        </Typography>
        <Typography
          as="p"
          variant="v2Body"
          className="whitespace-pre-wrap leading-relaxed !text-[var(--v2-on-surface-variant)]"
        >
          {description}
        </Typography>
      </section>

      <div className="flex flex-col gap-3">
        <Button
          asChild
          className="h-12 rounded-full bg-[var(--v2-primary)] text-base font-bold text-white hover:bg-[#e7a632]"
        >
          <Link href={whatsappUrl} target="_blank" rel="noreferrer">
            {adoptionMessages.petDetail.whatsappCta}
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-12 rounded-full border-2 border-[var(--v2-primary)] bg-transparent text-base font-bold text-[var(--v2-primary)] hover:bg-[var(--v2-primary)] hover:text-white"
        >
          <Link href={PUBLIC_ROUTES.adoption}>
            {adoptionMessages.petDetail.backToList}
          </Link>
        </Button>
      </div>
    </div>
  );
}

