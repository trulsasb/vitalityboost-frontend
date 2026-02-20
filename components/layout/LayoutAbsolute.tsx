interface LayoutAbsoluteProps {
  children: React.ReactNode;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  className?: string;
}

export function LayoutAbsolute({
  children,
  top,
  left,
  right,
  bottom,
  className = "",
}: LayoutAbsoluteProps) {
  const positions = [
    top ? `top-${top}` : "",
    left ? `left-${left}` : "",
    right ? `right-${right}` : "",
    bottom ? `bottom-${bottom}` : "",
  ].join(" ");

  return (
    <div className={`absolute ${positions} ${className}`}>
      {children}
    </div>
  );
}
