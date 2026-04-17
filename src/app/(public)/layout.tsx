import { featureFlags } from "@/shared/config/feature-flags";

import { PublicLayoutClient } from "./public-layout-client";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PublicLayoutClient
      flagSnapshot={{
        routes: featureFlags.routes,
        header: featureFlags.header,
      }}
    >
      {children}
    </PublicLayoutClient>
  );
}
