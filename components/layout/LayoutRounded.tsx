interface LayoutRoundedProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full" | "none";
  className?: string;
}

export function LayoutRounded({
  children,
  size = "md",
  className = "",
}: LayoutRoundedProps) {
  const radius =
    size === "none"
      ? "rounded-none"
      : size === "sm"
      ? "rounded-sm"
      : size === "lg"
      ? "rounded-lg"
      : size === "xl"
      ? "rounded-xl"
      : size === "full"
      ? "rounded-full"
      : "rounded-md";

  return <div className={`${radius} ${className}`}>{children}</div>;
}
