import { Suspense } from "react";
import Link from "next/link";
import { AuthShell } from "@/features/auth/components/auth-shell";
import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata = { title: "Create account · DevSubmit" };

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      description="Register to submit and review projects"
      footer={
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <Suspense
        fallback={<div className="h-72 animate-pulse rounded-md bg-muted" />}
      >
        <RegisterForm />
      </Suspense>
    </AuthShell>
  );
}
