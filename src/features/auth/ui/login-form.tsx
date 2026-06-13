import { Button } from '@/shared/ui/kit/button';
import { Field, FieldError, FieldLabel } from '@/shared/ui/kit/field';
import { Input } from '@/shared/ui/kit/input';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../model/use-login';

const loginSchema = z.object({
  email: z.email({ message: 'Некорректный email' }),
  password: z
    .string({ message: 'Пароль обязателен' })
    .min(6, { message: 'Пароль должен быть не менее 6 символов' }),
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { login, isPending, errorMessage } = useLogin();

  const onSubmit = form.handleSubmit((data) => {
    login(data);
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
      {errorMessage && <FieldError errors={[{ message: errorMessage }]} />}
      <Button disabled={isPending} type='submit'>
        {isPending ? 'Вход...' : 'Войти'}
      </Button>
    </form>
  );
}
