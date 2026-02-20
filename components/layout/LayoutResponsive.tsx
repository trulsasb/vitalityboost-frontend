interface LayoutResponsiveProps {
  children: React.ReactNode;
  showOn?: "mobile" | "tablet" | "desktop" | "all";
  className?: string;
}

export function LayoutResponsive({
  children,
  showOn = "all",
  className = "",
}: LayoutResponsiveProps) {
  const visibility =
    showOn === "mobile"
      ? "block md:hidden"
      : showOn === "tablet"
      ? "hidden md:block lg:hidden"
      : showOn === "desktop"
      ? "hidden lg:block"
      : "block";

  return <div className={`${visibility} ${className}`}>{children}</div>;
}
