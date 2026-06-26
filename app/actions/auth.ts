'use server';

import { cookies } from 'next/headers';
import { AUTH_TOKEN_KEY } from '@/lib/api';

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_TOKEN_KEY, token, {
    path: '/',
    sameSite: 'lax',
    httpOnly: false, // must remain readable by client JS for API requests
  });
}

export async function clearAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_TOKEN_KEY);
}
