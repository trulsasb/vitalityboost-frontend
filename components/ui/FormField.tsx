import { useFormContext } from "react-hook-form";
import type { ReactNode } from "react";

interface FormFieldProps {
  name: string;
  children: ((field: ReturnType<ReturnType<typeof useFormContext>["register"]>) => ReactNode) | ReactNode;
  className?: string;
}

export function FormField({ name, children, className = "" }: FormFieldProps) {
  const { register } = useFormContext();

  const field = register(name);

  return (
    <div className={className}>
      {typeof children === "function" ? children(field) : children}
    </div>
  );
}
