interface LayoutCenterBothProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutCenterBoth({
  children,
  className = "",
}: LayoutCenterBothProps) {
  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`}>
      {children}
    </div>
  );
}
