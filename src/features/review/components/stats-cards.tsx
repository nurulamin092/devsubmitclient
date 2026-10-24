"use client";

import { CheckCircle2, Clock, LayoutList, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjectStats } from "@/features/review/hooks/use-project-stats";
import { cn } from "@/lib/utils";

const TILES = [
  {
    key: "total" as const,
    label: "Total",
    Icon: LayoutList,
    accent: "text-foreground",
  },
  {
    key: "pending" as const,
    label: "Pending",
    Icon: Clock,
    accent: "text-amber-600 dark:text-amber-400",
  },
  {
    key: "approved" as const,
    label: "Approved",
    Icon: CheckCircle2,
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "rejected" as const,
    label: "Rejected",
    Icon: XCircle,
    accent: "text-red-600 dark:text-red-400",
  },
];

export function StatsCards() {
  const { data, isLoading, isError } = useProjectStats();

  if (isError) {
    return (
      <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
        Could not load statistics.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {TILES.map(({ key, label, Icon, accent }) => (
        <Card key={key}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              {label}
            </CardTitle>
            <Icon className={cn("h-4 w-4", accent)} />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <p
                className={cn("text-2xl font-semibold tracking-tight", accent)}
              >
                {data?.[key] ?? 0}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
