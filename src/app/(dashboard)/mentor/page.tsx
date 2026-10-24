"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Skeleton } from "@/components/ui/skeleton";
import { StatsCards } from "@/features/review/components/stats-cards";
import { ProjectFilters } from "@/features/review/components/project-filters";
import { ProjectsTable } from "@/features/review/components/projects-table";
import {
  useListFiltersFromUrl,
  useProjectsList,
} from "@/features/review/hooks/use-projects-list";

export default function MentorPage() {
  return (
    <ProtectedRoute role={["MENTOR", "ADMIN"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Review Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Review, approve, or reject student project submissions.
          </p>
        </div>

        <StatsCards />

        <Suspense fallback={<FiltersTableSkeleton />}>
          <FiltersAndTable />
        </Suspense>
      </div>
    </ProtectedRoute>
  );
}

function FiltersAndTable() {
  const router = useRouter();
  const sp = useSearchParams();
  const filters = useListFiltersFromUrl();
  const { data, isLoading, isError } = useProjectsList(filters);

  const goToPage = (page: number) => {
    const params = new URLSearchParams(sp.toString());
    params.set("page", String(page));
    router.replace(`/mentor?${params.toString()}`);
  };

  const hasActiveFilters = !!filters.status || !!filters.search;

  return (
    <div className="space-y-4">
      <ProjectFilters />
      <ProjectsTable
        projects={data?.data}
        meta={data?.meta}
        isLoading={isLoading}
        isError={isError}
        onPageChange={goToPage}
        hasActiveFilters={hasActiveFilters}
      />
    </div>
  );
}

function FiltersTableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
