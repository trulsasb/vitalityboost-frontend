// providers.tsx
"use client";

import React from "react";
import { CartProvider } from "@/app/cart/CartProvider";

type ProvidersProps = {
  children: React.ReactNode;
};

/**
 * Global Providers for the entire application.
 * This component wraps the app with any global context/state providers.
 * Additional providers (state, theme, analytics) can be added here without
 * modifying the layout structure.
 */
export function Providers({ children }: ProvidersProps) {
  return <CartProvider>{children}</CartProvider>;
}
