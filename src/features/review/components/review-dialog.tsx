"use client";

import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TextareaField } from "@/components/forms/textarea-field";
import { FormErrorBanner } from "@/components/forms/form-error-banner";
import { useReviewProject } from "@/features/review/hooks/use-review-project";
import { reviewFormSchema } from "@/features/review/schemas";
import { ApiError } from "@/lib/api";
import { useState } from "react";
import type { Project, ReviewIntent } from "@/types/api";

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  initialStatus: ReviewIntent;
}

export function ReviewDialog({
  open,
  onOpenChange,
  project,
  initialStatus,
}: ReviewDialogProps) {
  const mutation = useReviewProject();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      status: initialStatus,
      rejectionReason: "",
    },
    validators: {
      onChange: reviewFormSchema,
      onSubmit: reviewFormSchema,
    },
    onSubmit: async ({ value }) => {
      setServerError(null);
      try {
        await mutation.mutateAsync({ projectId: project.id, input: value });
        onOpenChange(false);
      } catch (err) {
        setServerError(
          err instanceof ApiError ? err.message : "Something went wrong",
        );
      }
    },
  });

  const isRejecting = initialStatus === "REJECTED";
  const submitLabel = isRejecting ? "Reject project" : "Approve project";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isRejecting ? "Reject project" : "Approve project"}
          </DialogTitle>
          <DialogDescription>
            <span className="font-medium text-foreground">{project.name}</span>{" "}
            by {project.student?.name ?? "student"}
          </DialogDescription>
        </DialogHeader>

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

          {isRejecting && (
            <form.Field name="rejectionReason">
              {(field) => (
                <TextareaField
                  field={field}
                  label="Rejection reason"
                  rows={4}
                  placeholder="Explain what needs to be fixed (min 5 characters)."
                  hint="Students will see this on their dashboard."
                  disabled={mutation.isPending}
                />
              )}
            </form.Field>
          )}

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={mutation.isPending}
            >
              Cancel
            </Button>
            <form.Subscribe selector={(s) => s.isSubmitting}>
              {(isSubmitting) => (
                <Button
                  type="submit"
                  variant={isRejecting ? "destructive" : "default"}
                  disabled={isSubmitting || mutation.isPending}
                >
                  {(isSubmitting || mutation.isPending) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {submitLabel}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
