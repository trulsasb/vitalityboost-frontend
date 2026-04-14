"use client";

interface DrawerBackdropProps {
  onClose: () => void;
}

export function DrawerBackdrop({ onClose }: DrawerBackdropProps) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 z-40"
    />
  );
}
