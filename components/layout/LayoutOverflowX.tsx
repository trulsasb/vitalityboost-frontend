interface LayoutOverflowXProps {
  children: React.ReactNode;
  mode?: "hidden" | "scroll" | "auto" | "visible";
  className?: string;
}

export function LayoutOverflowX({
  children,
  mode = "auto",
  className = "",
}: LayoutOverflowXProps) {
  return (
    <div className={`overflow-x-${mode} ${className}`}>
      {children}
    </div>
  );
}
