import {
  CardSkeleton,
  PageHeaderSkeleton,
} from "@/components/common/skeletons";

export default function StudentLoading() {
  return (
    <div className="space-y-6">
      <PageHeaderSkeleton />
      <CardSkeleton />
    </div>
  );
}
