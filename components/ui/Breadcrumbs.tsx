// Breadcrumbs.tsx
"use client";

import React from "react";
import clsx from "clsx";

type Crumb = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: Crumb[];
  className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={clsx("text-sm text-gray-600", className)}>
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="hover:underline text-gray-600"
                >
                  {item.label}
                </a>
              ) : (
                <span className="font-medium text-gray-900">
                  {item.label}
                </span>
              )}

              {!isLast && <span className="mx-2 text-gray-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
