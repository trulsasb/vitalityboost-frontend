interface LayoutSpacerProps {
  size?: "sm" | "md" | "lg";
}

export function LayoutSpacer({ size = "md" }: LayoutSpacerProps) {
  const spacing =
    size === "sm" ? "h-4" : size === "lg" ? "h-12" : "h-8";

  return <div className={spacing} />;
}
