import { InstagramIcon, MailIcon, MessageCircleIcon } from "lucide-react";

import { CONTACT, EMAIL_URL, WHATSAPP_URL } from "@/constants";
import { contactMessages } from "@/messages";
import { track } from "@/shared/lib/analytics";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { H2, Muted } from "@/shared/ui/typography";

export function ContactQuickChannels() {
  return (
    <section className="space-y-4">
      <H2>{contactMessages.quickChannels.title}</H2>
      <div className="grid gap-3 md:grid-cols-3">
        <Card>
          <CardHeader className="space-y-2">
            <MessageCircleIcon className="size-5 text-primary" />
            <CardTitle>
              {contactMessages.quickChannels.whatsapp.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Muted>{contactMessages.quickChannels.whatsapp.description}</Muted>
            <Button asChild className="w-full">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  track("open_whatsapp", { from: "contact_quick" })
                }
              >
                {contactMessages.quickChannels.whatsapp.cta}
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-2">
            <MailIcon className="size-5 text-primary" />
            <CardTitle>{contactMessages.quickChannels.email.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Muted>{contactMessages.quickChannels.email.description}</Muted>
            <Button asChild variant="outline" className="w-full">
              <a
                href={EMAIL_URL}
                onClick={() => track("open_email", { from: "contact_quick" })}
              >
                {contactMessages.quickChannels.email.cta}
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-2">
            <InstagramIcon className="size-5 text-primary" />
            <CardTitle>
              {contactMessages.quickChannels.instagram.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Muted>{contactMessages.quickChannels.instagram.description}</Muted>
            <Button asChild variant="outline" className="w-full">
              <a href={CONTACT.instagramUrl} target="_blank" rel="noreferrer">
                {contactMessages.quickChannels.instagram.cta}
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
