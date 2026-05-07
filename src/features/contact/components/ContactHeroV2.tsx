import { contactMessages } from "@/messages";
import { Skeleton } from "@/shared/ui/skeleton";
import { Typography } from "@/shared/ui/typography";
import type { ContactCmsContent } from "@/types";

type ContactHeroV2Props = {
  cms?: ContactCmsContent;
  isCmsLoading?: boolean;
};

export function ContactHeroV2({
  cms,
  isCmsLoading = false,
}: ContactHeroV2Props) {
  const imageUrl = cms?.heroImageUrl;
  const imageAlt = cms?.heroImageAlt ?? "Ilustracao de um gato simpatico";

  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 pb-8 pt-4 md:px-10 md:pb-20 md:pt-12">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Typography as="h1" variant="v2H1" className="!text-6xl md:!text-7xl">
            {contactMessages.hero.title}
          </Typography>
          <Typography
            as="p"
            variant="v2Muted"
            className="mt-4 max-w-xl !text-lg leading-relaxed text-[#514535] md:mt-5 md:!text-lg"
          >
            {contactMessages.hero.subtitle}
          </Typography>

          <div className="mt-8 flex flex-wrap gap-2">
            <span className="rounded-full border border-[#f3af3d]/20 bg-[#f3af3d] px-4 py-1.5 text-xs font-bold text-white">
              {contactMessages.subjects.adocao}
            </span>
            <span className="rounded-full border border-[#46c2c1]/20 bg-[#ccf2f1] px-4 py-1.5 text-xs font-bold text-[#00504f]">
              {contactMessages.subjects.voluntariado}
            </span>
            <span className="rounded-full border border-[#46c2c1]/20 bg-[#ccf2f1] px-4 py-1.5 text-xs font-bold text-[#00504f]">
              {contactMessages.subjects.doacao}
            </span>
            <span className="rounded-full border border-[#46c2c1]/20 bg-[#ccf2f1] px-4 py-1.5 text-xs font-bold text-[#00504f] md:hidden">
              {contactMessages.subjects.denuncia}
            </span>
            <span className="hidden rounded-full border border-[#d5c4af]/30 bg-[#f5f1ea] px-4 py-1.5 text-xs font-bold text-[#514535]/80 md:inline-flex">
              {contactMessages.subjects.parceria}
            </span>
          </div>
        </div>

        <div className="relative hidden lg:block">
          {isCmsLoading || !imageUrl ? (
            <Skeleton className="h-[460px] w-full rounded-2xl" />
          ) : (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="h-[460px] w-full rounded-2xl object-cover shadow-xl"
            />
          )}
          <div className="absolute -bottom-5 left-5 max-w-[290px] rounded-2xl border border-white/30 bg-[#faf7f2]/85 p-5 shadow-lg backdrop-blur-sm">
            <Typography
              as="p"
              variant="v2Body"
              className="italic !text-[#f3af3d]"
            >
              &quot;O amor nao precisa de palavras, mas nos adoramos conversar
              sobre ele.&quot;
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
