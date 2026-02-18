// Pagination.tsx
"use client";

import React from "react";
import clsx from "clsx";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
};

export function Pagination({
  currentPage,
  totalPages,
  onChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={clsx("flex items-center space-x-2", className)}>
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(
          "px-3 py-1 border rounded",
          currentPage === 1
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "hover:bg-gray-100"
        )}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={clsx(
            "px-3 py-1 border rounded",
            page === currentPage
              ? "bg-black text-white border-black"
              : "hover:bg-gray-100"
          )}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx(
          "px-3 py-1 border rounded",
          currentPage === totalPages
            ? "text-gray-400 border-gray-200 cursor-not-allowed"
            : "hover:bg-gray-100"
        )}
      >
        Next
      </button>
    </div>
  );
}
