import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { homeRouteForRole } from "@/lib/auth-storage";
import type { User } from "@/types/api";

export function useAuthRedirect(next?: string | null) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(next ?? homeRouteForRole(user.role));
    }
  }, [isLoading, user, router, next]);

  const redirectAfterAuth = useCallback(
    (authenticatedUser: User) => {
      router.replace(next ?? homeRouteForRole(authenticatedUser.role));
    },
    [router, next],
  );

  return { redirectAfterAuth };
}
