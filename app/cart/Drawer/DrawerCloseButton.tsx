"use client";

interface DrawerCloseButtonProps {
  onClose: () => void;
}

export function DrawerCloseButton({ onClose }: DrawerCloseButtonProps) {
  return (
    <button
      onClick={onClose}
      className="mt-8 w-full bg-black text-white py-3 rounded-lg text-lg"
    >
      Lukk
    </button>
  );
}
