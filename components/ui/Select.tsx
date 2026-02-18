// Select.tsx
"use client";

import React from "react";
import clsx from "clsx";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  disabled?: boolean;
  className?: string;
  label?: string;
};

export function Select({
  value,
  onChange,
  options,
  disabled = false,
  className,
  label,
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "border border-gray-300 rounded-md px-3 py-2 text-sm bg-white",
          "focus:outline-none focus:ring-2 focus:ring-black focus:border-black",
          "disabled:bg-gray-100 disabled:cursor-not-allowed",
          className
        )}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
