import { featureFlags } from "@/shared/config/feature-flags";
import { PublicFooter } from "@/shared/ui/public-footer";
import { PublicHeader } from "@/shared/ui/public-header";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerVisibility = {
    nav: {
      adoption: featureFlags.routes.adoption && featureFlags.header.adoption,
      shelter: featureFlags.routes.shelter && featureFlags.header.shelter,
      donate: featureFlags.routes.donate && featureFlags.header.donate,
      bazaar: featureFlags.routes.bazaar && featureFlags.header.bazaar,
      about: featureFlags.routes.about && featureFlags.header.about,
      contact: featureFlags.routes.contact && featureFlags.header.contact,
    },
    transparency:
      featureFlags.routes.transparency && featureFlags.header.transparency,
    supportCta: featureFlags.routes.donate && featureFlags.header.supportCta,
  } as const;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicHeader visibility={headerVisibility} />

      <main className="mx-auto w-full max-w-6xl px-4 py-10">{children}</main>

      <PublicFooter />
    </div>
  );
}
