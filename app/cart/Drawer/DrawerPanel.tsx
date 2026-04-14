"use client";

interface DrawerPanelProps {
  children: React.ReactNode;
}

export function DrawerPanel({ children }: DrawerPanelProps) {
  return (
    <div className="flex flex-col h-full">
      {children}
    </div>
  );
}
