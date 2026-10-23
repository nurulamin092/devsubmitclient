"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { homeRouteForRole } from "@/lib/auth-storage";
import { Skeleton } from "@/components/ui/skeleton";
import type { Role } from "@/types/api";

interface ProtectedRouteProps {
  role?: Role | Role[];
  children: React.ReactNode;
}

export function ProtectedRoute({ role, children }: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const roleAllowed = !role
    ? true
    : user
      ? (Array.isArray(role) ? role : [role]).includes(user.role)
      : false;

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!roleAllowed && user) {
      router.replace(homeRouteForRole(user.role));
    }
  }, [isLoading, isAuthenticated, roleAllowed, user, router, pathname]);

  if (isLoading || !isAuthenticated || !roleAllowed) {
    return <AuthLoadingSkeleton />;
  }

  return <>{children}</>;
}

function AuthLoadingSkeleton() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
        <Skeleton className="h-40 w-full" />
      </div>
    </div>
  );
}
