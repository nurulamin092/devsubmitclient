"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchApi } from "@/lib/api";
import type { Project } from "@/types/api";
import type { ReviewFormInput } from "@/features/review/schemas";

interface ReviewArgs {
  projectId: string;
  input: ReviewFormInput;
}

export function useReviewProject() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, input }: ReviewArgs) =>
      fetchApi<Project>(`/projects/${projectId}/review`, {
        method: "PATCH",
        body: {
          status: input.status,
          rejectionReason:
            input.status === "REJECTED" ? input.rejectionReason : undefined,
        },
      }),
    onSuccess: (project) => {
      toast.success(
        project.status === "APPROVED" ? "Project approved" : "Project rejected",
      );

      qc.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
