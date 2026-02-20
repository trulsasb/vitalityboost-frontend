interface ContentAreaProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentArea({ children, className = "" }: ContentAreaProps) {
  return (
    <main className={`w-full max-w-7xl mx-auto py-6 px-4 ${className}`}>
      {children}
    </main>
  );
}
