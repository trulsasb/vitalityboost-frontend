"use client";

import * as React from "react";
import Link from "next/link";

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  return (
    <footer
      className={`w-full border-t border-gray-200 bg-white/80 backdrop-blur-sm ${className}`}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} VitalityBoost. Alle rettigheter forbeholdt.
          </p>

          <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/privacy" className="hover:text-black">
              Personvern
            </Link>
            <Link href="/terms" className="hover:text-black">
              Vilkår
            </Link>
            <Link href="/contact" className="hover:text-black">
              Kontakt
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
