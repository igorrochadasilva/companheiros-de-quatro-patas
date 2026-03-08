import Link from "next/link";

import { CONTACT_SUBJECT_ROUTES } from "@/constants";
import messages from "@/messages/pt-br.json";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { H1, Lead, Small } from "@/shared/ui/typography";

import { CONTACT_SUBJECT_ORDER } from "../contact.types";

const contactMessages = messages.contact;

const subjectToRoute: Record<string, string> = {
  adocao: CONTACT_SUBJECT_ROUTES.adoption,
  doacao: CONTACT_SUBJECT_ROUTES.donation,
  voluntariado: CONTACT_SUBJECT_ROUTES.volunteer,
  "lar-temporario": CONTACT_SUBJECT_ROUTES.foster,
  parceria: CONTACT_SUBJECT_ROUTES.partnership,
  outros: CONTACT_SUBJECT_ROUTES.others,
};

export function ContactHero() {
  return (
    <section className="space-y-4">
      <H1>{contactMessages.hero.title}</H1>
      <Lead>{contactMessages.hero.subtitle}</Lead>
      <div className="space-y-2">
        <Small>{contactMessages.hero.chipsLabel}</Small>
        <div className="flex flex-wrap gap-2">
          {CONTACT_SUBJECT_ORDER.map((subject) => (
            <Button key={subject} asChild variant="ghost" size="sm">
              <Link href={subjectToRoute[subject]}>
                <Badge variant="outline">
                  {contactMessages.subjects[subject]}
                </Badge>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
