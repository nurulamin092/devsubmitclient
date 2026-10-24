"use client";

import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useAuth } from "@/hooks/use-auth";
import { homeRouteForRole } from "@/lib/auth-storage";

export function LandingNavbar() {
  const { user, isLoading } = useAuth();
  const home = user ? homeRouteForRole(user.role) : "/login";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">DevSubmit</span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isLoading ? (
            <div className="h-9 w-20 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <Button render={<Link href={home} />} nativeButton={false}>
              Dashboard
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                render={<Link href="/login" />}
                nativeButton={false}
              >
                Log in
              </Button>
              <Button render={<Link href="/register" />} nativeButton={false}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
