"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { fetchApiPaginated } from "@/lib/api";
import type { Project, ProjectStatus } from "@/types/api";

const VALID_STATUSES: ProjectStatus[] = ["PENDING", "APPROVED", "REJECTED"];

export interface ListFilters {
  status?: ProjectStatus;
  search?: string;
  page: number;
  limit: number;
}

export function useListFiltersFromUrl(): ListFilters {
  const sp = useSearchParams();
  const rawStatus = sp.get("status");
  const rawSearch = sp.get("search");
  const rawPage = Number(sp.get("page") ?? "1");
  const rawLimit = Number(sp.get("limit") ?? "20");

  const status =
    rawStatus && VALID_STATUSES.includes(rawStatus as ProjectStatus)
      ? (rawStatus as ProjectStatus)
      : undefined;
  const search = rawSearch?.trim() || undefined;
  const page =
    Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;
  const limit = Number.isFinite(rawLimit)
    ? Math.min(100, Math.max(1, Math.floor(rawLimit)))
    : 20;

  return { status, search, page, limit };
}

export const projectsListQueryKey = (filters: ListFilters) =>
  ["projects", "list", filters] as const;

export function useProjectsList(filters: ListFilters) {
  return useQuery({
    queryKey: projectsListQueryKey(filters),
    queryFn: () => {
      const params = new URLSearchParams();
      if (filters.status) params.set("status", filters.status);
      if (filters.search) params.set("search", filters.search);
      params.set("page", String(filters.page));
      params.set("limit", String(filters.limit));
      return fetchApiPaginated<Project[]>(`/projects?${params.toString()}`);
    },
    // Keep showing previous page while fetching next — no skeleton flash
    placeholderData: (prev) => prev,
  });
}
