import { ProtectedRoute } from "@/components/layout/protected-route";

export default function MentorPage() {
  return (
    <ProtectedRoute role={["MENTOR", "ADMIN"]}>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold tracking-tight">Mentor Dashboard</h1>
        <p className="text-muted-foreground">
          Review table will appear in STEP F4.
        </p>
      </div>
    </ProtectedRoute>
  );
}
