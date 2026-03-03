import Image from "next/image";
import Link from "next/link";

import { PUBLIC_ROUTES } from "@/constants";
import messages from "@/messages/pt-br.json";
import { Button } from "@/shared/ui/button";
import { Muted } from "@/shared/ui/typography";

const navItems = [
  { href: PUBLIC_ROUTES.adoption, label: messages.nav.adoption },
  { href: PUBLIC_ROUTES.donate, label: messages.nav.donate },
  { href: PUBLIC_ROUTES.bazaar, label: messages.nav.bazaar },
  { href: PUBLIC_ROUTES.about, label: messages.nav.about },
  { href: PUBLIC_ROUTES.contact, label: messages.nav.contact },
];

export function PublicHeader() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-background shadow-sm">
            <Image
              src="/icon.webp"
              alt="Companheiros de Quatro Patas"
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight tracking-tight text-foreground md:text-base">
              {messages.app.name}
            </span>
            <Muted className="hidden text-[11px] leading-tight md:block">
              {messages.app.tagline}
            </Muted>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-4 text-sm font-medium text-muted-foreground md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="hidden md:inline-flex"
            >
              <Link href={PUBLIC_ROUTES.transparency}>
                {messages.nav.transparency}
              </Link>
            </Button>
            <Button asChild size="sm" variant="primary">
              <Link href={PUBLIC_ROUTES.donate}>{messages.nav.supportCta}</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
