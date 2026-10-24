"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error("[app error]", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Something went wrong
          </h1>
          <p className="text-sm text-muted-foreground">
            {error.message || "An unexpected error occurred."}
          </p>
          {error.digest && (
            <p className="font-mono text-xs text-muted-foreground">
              Ref: {error.digest}
            </p>
          )}
        </div>
        <div className="flex justify-center gap-2">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
