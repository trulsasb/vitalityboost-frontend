interface LayoutDividerProps {
  className?: string;
}

export function LayoutDivider({ className = "" }: LayoutDividerProps) {
  return (
    <hr className={`border-gray-200 my-6 ${className}`} />
  );
}
