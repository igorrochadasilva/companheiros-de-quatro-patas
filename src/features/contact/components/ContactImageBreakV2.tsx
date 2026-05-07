import { Skeleton } from "@/shared/ui/skeleton";
import { Typography } from "@/shared/ui/typography";
import type { ContactCmsContent } from "@/types";

type ContactImageBreakV2Props = {
  cms?: ContactCmsContent;
  isCmsLoading?: boolean;
};

export function ContactImageBreakV2({
  cms,
  isCmsLoading = false,
}: ContactImageBreakV2Props) {
  const imageUrl = cms?.heroImageUrl;
  const imageAlt = cms?.heroImageAlt ?? "Caes felizes em um jardim";

  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pb-12 md:hidden">
      <div className="relative h-48 overflow-hidden rounded-3xl">
        {isCmsLoading || !imageUrl ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#2f2a26]/70 to-transparent p-6">
          <Typography as="p" variant="v2Body" className="italic !text-white">
            Sua ajuda salva vidas diariamente.
          </Typography>
        </div>
      </div>
    </section>
  );
}
