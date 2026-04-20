import { BoltIcon, HeartIcon, MessageCircleIcon } from "lucide-react";
import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { adoptionMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import { Typography } from "@/shared/ui/typography";

type AdocaoPetDetailDesktopSidebarProps = {
  name: string;
  speciesLabel: string;
  sizeLabel: string;
  city: string | null;
  ageTag: string | null;
  vaccinated: boolean;
  castrated: boolean;
  description: string;
  whatsappUrl: string;
};

export function AdocaoPetDetailDesktopSidebar({
  name,
  speciesLabel,
  sizeLabel,
  city,
  ageTag,
  vaccinated,
  castrated,
  description,
  whatsappUrl,
}: AdocaoPetDetailDesktopSidebarProps) {
  const statusTags = [
    vaccinated ? adoptionMessages.petDetail.status.vaccinated : null,
    castrated ? adoptionMessages.petDetail.status.castrated : null,
    ageTag,
  ].filter(Boolean) as string[];

  return (
    <aside className="hidden space-y-5 md:block lg:col-span-5">
      <div className="relative rounded-xl bg-[var(--v2-surface-container-lowest)] p-7 shadow-[0_-4px_20px_rgba(31,27,23,0.04)] md:p-8">
        <button
          type="button"
          aria-label={adoptionMessages.petDetail.aria.favoritePet}
          className="absolute -right-5 -top-5 hidden h-14 w-14 items-center justify-center rounded-full bg-[var(--v2-tertiary)] text-white shadow-lg md:flex"
        >
          <HeartIcon className="size-6 fill-current" />
        </button>

        <div className="mb-6 space-y-1">
          <Typography as="h1" variant="v2H1" className="!text-6xl md:!text-7xl">
            {name}
          </Typography>
          <Typography
            as="p"
            variant="v2Body"
            className="!text-2xl text-[var(--v2-on-surface-variant)]"
          >
            {speciesLabel} - {sizeLabel} -{" "}
            {city ?? adoptionMessages.petDetail.cityFallback}
          </Typography>
        </div>

        <div className="mb-7 flex flex-wrap gap-2">
          {statusTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--v2-secondary-container)] px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--v2-on-secondary-container)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="space-y-4 pb-7">
          <Typography
            as="p"
            variant="v2Body"
            className="whitespace-pre-wrap leading-relaxed !text-[var(--v2-on-surface-variant)]"
          >
            {description}
          </Typography>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            asChild
            className="h-12 rounded-full bg-[var(--v2-primary)] text-base font-bold text-white hover:bg-[#e7a632]"
          >
            <Link href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircleIcon className="mr-2 size-5" />
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

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-[var(--v2-surface-container-low)] p-4">
          <div className="mb-2 flex items-center gap-2 text-[var(--v2-tertiary)]">
            <BoltIcon className="size-4" />
            <Typography as="span" variant="v2Label" className="!text-[10px]">
              {adoptionMessages.petDetail.quickInfo.energyLabel}
            </Typography>
          </div>
          <Typography as="p" variant="v2Body" className="!font-bold">
            {adoptionMessages.petDetail.quickInfo.energyValue}
          </Typography>
        </div>
      </div>
    </aside>
  );
}
