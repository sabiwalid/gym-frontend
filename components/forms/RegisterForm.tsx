'use client';

import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/schemas/auth.schema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { registerUser } from '@/services/authService';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();
  const onSubmit = async (data: RegisterFormData) => {
    try {
      setApiError(null);

      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      router.push('/login');
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : 'Something went wrong',
      );
    }
  };

  const [apiError, setApiError] = useState<string | null>(null);

  return (
    <div className="w-full max-w-sm rounded-xl bg-[#1a1e1c] p-6 shadow-xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          IRONPULSE
        </h1>
        <p className="mt-2 text-xs font-bold tracking-[0.25em] text-lime-400">
          PRECISION PERFORMANCE TRACKING
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Join the Pulse</h2>
        <p className="mt-1 text-sm font-medium text-gray-400">
          Start your journey to elite performance.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="John Doe"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="athlete@ironpulse.com"
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>

        <Button
          type="submit"
          isLoading={isSubmitting}
          className="mt-4 w-full bg-lime-400 py-3 font-extrabold uppercase text-black hover:bg-lime-300"
        >
          <span className="text-black"> Create Account ⚡</span>
        </Button>
      </form>
      {apiError && (
        <p className="text-sm font-medium text-red-400">{apiError}</p>
      )}

      <p className="mt-6 text-center text-sm font-semibold text-gray-400">
        Already have an account?{' '}
        <a href="/login" className="text-lime-400 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}
