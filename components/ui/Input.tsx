// Input.tsx
"use client";

import React from "react";
import clsx from "clsx";

type InputProps = {
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

export function Input({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  disabled = false,
  className,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={clsx(
          "border border-gray-300 rounded-md px-3 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-black focus:border-black",
          "disabled:bg-gray-100 disabled:cursor-not-allowed",
          className
        )}
      />
    </div>
  );
}
