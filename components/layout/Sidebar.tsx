"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className = "" }: SidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/products", label: "Produkter" },
    { href: "/admin/categories", label: "Kategorier" },
    { href: "/admin/discounts", label: "Rabatter" },
    { href: "/admin/payments", label: "Betaling" },
    { href: "/admin/accounting", label: "Regnskap" },
    { href: "/admin/layout", label: "Layout‑editor" },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`w-64 border-r border-gray-200 bg-white/80 backdrop-blur-sm ${className}`}
      aria-label="Admin-navigasjon"
    >
      <div className="flex h-full flex-col px-4 py-6">
        <h2 className="mb-6 text-lg font-semibold tracking-tight">
          Adminpanel
        </h2>

        <nav className="flex flex-col gap-2 text-sm font-medium text-gray-700">
          {links.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-md bg-gray-100 px-3 py-2 text-black shadow-sm"
                    : "rounded-md px-3 py-2 hover:bg-gray-50 hover:text-black"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
