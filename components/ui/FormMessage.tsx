import { useFormContext } from "react-hook-form";

interface FormMessageProps {
  name: string;
  className?: string;
}

export function FormMessage({ name, className = "" }: FormMessageProps) {
  const {
    formState: { errors },
  } = useFormContext();

  const message = errors[name]?.message as string | undefined;

  if (!message) return null;

  return (
    <p className={`text-sm text-red-600 ${className}`}>
      {message}
    </p>
  );
}
