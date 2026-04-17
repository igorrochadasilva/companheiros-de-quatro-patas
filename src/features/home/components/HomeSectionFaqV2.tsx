"use client";

import { useHomeCmsContent } from "@/features/home/hooks/useHomeCmsContent";
import { homeMessages } from "@/messages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Card } from "@/shared/ui/card";
import { Typography } from "@/shared/ui/typography";

export function HomeSectionFaqV2() {
  const { data: cms, isPending } = useHomeCmsContent();
  const cmsItems =
    cms?.faqItems
      ?.map((item) => ({
        question: item.question.trim(),
        answer: item.answer?.trim() ?? "",
      }))
      .filter((item) => item.question.length > 0) ?? [];

  const items =
    cmsItems.length > 0
      ? cmsItems
      : homeMessages.faq.v2.fallbackItems.map((question) => ({
          question,
          answer: "",
        }));

  return (
    <section className="v2-section v2-section-container md:!py-24">
      <div className="v2-container mx-auto max-w-3xl">
        <Typography
          as="h2"
          variant="v2H2"
          align="center"
          className="mb-8 hidden md:block"
        >
          {homeMessages.faq.v2.titleDesktop}
        </Typography>

        <Typography as="h2" variant="v2H2" className="mb-8 text-3xl md:hidden">
          {homeMessages.faq.v2.titleMobile}
        </Typography>

        {isPending ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((skeleton) => (
              <div
                key={skeleton}
                className="h-16 animate-pulse rounded-2xl bg-[var(--v2-surface-container-low)]"
              />
            ))}
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-4">
            {items.slice(0, 4).map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`faq-item-${index}`}
                className="border-none"
              >
                <Card className="v2-editorial-shadow rounded-2xl border-[var(--v2-outline-variant)]/10 bg-[var(--v2-surface)] px-5 py-0 md:px-6">
                  <AccordionTrigger className="py-5 text-sm font-bold text-[var(--v2-on-surface)] no-underline hover:no-underline md:text-base">
                    <span className="text-left">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm text-[var(--v2-on-surface-variant)]">
                    {item.answer ||
                      "Em breve teremos mais detalhes sobre esta pergunta."}
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
}
