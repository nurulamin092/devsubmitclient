import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StudentLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <Card>
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
    </div>
  );
}
