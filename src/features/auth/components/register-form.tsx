"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { FormErrorBanner } from "@/features/auth/components/form-error-banner";
import { SubmitButton } from "@/features/auth/components/submit-button";
import { TextField } from "@/components/forms/text-field";
import { PasswordField } from "@/components/forms/password-field";
import { useAuth } from "@/hooks/use-auth";
import { useAuthRedirect } from "@/features/auth/hooks/use-auth-redirect";
import { ApiError } from "@/lib/api";
import { registerSchema } from "@/features/auth/schemas";

export function RegisterForm() {
  const { register } = useAuth();
  const { redirectAfterAuth } = useAuthRedirect();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: { name: "", email: "", password: "" },
    validators: { onChange: registerSchema },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        const user = await register(value.name, value.email, value.password);
        toast.success(`Welcome to DevSubmit, ${user.name}`);
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

      <form.Field name="name">
        {(field) => (
          <TextField
            field={field}
            label="Full name"
            autoComplete="name"
            autoFocus
            disabled={form.state.isSubmitting}
          />
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <TextField
            field={field}
            label="Email"
            type="email"
            autoComplete="email"
            disabled={form.state.isSubmitting}
          />
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <PasswordField
            field={field}
            autoComplete="new-password"
            hint="At least 8 characters with uppercase, lowercase, and a number."
            disabled={form.state.isSubmitting}
          />
        )}
      </form.Field>

      <SubmitButton
        form={form}
        label="Create account"
        loadingLabel="Creating account..."
      />
    </form>
  );
}
