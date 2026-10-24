import {
  PageHeaderSkeleton,
  StatsGridSkeleton,
  TableSkeleton,
} from "@/components/common/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function MentorLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <StatsGridSkeleton />
      <div className="space-y-4">
        {/* Filter bar placeholder */}
        <Skeleton className="h-10 w-full" />
        <TableSkeleton rows={6} />
      </div>
    </div>
  );
}
