"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { FaGithub } from "react-icons/fa";
import { ExternalLink, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge";
import { ReviewDialog } from "@/features/review/components/review-dialog";
import type { PaginationMeta, Project, ReviewIntent } from "@/types/api";

interface ProjectsTableProps {
  projects: Project[] | undefined;
  meta: PaginationMeta | undefined;
  isLoading: boolean;
  isError: boolean;
  onPageChange: (page: number) => void;
  hasActiveFilters: boolean;
}

type Reviewing = { project: Project; intent: ReviewIntent } | null;

export function ProjectsTable({
  projects,
  meta,
  isLoading,
  isError,
  onPageChange,
  hasActiveFilters,
}: ProjectsTableProps) {
  const [reviewing, setReviewing] = useState<Reviewing>(null);

  if (isError) {
    return (
      <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-6 text-center text-sm text-destructive">
        Could not load projects. Please refresh.
      </div>
    );
  }

  if (isLoading && !projects) {
    return <TableSkeleton />;
  }

  const rows = projects ?? [];
  const isEmpty = rows.length === 0;

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
        <Inbox className="mb-3 h-10 w-10 text-muted-foreground" />
        <p className="font-medium">
          {hasActiveFilters ? "No matching projects" : "No projects yet"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {hasActiveFilters
            ? "Try adjusting your filters."
            : "When students submit projects, they will appear here."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Submitted</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((project) => {
              const isPending = project.status === "PENDING";
              return (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {project.student?.name ?? "Unknown"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {project.student?.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-medium">{project.name}</span>
                      <div className="flex flex-wrap gap-1.5">
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                        >
                          <FaGithub className="h-3 w-3" />
                          Repo
                          <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                        </a>
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Live
                          </a>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <ProjectStatusBadge status={project.status} />
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                    {formatDistanceToNow(new Date(project.createdAt), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    {isPending ? (
                      <div className="flex justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setReviewing({ project, intent: "APPROVED" })
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-destructive hover:text-destructive"
                          onClick={() =>
                            setReviewing({ project, intent: "REJECTED" })
                          }
                        >
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        {project.reviewedBy
                          ? `by ${project.reviewedBy.name}`
                          : "Reviewed"}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {meta && meta.total > 0 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Showing{" "}
            <span className="font-medium text-foreground">
              {(meta.page - 1) * meta.limit + 1}–
              {Math.min(meta.page * meta.limit, meta.total)}
            </span>{" "}
            of <span className="font-medium text-foreground">{meta.total}</span>
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!meta.hasPrev || isLoading}
              onClick={() => onPageChange(meta.page - 1)}
            >
              Previous
            </Button>
            <span className="text-xs">
              Page {meta.page} / {meta.totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={!meta.hasNext || isLoading}
              onClick={() => onPageChange(meta.page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {reviewing && (
        <ReviewDialog
          key={`${reviewing.project.id}-${reviewing.intent}`}
          open={!!reviewing}
          onOpenChange={(open) => !open && setReviewing(null)}
          project={reviewing.project}
          initialStatus={reviewing.intent}
        />
      )}
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full" />
      ))}
    </div>
  );
}
