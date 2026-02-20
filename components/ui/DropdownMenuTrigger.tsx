interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownMenuTrigger({
  children,
  className = "",
}: DropdownMenuTriggerProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
