import { Button } from '@/shared/ui/kit/button';
import { Field, FieldError, FieldLabel } from '@/shared/ui/kit/field';
import { Input } from '@/shared/ui/kit/input';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '../model/use-register';

const registerSchema = z
  .object({
    email: z.email({ message: 'Некорректный email' }),
    password: z
      .string({ message: 'Пароль обязателен' })
      .min(6, { message: 'Пароль должен быть не менее 6 символов' }),
    confirmPassword: z.string({ message: 'Подтверждение пароля обязательно' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export function RegisterForm() {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { register, isPending, errorMessage } = useRegister();

  const onSubmit = form.handleSubmit((data) => {
    register(data);
  });

  return (
    <form className='space-y-4' onSubmit={onSubmit}>
      <Controller
        name='email'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Email</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type='email'
              aria-invalid={fieldState.invalid}
              placeholder='example@example.com'
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name='password'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Пароль</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type='password'
              aria-invalid={fieldState.invalid}
              placeholder='••••••••'
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name='confirmPassword'
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Подтвердите пароль</FieldLabel>
            <Input
              {...field}
              id={field.name}
              type='password'
              aria-invalid={fieldState.invalid}
              placeholder='••••••••'
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      {errorMessage && <FieldError errors={[{ message: errorMessage }]} />}
      <Button disabled={isPending} type='submit'>
        {isPending ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
}
