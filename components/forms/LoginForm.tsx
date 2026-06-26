'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormData, loginSchema } from '@/schemas/auth.schema';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { loginUser } from '@/services/authService';
import { setAuthCookie } from '@/app/actions/auth';

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      remember: false,
    },
  });

  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setApiError(null);

      const result = await loginUser({
        email: data.email,
        password: data.password,
      });

      // Set token as a cookie via server action — avoids lint errors and works with middleware
      await setAuthCookie(result.access_token);

      router.push('/dashboard');
      console.log('Login successful, token stored:', result.access_token);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-black tracking-tight text-lime-400">
          IRONPULSE
        </h1>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-300">
          Precision Performance Tracking
        </p>
      </div>

      <div className="rounded-xl bg-[#20231f]/95 p-6 shadow-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-white">Welcome Back</h2>
          <p className="mt-1 text-sm font-semibold text-gray-400">
            Enter your credentials to access your dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="EMAIL ADDRESS"
            type="email"
            placeholder="athlete@ironpulse.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="PASSWORD"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('remember')}
                className="h-4 w-4 rounded border-gray-600 bg-transparent"
              />
              Remember this device
            </label>

            <button type="button" className="text-lime-400 hover:underline">
              Forgot?
            </button>
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full bg-lime-400 py-3 text-lg font-extrabold text-black hover:bg-lime-300"
          >
            Login ⚡
          </Button>
        </form>
        {apiError && <p className="text-sm text-red-400">{apiError}</p>}
        <p className="mt-6 text-center text-sm font-semibold text-gray-400">
          New to the pulse?{' '}
          <Link href="/register" className="text-lime-400 hover:underline">
            Create Account
          </Link>
        </p>
      </div>

      <div className="mt-6 flex justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
        <span>Privacy</span>
        <span>•</span>
        <span>Terms</span>
        <span>•</span>
        <span>Support</span>
      </div>
    </div>
  );
}
