"use client";

import {
  Building2Icon,
  GiftIcon,
  InfoIcon,
  MailIcon,
  MenuIcon,
  PawPrintIcon,
  ShoppingBagIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { PUBLIC_ROUTES } from "@/constants";
import { appMessages, navMessages } from "@/messages";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui/sheet";
import { Muted } from "@/shared/ui/typography";

const navItems = [
  {
    href: PUBLIC_ROUTES.adoption,
    label: navMessages.adoption,
    icon: PawPrintIcon,
  },
  {
    href: PUBLIC_ROUTES.shelter,
    label: navMessages.shelter,
    icon: Building2Icon,
  },
  { href: PUBLIC_ROUTES.donate, label: navMessages.donate, icon: GiftIcon },
  {
    href: PUBLIC_ROUTES.bazaar,
    label: navMessages.bazaar,
    icon: ShoppingBagIcon,
  },
  { href: PUBLIC_ROUTES.about, label: navMessages.about, icon: InfoIcon },
  { href: PUBLIC_ROUTES.contact, label: navMessages.contact, icon: MailIcon },
];

export function PublicHeader() {
  const [sheetOpen, setSheetOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <nav
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:py-4"
        aria-label={navMessages.ariaLabel}
      >
        <Link href={PUBLIC_ROUTES.home} className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-background shadow-sm">
            <Image
              src="/icon.webp"
              alt={appMessages.name}
              fill
              sizes="36px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight tracking-tight text-foreground md:text-base">
              {appMessages.name}
            </span>
            <Muted className="hidden text-[11px] leading-tight md:block">
              {appMessages.tagline}
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

          <div className="hidden items-center gap-2 md:flex">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="md:inline-flex"
            >
              <Link href={PUBLIC_ROUTES.transparency}>
                {navMessages.transparency}
              </Link>
            </Button>
            <Button asChild size="sm" variant="primary">
              <Link href={PUBLIC_ROUTES.donate}>{navMessages.supportCta}</Link>
            </Button>
          </div>

          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label={navMessages.openMenuLabel}
              >
                <MenuIcon className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <SheetHeader>
                <SheetTitle className="text-left">
                  {appMessages.name}
                </SheetTitle>
                <Muted className="text-left text-xs">
                  {appMessages.tagline}
                </Muted>
              </SheetHeader>
              <div className="flex flex-1 flex-col gap-1 py-4">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setSheetOpen(false)}
                    >
                      <Icon className="size-5 shrink-0 text-muted-foreground" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="flex flex-col gap-2 border-t border-border px-4 pb-4 pt-4">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link
                    href={PUBLIC_ROUTES.transparency}
                    onClick={() => setSheetOpen(false)}
                  >
                    {navMessages.transparency}
                  </Link>
                </Button>
                <Button asChild size="sm" className="w-full" variant="primary">
                  <Link
                    href={PUBLIC_ROUTES.donate}
                    onClick={() => setSheetOpen(false)}
                  >
                    {navMessages.supportCta}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
