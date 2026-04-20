"use client";

import { aboutMessages } from "@/messages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Typography } from "@/shared/ui/typography";

export function AboutFaqV2() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 pb-16 md:px-10">
      <Typography
        as="h2"
        variant="v2H2"
        align="center"
        className="mb-8 !text-[2rem] leading-none md:!text-5xl"
      >
        {aboutMessages.v2.faq.title}
      </Typography>
      <Accordion
        type="single"
        collapsible
        defaultValue="about-faq-0"
        className="space-y-3"
      >
        {aboutMessages.v2.faq.items.map((item, index) => (
          <AccordionItem
            key={item.question}
            value={`about-faq-${index}`}
            className="rounded-xl border-0 bg-[#f6ece5] px-4 md:px-5"
          >
            <AccordionTrigger className="text-left text-sm font-semibold text-[#2f2a26] hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm text-[#514535]">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
