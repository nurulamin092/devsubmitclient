export function FieldError({ errors }: { errors: unknown[] }) {
  if (!errors.length) return null;

  const message = errors
    .map((e) => {
      if (typeof e === "string") return e;
      if (e && typeof e === "object" && "message" in e) {
        return (e as { message?: string }).message ?? "";
      }
      return "";
    })
    .filter(Boolean)
    .join(", ");

  if (!message) return null;

  return (
    <p role="alert" className="text-sm text-destructive">
      {message}
    </p>
  );
}
