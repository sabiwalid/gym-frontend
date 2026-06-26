// app/dashboard/layout.tsx

import DashboardShell from '@/components/layout/Dashboardshell';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
