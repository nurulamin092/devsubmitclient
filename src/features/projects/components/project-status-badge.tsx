import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types/api";

const statusStyles: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  PENDING: {
    label: "Pending",
    className:
      "border-amber-300 bg-amber-100 text-amber-900 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200",
  },
  APPROVED: {
    label: "Approved",
    className:
      "border-emerald-300 bg-emerald-100 text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200",
  },
  REJECTED: {
    label: "Rejected",
    className:
      "border-red-300 bg-red-100 text-red-900 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200",
  },
};

export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  const { label, className } = statusStyles[status];
  return (
    <Badge variant="outline" className={cn("border font-medium", className)}>
      {label}
    </Badge>
  );
}
