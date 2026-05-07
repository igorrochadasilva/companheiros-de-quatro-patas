import { featureFlags } from "@/shared/config/feature-flags";
import { buildOrganizationJsonLd } from "@/shared/lib";
import { JsonLdScript } from "@/shared/ui/json-ld-script";

import { PublicLayoutClient } from "./public-layout-client";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = buildOrganizationJsonLd();

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
