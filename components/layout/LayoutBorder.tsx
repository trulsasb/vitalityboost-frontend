interface LayoutBorderProps {
  children: React.ReactNode;
  side?: "all" | "top" | "bottom" | "left" | "right";
  className?: string;
}

export function LayoutBorder({
  children,
  side = "all",
  className = "",
}: LayoutBorderProps) {
  const border =
    side === "top"
      ? "border-t"
      : side === "bottom"
      ? "border-b"
      : side === "left"
      ? "border-l"
      : side === "right"
      ? "border-r"
      : "border";

  return <div className={`${border} ${className}`}>{children}</div>;
}
