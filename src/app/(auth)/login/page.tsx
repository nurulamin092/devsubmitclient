import { Suspense } from "react";
import Link from "next/link";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata = { title: "Sign in · DevSubmit" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      description="Sign in to your DevSubmit account"
      footer={
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </p>
      }
    >
      <Suspense
        fallback={<div className="h-64 animate-pulse rounded-md bg-muted" />}
      >
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
