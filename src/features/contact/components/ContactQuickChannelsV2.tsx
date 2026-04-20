import { ArrowRight, Camera, MapPin, MessageCircleMore, Send } from "lucide-react";

import { CONTACT, EMAIL_URL, WHATSAPP_URL } from "@/constants";
import { contactMessages } from "@/messages";
import { track } from "@/shared/lib/analytics";
import { Typography } from "@/shared/ui/typography";

export function ContactQuickChannelsV2() {
  return (
    <section className="bg-[#f5f1ea] py-10 md:py-16">
      <div className="mx-auto grid w-full max-w-[1280px] gap-4 px-6 md:gap-6 md:px-10 lg:grid-cols-3">
        <article className="rounded-2xl border border-black/5 bg-[#ccf2f1] p-6 shadow-sm md:rounded-3xl md:bg-white md:p-8">
          <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#46c2c1]/10">
            <MessageCircleMore className="size-7 text-[#46c2c1]" />
          </div>
          <Typography as="h3" variant="v2H2" className="!text-4xl md:!text-4xl">
            {contactMessages.quickChannels.whatsapp.title}
          </Typography>
          <Typography as="p" variant="v2Muted" className="mt-1 !text-[#514535] md:mt-3">
            <span className="md:hidden">{contactMessages.quickChannels.whatsapp.description}</span>
            <span className="hidden md:inline">
              Resposta imediata para urgencias e duvidas rapidas sobre adocao.
            </span>
          </Typography>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => track("open_whatsapp", { from: "contact_quick_v2" })}
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#46c2c1] max-md:hidden"
          >
            {contactMessages.quickChannels.whatsapp.cta}
            <ArrowRight className="size-4" />
          </a>
        </article>

        <article className="rounded-2xl border border-black/5 bg-[#fee4ba] p-6 shadow-sm md:rounded-3xl md:bg-white md:p-8">
          <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#f3af3d]/20">
            <Send className="size-7 text-[#f3af3d]" />
          </div>
          <Typography as="h3" variant="v2H2" className="!text-4xl">
            {contactMessages.quickChannels.email.title}
          </Typography>
          <Typography as="p" variant="v2Muted" className="mt-1 !text-[#514535] md:mt-3">
            <span className="md:hidden">{contactMessages.quickChannels.email.description}</span>
            <span className="hidden md:inline">
              Para parcerias formais, documentacao e relatos detalhados.
            </span>
          </Typography>
          <a
            href={EMAIL_URL}
            onClick={() => track("open_email", { from: "contact_quick_v2" })}
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#f3af3d] max-md:hidden"
          >
            {contactMessages.quickChannels.email.cta}
            <ArrowRight className="size-4" />
          </a>
        </article>

        <article className="rounded-2xl border border-black/5 bg-[#f5f1ea] p-6 shadow-sm md:rounded-3xl md:bg-white md:p-8">
          <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-[#2f2a26] md:bg-[#46c2c1]/10">
            <MapPin className="size-7 text-white md:hidden" />
            <Camera className="hidden size-7 text-[#46c2c1] md:block" />
          </div>
          <Typography as="h3" variant="v2H2" className="!text-4xl">
            <span className="md:hidden">Sede Fisica</span>
            <span className="hidden md:inline">{contactMessages.quickChannels.instagram.title}</span>
          </Typography>
          <Typography as="p" variant="v2Muted" className="mt-1 !text-[#514535] md:mt-3">
            <span className="md:hidden">Visitas sob agendamento</span>
            <span className="hidden md:inline">{contactMessages.quickChannels.instagram.description}</span>
          </Typography>
          <a
            href={CONTACT.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#46c2c1] max-md:hidden"
          >
            {contactMessages.quickChannels.instagram.cta}
            <ArrowRight className="size-4" />
          </a>
        </article>
      </div>
    </section>
  );
}
