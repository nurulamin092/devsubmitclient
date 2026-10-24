import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/* ───────────────────────────── Page header ───────────────────────────── */

interface PageHeaderSkeletonProps {
  className?: string;
}

export function PageHeaderSkeleton({ className }: PageHeaderSkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Skeleton className="h-7 w-56" />
      <Skeleton className="h-4 w-80 max-w-full" />
    </div>
  );
}

/* ───────────────────────────── Stats grid ────────────────────────────── */

interface StatsGridSkeletonProps {
  count?: number;
  className?: string;
}

export function StatsGridSkeleton({
  count = 4,
  className,
}: StatsGridSkeletonProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3 md:grid-cols-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-12" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/* ───────────────────────────── Table rows ────────────────────────────── */

interface TableSkeletonProps {
  rows?: number;
  className?: string;
}

export function TableSkeleton({ rows = 5, className }: TableSkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full" />
      ))}
    </div>
  );
}

/* ───────────────────────────── Full card ─────────────────────────────── */

interface CardSkeletonProps {
  className?: string;
}

export function CardSkeleton({ className }: CardSkeletonProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <Skeleton className="h-6 w-56" />
        <Skeleton className="h-4 w-40" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-40" />
      </CardContent>
    </Card>
  );
}
