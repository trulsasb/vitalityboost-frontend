interface LayoutCenterHorizontalProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutCenterHorizontal({
  children,
  className = "",
}: LayoutCenterHorizontalProps) {
  return (
    <div className={`flex justify-center w-full ${className}`}>
      {children}
    </div>
  );
}
