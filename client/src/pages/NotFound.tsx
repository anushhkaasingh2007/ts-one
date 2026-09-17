import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center py-16">
      <AlertTriangle className="mb-4 h-12 w-12 text-saffron-500" />
      <h1 className="text-2xl font-extrabold text-navy dark:text-navy-100">Page Not Found</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link to="/" className="mt-6">
        <Button>Back to Home</Button>
      </Link>
    </div>
  );
}
