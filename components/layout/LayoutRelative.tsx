interface LayoutRelativeProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutRelative({
  children,
  className = "",
}: LayoutRelativeProps) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
}
