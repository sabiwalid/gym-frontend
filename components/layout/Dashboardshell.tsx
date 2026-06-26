import Sidebar from '@/components/layout/Sidebar';

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0f120f] text-white">
      <Sidebar />

      <main className="ml-60 min-h-screen p-6">{children}</main>
    </div>
  );
}
