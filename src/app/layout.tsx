import "@/app/globals.css";

import type { Metadata } from "next";
import { Abril_Fatface, Alata, Manrope, Noto_Serif } from "next/font/google";

import { SEO } from "@/constants";
import { AppQueryClientProvider } from "@/shared/providers/query-client-provider";
import { Toaster } from "@/shared/ui/sonner";
import { TooltipProvider } from "@/shared/ui/tooltip";

const alata = Alata({
  variable: "--font-alata",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const abrilFatface = Abril_Fatface({
  variable: "--font-abril",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const manrope = Manrope({
  variable: "--font-v2-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const notoSerif = Noto_Serif({
  variable: "--font-v2-headline",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  fallback: ["serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SEO.siteUrl),
  title: {
    default: SEO.siteName,
    template: `%s | ${SEO.siteName}`,
  },
  description: SEO.siteDescription,
  applicationName: SEO.siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: SEO.siteType,
    locale: SEO.siteLocale,
    url: "/",
    siteName: SEO.siteName,
    title: SEO.siteName,
    description: SEO.siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.siteName,
    description: SEO.siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Image origins used across the public pages */}
        <link
          rel="preconnect"
          href="https://placehold.co"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://res.cloudinary.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${alata.variable} ${abrilFatface.variable} ${manrope.variable} ${notoSerif.variable} antialiased`}
        suppressHydrationWarning
      >
        <AppQueryClientProvider>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </AppQueryClientProvider>
      </body>
    </html>
  );
}
