// Tabs.tsx
"use client";

import React, { useState } from "react";
import clsx from "clsx";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultTabId?: string;
  className?: string;
};

export function Tabs({ tabs, defaultTabId, className }: TabsProps) {
  const [activeId, setActiveId] = useState(defaultTabId || tabs[0]?.id);

  return (
    <div className={clsx("w-full", className)}>
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              className={clsx(
                "px-4 py-2 text-sm font-medium",
                isActive
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="py-4">
        {tabs.find((t) => t.id === activeId)?.content}
      </div>
    </div>
  );
}
