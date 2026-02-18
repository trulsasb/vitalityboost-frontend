// Toggle.tsx
"use client";

import React from "react";
import clsx from "clsx";

type ToggleProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
};

export function Toggle({
  checked,
  onChange,
  disabled = false,
  className,
  label,
}: ToggleProps) {
  return (
    <label
      className={clsx(
        "flex items-center gap-3 cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={clsx(
            "w-10 h-5 rounded-full transition-colors",
            checked ? "bg-black" : "bg-gray-300"
          )}
        />
        <div
          className={clsx(
            "absolute top-1 left-1 w-3 h-3 rounded-full bg-white transition-transform",
            checked && "translate-x-5"
          )}
        />
      </div>

      {label && <span className="text-sm text-gray-800">{label}</span>}
    </label>
  );
}
