export const dynamic = "force-dynamic";
export const revalidate = 0;

import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { Providers } from "../providers";

import Header from "@/components/layout/Header";
import Navigation from "@/components/layout/Navigation";
import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import PageShell from "@/components/layout/PageShell";
import PageContainer from "@/components/layout/PageContainer";

export const metadata: Metadata = {
  title: "Vitalityboost Nettbutikk",
  description: "Nettbutikk for longevity-kosttilskudd fra Vitalityboost"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-gray-900 flex flex-col">
        <Providers>
          <Header />
          <Navigation />

          <div className="flex flex-1">
            <main className="flex-1">
              <PageShell>
                <PageContainer>{children}</PageContainer>
              </PageShell>
            </main>

            <aside className="w-80 border-l border-gray-200 bg-gray-50 sticky top-0 h-screen overflow-y-auto">
              <Sidebar />
            </aside>
          </div>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
