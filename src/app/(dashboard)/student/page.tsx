"use client";

import { AlertCircle } from "lucide-react";
import { ProtectedRoute } from "@/components/layout/protected-route";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyProject } from "@/features/projects/hooks/use-my-project";
import { SubmitProjectForm } from "@/features/projects/components/submit-project-form";
import { MyProjectCard } from "@/features/projects/components/my-project-card";

export default function StudentPage() {
  return (
    <ProtectedRoute role="STUDENT">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Student Portal</h1>
          <p className="text-sm text-muted-foreground">
            Submit your project and track its review status.
          </p>
        </div>
        <StudentContent />
      </div>
    </ProtectedRoute>
  );
}

function StudentContent() {
  const { data, isLoading, isError, error, refetch } = useMyProject();

  if (isLoading) return <ProjectSkeleton />;

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Could not load your submission
          </CardTitle>
          <CardDescription>
            {error instanceof Error
              ? error.message
              : "Something went wrong while checking your project."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => refetch()}>Try again</Button>
        </CardContent>
      </Card>
    );
  }

  if (data) return <MyProjectCard project={data} />;

  return <SubmitProjectForm />;
}

function ProjectSkeleton() {
  return (
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
  );
}
