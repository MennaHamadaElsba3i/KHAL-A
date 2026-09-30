import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { QueryProvider } from "@/components/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "KHALÉA",
    "luxury perfume",
    "haute parfumerie",
    "niche fragrance",
    "perfume house",
    "extrait de parfum",
    "Paris",
  ],
  authors: [{ name: siteConfig.author }],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full flex flex-col bg-[#FAF7F2] text-[#1C1917] selection:bg-[#3E1C27] selection:text-[#FAF7F2]">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
