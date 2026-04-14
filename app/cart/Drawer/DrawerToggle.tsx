"use client";

interface DrawerToggleProps {
  count: number;
  onOpen: () => void;
}

export function DrawerToggle({ count, onOpen }: DrawerToggleProps) {
  return (
    <button
      onClick={onOpen}
      className="fixed top-6 right-6 z-40 bg-black text-white px-4 py-2 rounded-lg"
    >
      Handlekurv ({count})
    </button>
  );
}
