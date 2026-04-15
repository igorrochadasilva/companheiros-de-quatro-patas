import { PublicLayoutClient } from "./public-layout-client";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PublicLayoutClient>{children}</PublicLayoutClient>;
}
