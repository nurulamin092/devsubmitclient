"use client";

import { formatDistanceToNow } from "date-fns";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge";
import type { Project } from "@/types/api";

interface ProjectMobileCardProps {
  project: Project;
  onApprove: (project: Project) => void;
  onReject: (project: Project) => void;
}

export function ProjectMobileCard({
  project,
  onApprove,
  onReject,
}: ProjectMobileCardProps) {
  const isPending = project.status === "PENDING";

  return (
    <Card>
      <CardContent className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium">{project.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {project.student?.name ?? "Unknown"} · {project.student?.email}
            </p>
          </div>
          <ProjectStatusBadge status={project.status} />
        </div>

        <p className="text-xs text-muted-foreground">
          Submitted{" "}
          {formatDistanceToNow(new Date(project.createdAt), {
            addSuffix: true,
          })}
        </p>

        <div className="flex flex-wrap gap-2">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1 text-xs hover:bg-muted"
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
              className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-1 text-xs hover:bg-muted"
            >
              <ExternalLink className="h-3 w-3" />
              Live
            </a>
          )}
        </div>

        {isPending ? (
          <div className="flex gap-2 pt-1">
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onApprove(project)}
            >
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-destructive hover:text-destructive"
              onClick={() => onReject(project)}
            >
              Reject
            </Button>
          </div>
        ) : (
          <p className="pt-1 text-xs text-muted-foreground">
            Reviewed
            {project.reviewedBy ? ` by ${project.reviewedBy.name}` : ""}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
