'use client';
import { clearAuthCookie } from '@/app/actions/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '▦' },
  { label: 'Workout Library', href: '/workouts', icon: '↯' },
  { label: 'Exercise Logger', href: '/workouts/new', icon: '≡' },
  { label: 'Analytics', href: '/analytics', icon: '↗' },
  { label: 'Community', href: '/community', icon: '☷' },
];

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await clearAuthCookie();
    router.push('/login');
  };

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-60 flex-col border-r border-white/10 bg-[#151815] px-3 py-4 text-white">
      <div className="mb-8 px-3">
        <h1 className="text-2xl font-black tracking-tight text-lime-400">
          IRONPULSE
        </h1>
        <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-gray-500">
          Performance
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-bold text-gray-300 transition hover:bg-lime-400 hover:text-black"
          >
            <span className="w-5 text-center text-base">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-white/10 pt-4">
        <div className="mb-4 flex items-center gap-3 px-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-400 font-black text-black">
            W
          </div>

          <div>
            <p className="text-sm font-bold">Walid</p>
            <p className="text-xs text-gray-500">Elite Athlete</p>
          </div>
        </div>

        <button className="w-full rounded-lg px-3 py-3 text-left text-sm font-bold text-gray-300 transition hover:bg-white/10">
          Help
        </button>

        <button
          className="w-full rounded-lg px-3 py-3 text-left text-sm font-bold text-gray-300 transition hover:bg-white/10"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
