interface DropdownMenuSeparatorProps {
  className?: string;
}

export function DropdownMenuSeparator({ className = "" }: DropdownMenuSeparatorProps) {
  return (
    <div className={`my-1 h-px bg-gray-200 ${className}`} />
  );
}
