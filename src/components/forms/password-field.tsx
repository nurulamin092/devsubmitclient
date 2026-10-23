import { TextField, type FieldAdapter } from "@/components/forms/text-field";

interface PasswordFieldProps {
  field: FieldAdapter;
  label?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  hint?: string;
  disabled?: boolean;
}

export function PasswordField({
  field,
  label = "Password",
  autoComplete = "current-password",
  autoFocus,
  hint,
  disabled,
}: PasswordFieldProps) {
  return (
    <TextField
      field={field}
      label={label}
      type="password"
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      hint={hint}
      disabled={disabled}
    />
  );
}
