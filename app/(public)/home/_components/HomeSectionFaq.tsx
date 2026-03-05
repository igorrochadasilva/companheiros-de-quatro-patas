"use client";

import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import messages from "@/messages/pt-br.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { H2 } from "@/shared/ui/typography";

const faqMessages = messages.home.faq;

export function HomeSectionFaq() {
  const items = faqMessages.items ?? [];

  return (
    <section className="space-y-6">
      <H2>{faqMessages.title}</H2>

      {items.length > 0 ? (
        <>
          <Accordion type="single" collapsible className="w-full">
            {items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Button asChild variant="outline" size="sm">
            <Link href={PUBLIC_ROUTES.contact}>{faqMessages.contactLink}</Link>
          </Button>
        </>
      ) : (
        <Button asChild variant="outline" size="sm">
          <Link href={PUBLIC_ROUTES.contact}>{faqMessages.contactLink}</Link>
        </Button>
      )}
    </section>
  );
}
