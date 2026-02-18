// Accordion.tsx
"use client";

import React, { useState } from "react";
import clsx from "clsx";

type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultOpenId?: string;
  className?: string;
};

export function Accordion({ items, defaultOpenId, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={clsx("w-full", className)}>
      {items.map((item) => {
        const isOpen = item.id === openId;

        return (
          <div key={item.id} className="border-b border-gray-200">
            <button
              onClick={() => toggle(item.id)}
              className="w-full flex justify-between items-center py-3 text-left"
            >
              <span className="font-medium text-gray-800">{item.title}</span>
              <span className="text-gray-500">{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
              <div className="pb-4 text-sm text-gray-700">{item.content}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
