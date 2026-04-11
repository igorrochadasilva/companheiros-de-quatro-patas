import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { donateMessages } from "@/messages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { H2 } from "@/shared/ui/typography";

export function DonatationFaqSection() {
  return (
    <section id="faq" className="space-y-4">
      <H2>{donateMessages.faq.title}</H2>
      <Accordion type="single" collapsible className="rounded-lg border px-4">
        {donateMessages.faq.items.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button asChild variant="outline">
        <Link href={PUBLIC_ROUTES.contact}>
          {donateMessages.faq.contactCta}
        </Link>
      </Button>
    </section>
  );
}
