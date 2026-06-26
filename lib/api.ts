export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const AUTH_TOKEN_KEY = 'access_token';

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token =
    typeof window !== 'undefined'
      ? (document.cookie
          .split('; ')
          .find((row) => row.startsWith(`${AUTH_TOKEN_KEY}=`))
          ?.split('=')[1] ?? null)
      : null;
  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      // Clear the auth cookie
      document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0`;
      window.location.href = '/login';
    }
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    let error;
    try {
      error = await res.json();
    } catch {
      error = {};
    }
    throw new Error(error.detail || 'Request failed');
  }
  return res.json();
}
