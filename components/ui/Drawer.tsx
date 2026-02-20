import { useEffect } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: "left" | "right" | "top" | "bottom";
  className?: string;
}

export function Drawer({
  open,
  onClose,
  children,
  position = "right",
  className = "",
}: DrawerProps) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  const positionClasses = {
    right: "right-0 top-0 h-full w-80",
    left: "left-0 top-0 h-full w-80",
    top: "top-0 left-0 w-full h-64",
    bottom: "bottom-0 left-0 w-full h-64",
  };

  return (
    <div className="fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        className={`absolute bg-white shadow-xl p-4 ${positionClasses[position]} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
