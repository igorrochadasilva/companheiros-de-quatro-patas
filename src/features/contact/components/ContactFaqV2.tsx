import { contactMessages } from "@/messages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Typography } from "@/shared/ui/typography";

export function ContactFaqV2() {
  return (
    <section className="bg-[#faf7f2] px-6 py-12 md:bg-[#f5f1ea] md:px-10 md:py-20">
      <div className="mx-auto w-full max-w-4xl">
        <Typography
          as="h2"
          variant="v2H2"
          align="center"
          className="!text-5xl max-md:!text-4xl max-md:!text-left md:!text-5xl"
        >
          {contactMessages.faq.title}
        </Typography>
        <Typography
          as="p"
          variant="v2Muted"
          align="center"
          className="mb-10 mt-3 !text-[#514535] max-md:hidden"
        >
          Talvez a resposta que voce procura ja esteja aqui.
        </Typography>

        <Accordion
          type="single"
          collapsible
          className="space-y-3"
        >
          {contactMessages.faq.items.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`contact-faq-${index}`}
              className={[
                "rounded-2xl border border-[#ece5db] bg-[#f9f5ef] px-5",
                index === 0 ? "border-l-4 border-l-[#46c2c1]" : "",
              ].join(" ")}
            >
              <AccordionTrigger className="text-base font-semibold text-[#2f2a26] hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-[#514535]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
