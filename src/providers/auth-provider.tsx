"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchApi, onUnauthorized } from "@/lib/api";
import {
  clearToken,
  getStoredUser,
  getToken,
  setStoredUser,
  setToken,
} from "@/lib/auth-storage";
import type { AuthResponse, User } from "@/types/api";

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: (opts?: { silent?: boolean; redirectTo?: string }) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Bootstrap: validate existing token, optimistically show cached user
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const cached = getStoredUser();
      if (cached && !cancelled) setUser(cached);

      try {
        const { user: fresh } = await fetchApi<{ user: User }>("/auth/me");
        if (cancelled) return;
        setUser(fresh);
        setStoredUser(fresh);
      } catch {
        // 401 triggers unauthorized event (handled below).
        // Network errors leave user as null until next refresh.
        if (!cancelled && !cached) setUser(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Listen for 401s from anywhere in the app → wipe session
  useEffect(() => {
    return onUnauthorized(() => {
      clearToken();
      setUser(null);
    });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetchApi<AuthResponse>("/auth/login", {
      method: "POST",
      body: { email, password },
      skipAuth: true,
    });
    setToken(res.token);
    setStoredUser(res.user);
    setUser(res.user);
    return res.user;
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      const res = await fetchApi<AuthResponse>("/auth/register", {
        method: "POST",
        body: { name, email, password },
        skipAuth: true,
      });
      setToken(res.token);
      setStoredUser(res.user);
      setUser(res.user);
      return res.user;
    },
    [],
  );

  const logout = useCallback(
    (opts?: { silent?: boolean; redirectTo?: string }) => {
      clearToken();
      setUser(null);
      if (!opts?.silent) toast.success("Logged out");
      router.replace(opts?.redirectTo ?? "/login");
    },
    [router],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
