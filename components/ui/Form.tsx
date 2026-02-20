import { FormProvider, useForm, SubmitHandler } from "react-hook-form";

interface FormProps<T> {
  children: React.ReactNode;
  defaultValues?: T;
  onSubmit: SubmitHandler<T>;
  className?: string;
}

export function Form<T>({
  children,
  defaultValues,
  onSubmit,
  className = "",
}: FormProps<T>) {
  const methods = useForm<T>({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
        {children}
      </form>
    </FormProvider>
  );
}
