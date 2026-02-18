// Textarea.tsx
"use client";

import React from "react";
import clsx from "clsx";

type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  rows?: number;
};

export function Textarea({
  value,
  onChange,
  placeholder,
  disabled = false,
  className,
  label,
  rows = 4,
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={clsx(
          "border border-gray-300 rounded-md px-3 py-2 text-sm resize-none",
          "focus:outline-none focus:ring-2 focus:ring-black focus:border-black",
          "disabled:bg-gray-100 disabled:cursor-not-allowed",
          className
        )}
      />
    </div>
  );
}
