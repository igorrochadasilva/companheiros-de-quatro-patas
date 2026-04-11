import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import { donateMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { H2 } from "@/shared/ui/typography";

export function DonatationItemsSection() {
  return (
    <section id="itens" className="scroll-mt-24 space-y-4">
      <H2>{donateMessages.items.title}</H2>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>{donateMessages.items.cards.items.title}</CardTitle>
            <CardDescription>
              {donateMessages.items.cards.items.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {donateMessages.items.cards.items.acceptedList.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{donateMessages.items.cards.volunteer.title}</CardTitle>
            <CardDescription>
              {donateMessages.items.cards.volunteer.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/contato?assunto=voluntariado">
                {donateMessages.items.cards.volunteer.cta}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{donateMessages.items.cards.foster.title}</CardTitle>
            <CardDescription>
              {donateMessages.items.cards.foster.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/contato?assunto=lar-temporario">
                {donateMessages.items.cards.foster.cta}
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{donateMessages.items.cards.bazaar.title}</CardTitle>
            <CardDescription>
              {donateMessages.items.cards.bazaar.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href={PUBLIC_ROUTES.bazaar}>
                {donateMessages.items.cards.bazaar.cta}
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
