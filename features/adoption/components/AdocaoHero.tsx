import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import messages from "@/messages/pt-br.json";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import { H1, Muted } from "@/shared/ui/typography";

const heroMessages = messages.adoption.hero;

export function AdocaoHero() {
  return (
    <section className="space-y-2">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={PUBLIC_ROUTES.home}>
                {heroMessages.breadcrumbHome}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{heroMessages.breadcrumbCurrent}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <H1>{heroMessages.title}</H1>
      <Muted className="text-base">{heroMessages.subtitle}</Muted>
    </section>
  );
}
