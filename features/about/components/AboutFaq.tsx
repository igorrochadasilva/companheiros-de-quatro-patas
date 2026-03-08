import messages from "@/messages/pt-br.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { H2 } from "@/shared/ui/typography";

const aboutMessages = messages.about;

export function AboutFaq() {
  return (
    <section className="space-y-4">
      <H2>{aboutMessages.faq.title}</H2>
      <Accordion type="single" collapsible className="rounded-lg border px-4">
        {aboutMessages.faq.items.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
