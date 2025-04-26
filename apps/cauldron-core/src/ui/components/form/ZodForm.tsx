import React from 'react';
import { Form, FormProps } from 'antd';
import { useForm, Controller, UseFormReturn, FieldValues, SubmitHandler, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FadeIn } from '@/ui/animations';

export interface ZodFormProps<TFormValues extends FieldValues> extends Omit<FormProps, 'form' | 'onFinish'> {
  schema: z.ZodType<TFormValues>;
  defaultValues?: DefaultValues<TFormValues>;
  onSubmit: SubmitHandler<TFormValues>;
  children: React.ReactNode | ((methods: UseFormReturn<TFormValues>) => React.ReactNode);
  form?: UseFormReturn<TFormValues>;
  resetOnSubmit?: boolean;
}

/**
 * Form component with Zod schema validation
 * Uses react-hook-form for form state management and validation
 */
export function ZodForm<TFormValues extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  form: externalForm,
  resetOnSubmit = false,
  ...props
}: ZodFormProps<TFormValues>) {
  const methods = externalForm || useForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onTouched',
  });

  const { handleSubmit, formState } = methods;

  const onSubmitHandler: SubmitHandler<TFormValues> = async (data) => {
    await onSubmit(data);
    if (resetOnSubmit) {
      methods.reset(defaultValues);
    }
  };

  return (
    <Form
      layout={props.layout || 'vertical'}
      onFinish={handleSubmit(onSubmitHandler)}
      {...props}
    >
      {typeof children === 'function' ? children(methods) : children}
      
      {formState.isSubmitSuccessful && (
        <FadeIn>
          <div className="text-success mt-2">Form submitted successfully!</div>
        </FadeIn>
      )}
    </Form>
  );
}

export interface ZodFormItemProps {
  name: string;
  label?: React.ReactNode;
  children: React.ReactElement;
  help?: React.ReactNode;
  required?: boolean;
  className?: string;
}

/**
 * Form item component for ZodForm
 * Integrates with react-hook-form and displays validation errors
 */
export const ZodFormItem: React.FC<ZodFormItemProps> = ({
  name,
  label,
  children,
  help,
  required,
  className,
}) => {
  return (
    <Form.Item
      label={label}
      help={help}
      required={required}
      className={className}
      validateStatus={undefined}
    >
      <Controller
        name={name}
        render={({ field, fieldState }) => {
          const childProps = {
            ...field,
            status: fieldState.invalid ? 'error' : undefined,
          };

          return (
            <>
              {React.cloneElement(children, childProps)}
              {fieldState.error && (
                <div className="text-error-red text-xs mt-1">
                  {fieldState.error.message}
                </div>
              )}
            </>
          );
        }}
      />
    </Form.Item>
  );
};

export default ZodForm;