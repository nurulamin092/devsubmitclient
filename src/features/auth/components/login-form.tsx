"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { FormErrorBanner } from "@/components/forms/form-error-banner";
import { SubmitButton } from "@/components/forms/submit-button";
import { TextField } from "@/components/forms/text-field";
import { PasswordField } from "@/components/forms/password-field";
import { useAuth } from "@/hooks/use-auth";
import { useAuthRedirect } from "@/features/auth/hooks/use-auth-redirect";
import { ApiError } from "@/lib/api";
import { safeNextPath } from "@/lib/safe-redirect";
import { loginSchema } from "@/features/auth/schemas";

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = safeNextPath(searchParams.get("next"));
  const { login } = useAuth();
  const { redirectAfterAuth } = useAuthRedirect(next);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onBlur: loginSchema },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const user = await login(value.email, value.password);
        toast.success(`Welcome back, ${user.name}`);
        redirectAfterAuth(user);
      } catch (err) {
        setServerError(
          err instanceof ApiError ? err.message : "Something went wrong",
        );
      }
    },
  });

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FormErrorBanner message={serverError} />

      <form.Field name="email">
        {(field) => (
          <TextField
            field={field}
            label="Email"
            type="email"
            autoComplete="email"
            autoFocus
            disabled={form.state.isSubmitting}
          />
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <PasswordField
            field={field}
            autoComplete="current-password"
            disabled={form.state.isSubmitting}
          />
        )}
      </form.Field>

      <SubmitButton form={form} label="Sign in" loadingLabel="Signing in..." />
    </form>
  );
}
