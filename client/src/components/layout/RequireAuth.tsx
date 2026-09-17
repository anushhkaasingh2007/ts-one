import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { LogIn, ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { student, loading } = useAuth();

  if (loading) {
    return <div className="container py-24 text-center text-sm text-muted-foreground">Loading your account…</div>;
  }

  if (!student) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-16">
        <Card className="max-w-md p-8 text-center">
          <ShieldAlert className="mx-auto mb-4 h-10 w-10 text-saffron-500" />
          <h2 className="text-lg font-bold text-navy dark:text-navy-100">Login Required</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Please sign in to your TS-One student account to view this page.
          </p>
          <Link to="/login" className="mt-6 inline-block">
            <Button>
              <LogIn className="h-4 w-4" /> Go to Login
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
