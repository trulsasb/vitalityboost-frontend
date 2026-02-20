interface LayoutContainerFluidProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutContainerFluid({
  children,
  className = "",
}: LayoutContainerFluidProps) {
  return (
    <div className={`w-full px-4 ${className}`}>
      {children}
    </div>
  );
}
