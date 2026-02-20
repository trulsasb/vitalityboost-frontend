interface LayoutSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutSection({ children, className = "" }: LayoutSectionProps) {
  return (
    <section className={`w-full mb-8 ${className}`}>
      {children}
    </section>
  );
}
