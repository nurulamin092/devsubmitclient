"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import type { StatsResponse } from "@/types/api";

export const projectStatsQueryKey = ["projects", "stats"] as const;

export function useProjectStats() {
  return useQuery({
    queryKey: projectStatsQueryKey,
    queryFn: () => fetchApi<StatsResponse>("/projects/stats"),
    staleTime: 15_000,
  });
}
