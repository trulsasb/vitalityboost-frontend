interface LayoutOverflowYProps {
  children: React.ReactNode;
  mode?: "hidden" | "scroll" | "auto" | "visible";
  className?: string;
}

export function LayoutOverflowY({
  children,
  mode = "auto",
  className = "",
}: LayoutOverflowYProps) {
  return (
    <div className={`overflow-y-${mode} ${className}`}>
      {children}
    </div>
  );
}
