export const dynamic = "force-dynamic";
export const revalidate = 0;

import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Providers } from "../providers";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Vitalityboost Nettbutikk",
  description: "Nettbutikk for longevity-kosttilskudd fra Vitalityboost"
};

// The single source of truth for site chrome — individual pages should
// render their own content only (PageSection/PageContainer as needed for
// layout), not another Header/Footer/PageShell, or it duplicates here.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
