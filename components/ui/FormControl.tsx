import { useFormContext } from "react-hook-form";
import type { ReactNode } from "react";

interface FormControlProps {
  name: string;
  children: ((field: ReturnType<ReturnType<typeof useFormContext>["register"]>) => ReactNode) | ReactNode;
  className?: string;
}

export function FormControl({ name, children, className = "" }: FormControlProps) {
  const { register } = useFormContext();

  const field = register(name);

  return (
    <div className={className}>
      {typeof children === "function" ? children(field) : children}
    </div>
  );
}
