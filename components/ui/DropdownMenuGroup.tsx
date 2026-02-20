interface DropdownMenuGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function DropdownMenuGroup({
  children,
  className = "",
}: DropdownMenuGroupProps) {
  return (
    <div className={`py-1 ${className}`}>
      {children}
    </div>
  );
}
