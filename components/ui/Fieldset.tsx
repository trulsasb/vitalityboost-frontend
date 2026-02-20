interface FieldsetProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function Fieldset({ children, className = "", disabled = false }: FieldsetProps) {
  return (
    <fieldset disabled={disabled} className={`space-y-2 ${className}`}>
      {children}
    </fieldset>
  );
}
