import { useFormContext } from "react-hook-form";

interface FormErrorProps {
  name: string;
  className?: string;
}

export function FormError({ name, className = "" }: FormErrorProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const message = errors[name]?.message as string | undefined;

  if (!message) return null;

  return (
    <p className={`text-sm font-medium text-red-600 ${className}`}>
      {message}
    </p>
  );
}
