"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchApi, ApiError } from "@/lib/api";
import type { Project } from "@/types/api";

export const myProjectQueryKey = ["projects", "me"] as const;

export function useMyProject() {
  return useQuery({
    queryKey: myProjectQueryKey,
    queryFn: async (): Promise<Project | null> => {
      try {
        return await fetchApi<Project>("/projects/me");
      } catch (err) {
        // 404 = "no submission yet" is an expected state, not an error
        if (err instanceof ApiError && err.status === 404) return null;
        throw err;
      }
    },
  });
}
