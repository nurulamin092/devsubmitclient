import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubscribableForm {
  Subscribe: React.ComponentType<{
    selector: (state: { isSubmitting: boolean }) => boolean;
    children: (isSubmitting: boolean) => React.ReactNode;
  }>;
}

interface SubmitButtonProps {
  form: SubscribableForm;
  label: string;
  loadingLabel?: string;
}

export function SubmitButton({
  form,
  label,
  loadingLabel = "Please wait...",
}: SubmitButtonProps) {
  return (
    <form.Subscribe selector={(s: { isSubmitting: boolean }) => s.isSubmitting}>
      {(isSubmitting) => (
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSubmitting ? loadingLabel : label}
        </Button>
      )}
    </form.Subscribe>
  );
}
