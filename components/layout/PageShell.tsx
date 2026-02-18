"use client";

import * as React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Main } from "./Main";
import { Sidebar } from "./Sidebar";

interface PageShellProps {
  children: React.ReactNode;
  sidebar?: boolean;
  className?: string;
}

export const PageShell: React.FC<PageShellProps> = ({
  children,
  sidebar = false,
  className = "",
}) => {
  return (
    <div className={`min-h-screen flex flex-col bg-white ${className}`}>
      <Header />

      <div className="flex flex-1">
        {sidebar && (
          <Sidebar className="hidden lg:block" />
        )}

        <Main className="flex-1">
          {children}
        </Main>
      </div>

      <Footer />
    </div>
  );
};
