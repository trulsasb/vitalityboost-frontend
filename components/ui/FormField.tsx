import { useFormContext } from "react-hook-form";

interface FormFieldProps {
  name: string;
  children: ((field: ReturnType<typeof register>) => React.ReactNode) | React.ReactNode;
  className?: string;
}

export function FormField({ name, children, className = "" }: FormFieldProps) {
  const { register } = useFormContext();

  return (
    <div className={className}>
      {typeof children === "function"
        ? children(register(name))
        : children}
    </div>
  );
}
