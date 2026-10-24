import { Skeleton } from "@/components/ui/skeleton";

export default function MentorLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-56" />
        <Skeleton className="h-4 w-80" />
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-72 w-full" />
      </div>
    </div>
  );
}
