interface LegendProps {
  children: React.ReactNode;
  className?: string;
}

export function Legend({ children, className = "" }: LegendProps) {
  return (
    <legend className={`text-sm font-medium text-gray-700 ${className}`}>
      {children}
    </legend>
  );
}
