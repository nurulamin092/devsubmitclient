import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md space-y-4 text-center">
        <Compass className="mx-auto h-12 w-12 text-muted-foreground" />
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Page not found
          </h1>
          <p className="text-sm text-muted-foreground">
            The page you&apos;re looking for does n&apos;t exist or has moved.
          </p>
        </div>
        <Button render={<Link href="/" />} nativeButton={false}>
          Go home
        </Button>
      </div>
    </div>
  );
}
