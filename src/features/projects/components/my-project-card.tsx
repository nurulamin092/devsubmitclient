import { formatDistanceToNow } from "date-fns";
import {
  CalendarDays,
  ExternalLink,
  MessageSquareWarning,
  UserCheck,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectStatusBadge } from "@/features/projects/components/project-status-badge";
import type { Project } from "@/types/api";

export function MyProjectCard({ project }: { project: Project }) {
  const submittedAgo = formatDistanceToNow(new Date(project.createdAt), {
    addSuffix: true,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div className="space-y-1">
          <CardTitle className="text-xl">{project.name}</CardTitle>
          <CardDescription className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            Submitted {submittedAgo}
          </CardDescription>
        </div>
        <ProjectStatusBadge status={project.status} />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1 text-xs font-medium hover:bg-muted"
          >
            <FaGithub className="h-3.5 w-3.5" />
            Repository
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1 text-xs font-medium hover:bg-muted"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live
            </a>
          )}
        </div>

        <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {project.reviewedAt && (
          <>
            <Separator />
            <div className="flex items-start gap-2 text-sm">
              <UserCheck className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p>
                  Reviewed{" "}
                  <span className="font-medium">
                    {formatDistanceToNow(new Date(project.reviewedAt), {
                      addSuffix: true,
                    })}
                  </span>
                  {project.reviewedBy && (
                    <>
                      {" by "}
                      <span className="font-medium">
                        {project.reviewedBy.name}
                      </span>
                    </>
                  )}
                  .
                </p>
              </div>
            </div>
          </>
        )}

        {project.status === "REJECTED" && project.rejectionReason && (
          <div
            role="alert"
            className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2.5 text-sm"
          >
            <p className="mb-1 flex items-center gap-1.5 font-medium text-destructive">
              <MessageSquareWarning className="h-4 w-4" />
              Rejection reason
            </p>
            <p className="text-destructive/90">{project.rejectionReason}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
