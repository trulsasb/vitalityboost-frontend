interface LayoutMainProps {
  children: React.ReactNode;
  className?: string;
}

export function LayoutMain({ children, className = "" }: LayoutMainProps) {
  return (
    <main className={`flex-1 w-full ${className}`}>
      {children}
    </main>
  );
}
