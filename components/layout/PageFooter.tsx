interface PageFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export function PageFooter({ children, className = "" }: PageFooterProps) {
  return (
    <footer className={`w-full py-6 text-center text-gray-500 ${className}`}>
      {children}
    </footer>
  );
}
