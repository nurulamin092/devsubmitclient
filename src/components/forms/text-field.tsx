import type { ChangeEvent, HTMLInputTypeAttribute } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/forms/field-error";

export interface FieldAdapter<TValue = string> {
  name: string;
  state: {
    value: TValue;
    meta: { errors: unknown[] };
  };
  handleChange: (value: TValue) => void;
  handleBlur: () => void;
}

interface TextFieldProps {
  field: FieldAdapter;
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  hint?: string;
  disabled?: boolean;
}

export function TextField({
  field,
  label,
  type = "text",
  placeholder,
  autoComplete,
  autoFocus,
  hint,
  disabled,
}: TextFieldProps) {
  const errorId = `${field.name}-error`;
  const hintId = hint ? `${field.name}-hint` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const hasError = field.state.meta.errors.length > 0;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={field.name}>{label}</Label>
      <Input
        id={field.name}
        name={field.name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        disabled={disabled}
        value={field.state.value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
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
