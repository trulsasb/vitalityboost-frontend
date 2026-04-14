"use client";

interface DrawerHeaderProps {
  title: string;
}

export function DrawerHeader({ title }: DrawerHeaderProps) {
  return (
    <h2 className="text-2xl font-semibold mb-6">
      {title}
    </h2>
  );
}

