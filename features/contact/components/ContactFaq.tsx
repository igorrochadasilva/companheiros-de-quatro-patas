import messages from "@/messages/pt-br.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { H2 } from "@/shared/ui/typography";

const contactMessages = messages.contact;

export function ContactFaq() {
  return (
    <section className="space-y-4">
      <H2>{contactMessages.faq.title}</H2>
      <Accordion type="single" collapsible className="rounded-lg border px-4">
        {contactMessages.faq.items.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
