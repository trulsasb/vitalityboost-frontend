interface LayoutAspectRatioProps {
  children: React.ReactNode;
  ratio?: string;
  className?: string;
}

export function LayoutAspectRatio({
  children,
  ratio = "aspect-video",
  className = "",
}: LayoutAspectRatioProps) {
  return (
    <div className={`${ratio} ${className}`}>
      {children}
    </div>
  );
}
