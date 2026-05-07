import { CONTACT } from "@/constants/contact";
import { SEO } from "@/constants/seo";
import { featureFlags } from "@/shared/config/feature-flags";
import { JsonLdScript } from "@/shared/ui/json-ld-script";

import { PublicLayoutClient } from "./public-layout-client";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO.siteName,
    url: SEO.siteUrl,
    email: CONTACT.email,
    sameAs: [CONTACT.instagramUrl],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT.email,
      },
    ],
    areaServed: "BR",
  };

  return (
    <>
      <JsonLdScript data={organizationJsonLd} />
      <PublicLayoutClient
        flagSnapshot={{
          routes: featureFlags.routes,
          header: featureFlags.header,
        }}
      >
        {children}
      </PublicLayoutClient>
    </>
  );
}
