"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchApi } from "@/lib/api";
import type { Project } from "@/types/api";
import type { SubmitProjectInput } from "@/features/projects/schemas";
import { myProjectQueryKey } from "@/features/projects/hooks/use-my-project";

export function useSubmitProject() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (input: SubmitProjectInput) =>
      fetchApi<Project>("/projects", {
        method: "POST",
        body: {
          ...input,
          // empty liveLink → undefined so backend stores null
          liveLink: input.liveLink?.trim() || undefined,
        },
      }),
    onSuccess: (project) => {
      // Seed cache from 201 — no extra GET needed
      qc.setQueryData(myProjectQueryKey, project);
      toast.success("Project submitted for review");
    },
  });
}
