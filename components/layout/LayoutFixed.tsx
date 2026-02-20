interface LayoutFixedProps {
  children: React.ReactNode;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  className?: string;
}

export function LayoutFixed({
  children,
  top,
  left,
  right,
  bottom,
  className = "",
}: LayoutFixedProps) {
  const positions = [
    top ? `top-${top}` : "",
    left ? `left-${left}` : "",
    right ? `right-${right}` : "",
    bottom ? `bottom-${bottom}` : "",
  ].join(" ");

  return (
    <div className={`fixed ${positions} ${className}`}>
      {children}
    </div>
  );
}
