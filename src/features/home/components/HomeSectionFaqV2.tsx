"use client";

import { ChevronDownIcon } from "lucide-react";

import { useHomeCmsContent } from "@/features/home/hooks/useHomeCmsContent";
import { homeMessages } from "@/messages";
import { Card } from "@/shared/ui/card";
import { Typography } from "@/shared/ui/typography";

export function HomeSectionFaqV2() {
  const { data: cms, isPending } = useHomeCmsContent();
  const cmsQuestions = cms?.faqItems?.map((item) => item.question.trim()) ?? [];
  const questions =
    cmsQuestions.filter(Boolean).length > 0
      ? cmsQuestions.filter(Boolean)
      : homeMessages.faq.v2.fallbackItems;

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
          <div className="space-y-4">
            {questions.slice(0, 4).map((question) => (
              <Card
                key={question}
                className="v2-editorial-shadow cursor-pointer rounded-2xl border-[var(--v2-outline-variant)]/10 bg-[var(--v2-surface)] p-5 md:p-6"
              >
                <div className="flex items-center justify-between gap-4">
                  <Typography
                    as="h3"
                    variant="v2Body"
                    className="text-sm !font-bold md:text-base"
                  >
                    {question}
                  </Typography>
                  <ChevronDownIcon
                    className="size-5 shrink-0 text-[var(--v2-primary)]"
                    aria-hidden
                  />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
