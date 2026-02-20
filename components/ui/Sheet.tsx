import { useEffect } from "react";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  className?: string;
}

export function Sheet({
  open,
  onClose,
  children,
  side = "right",
  className = "",
}: SheetProps) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  const sideClasses = {
    right: "right-0 top-0 h-full w-96",
    left: "left-0 top-0 h-full w-96",
    top: "top-0 left-0 w-full h-72",
    bottom: "bottom-0 left-0 w-full h-72",
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        className={`absolute bg-white shadow-xl p-6 ${sideClasses[side]} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
