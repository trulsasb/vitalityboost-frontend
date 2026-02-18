"use client";

import * as React from "react";
import Link from "next/link";

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  return (
    <header
      className={`w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm ${className}`}
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          VitalityBoost
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/products" className="hover:text-black">
            Produkter
          </Link>
          <Link href="/about" className="hover:text-black">
            Om oss
          </Link>
          <Link href="/contact" className="hover:text-black">
            Kontakt
          </Link>
        </nav>
      </div>
    </header>
  );
};
