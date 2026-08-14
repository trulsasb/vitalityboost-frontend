"use client";

import * as React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/cart/CartProvider";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header
      className={`w-full border-b border-gray-200 bg-cream/80 backdrop-blur-sm ${className}`}
    >
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          VitalityBoost
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link href="/products" className="hover:text-forest">
            Produkter
          </Link>
          <Link href="/about" className="hover:text-forest">
            Om oss
          </Link>
          <Link href="/contact" className="hover:text-forest">
            Kontakt
          </Link>
          <Link
            href="/cart"
            className="relative -m-3 flex h-11 w-11 items-center justify-center text-gray-700 hover:text-forest"
            aria-label="Handlekurv"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-forest px-1 text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
