"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className = "" }: NavigationProps) {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Hjem" },
    { href: "/products", label: "Produkter" },
    { href: "/about", label: "Om oss" },
    { href: "/contact", label: "Kontakt" },
  ];

  return (
    <nav className={`flex items-center gap-6 text-sm font-medium ${className}`}>
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              isActive
                ? "text-black font-semibold"
                : "text-gray-700 hover:text-black"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

