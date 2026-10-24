"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { TextField } from "@/components/forms/text-field";
import { TextareaField } from "@/components/forms/textarea-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { FormErrorBanner } from "@/components/forms/form-error-banner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSubmitProject } from "@/features/projects/hooks/use-submit-project";
import { submitProjectSchema } from "@/features/projects/schemas";
import { ApiError } from "@/lib/api";

export function SubmitProjectForm() {
  const submit = useSubmitProject();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      repoUrl: "",
      liveLink: "",
      description: "",
    },
    validators: { onChange: submitProjectSchema },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        await submit.mutateAsync(value);
      } catch (err) {
        setServerError(
          err instanceof ApiError ? err.message : "Something went wrong",
        );
      }
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit your project</CardTitle>
        <CardDescription>
          One submission per student. Make sure the repo is public after the
          deadline.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                label="Project name"
                placeholder="e.g. DevSubmit Dashboard"
                autoFocus
                disabled={form.state.isSubmitting}
              />
            )}
          </form.Field>

          <form.Field name="repoUrl">
            {(field) => (
              <TextField
                field={field}
                label="Repository URL"
                type="url"
                placeholder="https://github.com/you/project"
                hint="GitHub, GitLab, or Bitbucket."
                disabled={form.state.isSubmitting}
              />
            )}
          </form.Field>

          <form.Field name="liveLink">
            {(field) => (
              <TextField
                field={field}
                label="Live link (optional)"
                type="url"
                placeholder="https://your-project.vercel.app"
                disabled={form.state.isSubmitting}
              />
            )}
          </form.Field>

          <form.Field name="description">
            {(field) => (
              <TextareaField
                field={field}
                label="Description"
                rows={5}
                placeholder="What does your project do? What did you build it with?"
                hint="30–3000 characters. This is what mentors read first."
                disabled={form.state.isSubmitting}
              />
            )}
          </form.Field>

          <SubmitButton
            form={form}
            label="Submit project"
            loadingLabel="Submitting..."
          />
        </form>
      </CardContent>
    </Card>
  );
}
