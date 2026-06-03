import { FormProvider, useForm, SubmitHandler, FieldValues, DefaultValues } from "react-hook-form";

interface FormProps<T extends FieldValues> {
  children: React.ReactNode;
  defaultValues?: DefaultValues<T>;
  onSubmit: SubmitHandler<T>;
  className?: string;
}

export function Form<T extends FieldValues>({
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
