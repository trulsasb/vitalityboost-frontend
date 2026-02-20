import { useState } from "react";

interface ProductAccordionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ProductAccordion({ title, children, className = "" }: ProductAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`border-b py-3 ${className}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="font-medium text-gray-900">{title}</span>
        <span className="text-gray-500">{open ? "−" : "+"}</span>
      </button>

      {open && <div className="mt-2 text-sm text-gray-700">{children}</div>}
    </div>
  );
}
