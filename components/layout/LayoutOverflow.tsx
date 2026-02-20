interface LayoutOverflowProps {
  children: React.ReactNode;
  mode?: "hidden" | "scroll" | "auto" | "visible";
  className?: string;
}

export function LayoutOverflow({
  children,
  mode = "hidden",
  className = "",
}: LayoutOverflowProps) {
  return (
    <div className={`overflow-${mode} ${className}`}>
      {children}
    </div>
  );
}
