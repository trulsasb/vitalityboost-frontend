interface LayoutMaxWidthProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
}

export function LayoutMaxWidth({
  children,
  size = "xl",
  className = "",
}: LayoutMaxWidthProps) {
  const widths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
  };

  return (
    <div className={`w-full mx-auto ${widths[size]} ${className}`}>
      {children}
    </div>
  );
}
