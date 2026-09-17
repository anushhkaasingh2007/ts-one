import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, ShieldCheck, Fingerprint } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { ApiError } from "@/lib/api";

const DEMO_EMAIL = "demo.student@tsone.gov.in";
const DEMO_PASSWORD = "TSOne@2025";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(email, password);
      toast({ title: "Login successful", description: "Welcome back to TS-One.", variant: "success" });
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fillDemo = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
  };

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-12">
      <Card className="w-full max-w-md p-2">
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-navy-50 text-navy dark:bg-navy-900/40 dark:text-navy-200">
            <Fingerprint className="h-7 w-7" />
          </div>
          <CardTitle className="text-xl">Student Login</CardTitle>
          <CardDescription>Sign in with your TS-One / DigiLocker linked credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-foreground">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-gov border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus-visible:border-navy"
                placeholder="demo.student@tsone.gov.in"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-gov border border-border bg-background px-3.5 py-2.5 text-sm outline-none focus-visible:border-navy"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <Button type="submit" className="w-full" disabled={submitting}>
              <LogIn className="h-4 w-4" /> {submitting ? "Signing in…" : "Sign In"}
            </Button>
          </form>

          <div className="mt-5 rounded-gov border border-dashed border-border p-3.5 text-center">
            <p className="text-xs text-muted-foreground">For SIH judging &amp; demo purposes</p>
            <button onClick={fillDemo} className="mt-1.5 text-xs font-semibold text-navy underline dark:text-navy-200">
              Autofill demo student credentials
            </button>
          </div>

          <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-green-600" /> Your data is protected under IT Act, 2000
          </p>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Don&rsquo;t have an account? <Link to="/eligibility" className="font-semibold text-navy underline dark:text-navy-200">Check eligibility</Link> to get started.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
