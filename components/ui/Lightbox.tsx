import { useEffect } from "react";

interface LightboxProps {
  open: boolean;
  onClose: () => void;
  src: string;
  alt?: string;
  className?: string;
}

export function Lightbox({
  open,
  onClose,
  src,
  alt = "",
  className = "",
}: LightboxProps) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="absolute inset-0" onClick={onClose} />

      <img
        src={src}
        alt={alt}
        className={`relative max-h-[90%] max-w-[90%] rounded shadow-xl ${className}`}
      />
    </div>
  );
}
