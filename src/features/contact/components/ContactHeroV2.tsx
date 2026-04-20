import { contactMessages } from "@/messages";
import { Typography } from "@/shared/ui/typography";
import type { ContactCmsContent } from "@/types";

const HERO_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD80cWCCvaQyy7PxkTOQaW9wIWXcLy3_kUxLF0RYx11grssuStm4kra97nzbsi63j_MJOUfr5-T488K7z3wSltPCeHJm7hcS28a1P4Pw98zSQvrxz075i2LhUe5HFmDjAQYgT_EgsxGPySz60hI444T-qJjsbURttYZjnNE0moAtH4rhwGhqZTN2Cmim2bjdBOCDSTG5qKDYigN6PdEkTcqXtysKGv46BdyFaxw-DH0SEd-K7rBVeAHT0C696YJeBliG6ejidld5Z4";

export function ContactHeroV2({ cms }: { cms?: ContactCmsContent }) {
  const imageUrl = cms?.heroImageUrl ?? HERO_IMAGE_URL;
  const imageAlt = cms?.heroImageAlt ?? "Ilustracao de um gato simpatico";

  return (
    <section className="mx-auto w-full max-w-[1280px] px-6 pb-8 pt-4 md:px-10 md:pb-20 md:pt-12">
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
          <img
            src={imageUrl}
            alt={imageAlt}
            className="h-[460px] w-full rounded-2xl object-cover shadow-xl"
          />
          <div className="absolute -bottom-5 left-5 max-w-[290px] rounded-2xl border border-white/30 bg-[#faf7f2]/85 p-5 shadow-lg backdrop-blur-sm">
            <Typography as="p" variant="v2Body" className="italic !text-[#f3af3d]">
              "O amor nao precisa de palavras, mas nos adoramos conversar sobre ele."
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
