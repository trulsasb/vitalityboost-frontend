interface LayoutInsetProps {
  children: React.ReactNode;
  padding?: string;
  className?: string;
}

export function LayoutInset({
  children,
  padding = "p-4",
  className = "",
}: LayoutInsetProps) {
  return (
    <div className={`${padding} ${className}`}>
      {children}
    </div>
  );
}
