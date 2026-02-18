// Radio.tsx
"use client";

import React from "react";
import clsx from "clsx";

type RadioProps = {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
};

export function Radio({
  checked,
  onChange,
  label,
  disabled = false,
  className,
  name,
}: RadioProps) {
  return (
    <label
      className={clsx(
        "flex items-center gap-2 cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={() => onChange(true)}
        className="h-4 w-4 border-gray-300"
      />
      {label && <span className="text-sm text-gray-800">{label}</span>}
    </label>
  );
}
