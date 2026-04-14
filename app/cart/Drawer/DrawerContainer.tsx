"use client";

interface DrawerContainerProps {
  open: boolean;
  children: React.ReactNode;
}

export function DrawerContainer({ open, children }: DrawerContainerProps) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 p-6 transform transition-transform ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {children}
    </div>
  );
}
