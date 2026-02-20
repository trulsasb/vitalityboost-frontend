interface PageSectionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageSection({ children, className = "" }: PageSectionProps) {
  return (
    <section className={`w-full mb-12 ${className}`}>
      {children}
    </section>
  );
}
