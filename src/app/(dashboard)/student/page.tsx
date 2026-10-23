import { ProtectedRoute } from "@/components/layout/protected-route";

export default function StudentPage() {
  return (
    <ProtectedRoute role="STUDENT">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Student Portal</h1>
        <p className="text-muted-foreground">
          Submission form will appear in STEP F3.
        </p>
      </div>
    </ProtectedRoute>
  );
}
