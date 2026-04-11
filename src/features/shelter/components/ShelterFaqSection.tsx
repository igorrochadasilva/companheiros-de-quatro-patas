import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Button } from "@/shared/ui/button";
import { H2 } from "@/shared/ui/typography";

interface FaqItem {
  question: string;
  answer: string;
}

interface ShelterFaqSectionProps {
  title: string;
  items: FaqItem[];
  cta: string;
}

export function ShelterFaqSection({
  title,
  items,
  cta,
}: ShelterFaqSectionProps) {
  return (
    <section id="faq" className="space-y-4">
      <H2>{title}</H2>
      <Accordion type="single" collapsible className="rounded-lg border px-4">
        {items.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button asChild variant="outline">
        <Link href={PUBLIC_ROUTES.contact}>{cta}</Link>
      </Button>
    </section>
  );
}
