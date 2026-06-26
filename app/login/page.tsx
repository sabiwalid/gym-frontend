import LoginForm from '@/components/forms/LoginForm';

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[url('/gym-bg.jpg')] bg-cover bg-center">
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/55" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <LoginForm />
      </div>
    </main>
  );
}
