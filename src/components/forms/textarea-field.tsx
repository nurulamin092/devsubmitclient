import type { ChangeEvent } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldError } from "@/components/forms/field-error";
import type { FieldAdapter } from "@/components/forms/text-field";

interface TextareaFieldProps {
  field: FieldAdapter;
  label: string;
  placeholder?: string;
  rows?: number;
  hint?: string;
  disabled?: boolean;
}

export function TextareaField({
  field,
  label,
  placeholder,
  rows = 4,
  hint,
  disabled,
}: TextareaFieldProps) {
  const errorId = `${field.name}-error`;
  const hintId = hint ? `${field.name}-hint` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const hasError = field.state.meta.errors.length > 0;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={field.name}>{label}</Label>
      <Textarea
        id={field.name}
        name={field.name}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        value={field.state.value}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          field.handleChange(e.target.value)
        }
        onBlur={field.handleBlur}
        aria-invalid={hasError || undefined}
        aria-describedby={describedBy}
      />
      {hint && (
        <p id={hintId} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      <div id={errorId}>
        <FieldError errors={field.state.meta.errors} />
      </div>
    </div>
  );
}
