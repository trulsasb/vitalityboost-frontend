import { useFormContext } from "react-hook-form";

interface FormControlProps {
  name: string;
  children: React.ReactNode;
  className?: string;
}

export function FormControl({
  name,
  children,
  className = "",
}: FormControlProps) {
  const { register } = useFormContext();

  return (
    <div className={className}>
      {typeof children === "function"
        ? children({ ...register(name) })
        : children}
    </div>
  );
}
