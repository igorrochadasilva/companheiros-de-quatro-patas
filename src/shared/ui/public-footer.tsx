import {
  BarChart3Icon,
  Building2Icon,
  GiftIcon,
  InfoIcon,
  MailIcon,
  MapPinIcon,
  MessageCircleIcon,
  PawPrintIcon,
  ShoppingBagIcon,
} from "lucide-react";
import Link from "next/link";

import { CONTACT, PUBLIC_ROUTES, WHATSAPP_URL } from "@/constants";
import { appMessages, footerMessages, navMessages } from "@/messages";

const quickLinks = [
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
  {
    href: PUBLIC_ROUTES.transparency,
    label: navMessages.transparency,
    icon: BarChart3Icon,
  },
  { href: PUBLIC_ROUTES.about, label: navMessages.about, icon: InfoIcon },
  { href: PUBLIC_ROUTES.contact, label: navMessages.contact, icon: MailIcon },
] as const;

type RouteVisibility = {
  adoption: boolean;
  shelter: boolean;
  donate: boolean;
  bazaar: boolean;
  about: boolean;
  contact: boolean;
  transparency: boolean;
};

export function PublicFooter({
  routesVisibility,
}: {
  routesVisibility: RouteVisibility;
}) {
  const year = new Date().getFullYear();
  const visibleQuickLinks = quickLinks.filter((item) => {
    if (item.href === PUBLIC_ROUTES.adoption) return routesVisibility.adoption;
    if (item.href === PUBLIC_ROUTES.shelter) return routesVisibility.shelter;
    if (item.href === PUBLIC_ROUTES.donate) return routesVisibility.donate;
    if (item.href === PUBLIC_ROUTES.bazaar) return routesVisibility.bazaar;
    if (item.href === PUBLIC_ROUTES.transparency)
      return routesVisibility.transparency;
    if (item.href === PUBLIC_ROUTES.about) return routesVisibility.about;
    if (item.href === PUBLIC_ROUTES.contact) return routesVisibility.contact;

    return true;
  });

  return (
    <footer
      className="border-t border-border bg-card"
      role="contentinfo"
      aria-label="Rodapé"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-2">
            <Link
              href={PUBLIC_ROUTES.home}
              className="text-base font-semibold text-foreground hover:underline"
            >
              {appMessages.name}
            </Link>
            <p className="text-sm text-muted-foreground">
              {appMessages.tagline}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">
              {footerMessages.linksTitle}
            </h3>
            <ul className="flex flex-col gap-2">
              {visibleQuickLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:underline"
                  >
                    <Icon className="size-4 shrink-0" aria-hidden />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">
              {footerMessages.contactTitle}
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-foreground hover:underline"
                >
                  <MessageCircleIcon className="size-4 shrink-0" aria-hidden />
                  {footerMessages.whatsappLabel}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-2 hover:text-foreground hover:underline"
                >
                  <MailIcon className="size-4 shrink-0" aria-hidden />
                  {footerMessages.emailLabel}: {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPinIcon className="size-4 shrink-0" aria-hidden />
                {footerMessages.cityLabel}: {CONTACT.city}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>
            © {year} {appMessages.name}. {footerMessages.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
