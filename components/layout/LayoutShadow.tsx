interface LayoutShadowProps {
  children: React.ReactNode;
  level?: "sm" | "md" | "lg" | "xl" | "none";
  className?: string;
}

export function LayoutShadow({
  children,
  level = "md",
  className = "",
}: LayoutShadowProps) {
  const shadow =
    level === "none"
      ? "shadow-none"
      : level === "sm"
      ? "shadow-sm"
      : level === "lg"
      ? "shadow-lg"
      : level === "xl"
      ? "shadow-xl"
      : "shadow-md";

  return <div className={`${shadow} ${className}`}>{children}</div>;
}
