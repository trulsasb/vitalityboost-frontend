// providers.tsx
"use client";

import React from "react";

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
  return <>{children}</>;
}
