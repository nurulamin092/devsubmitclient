"use client";

import { DashboardHeader } from "@/components/layout/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <DashboardHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
