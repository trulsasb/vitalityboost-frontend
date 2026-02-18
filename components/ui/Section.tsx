// Section.tsx
"use client";

import React from "react";
import clsx from "clsx";

type SectionProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  spacing?: "sm" | "md" | "lg";
};

export function Section({
  title,
  children,
  className,
  spacing = "md",
}: SectionProps) {
  const spacingClasses = {
    sm: "py-4",
    md: "py-6",
    lg: "py-10",
  };

  return (
    <section className={clsx(spacingClasses[spacing], className)}>
      {title && (
        <h2 className="text-xl font-semibold mb-4 text-gray-900">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
