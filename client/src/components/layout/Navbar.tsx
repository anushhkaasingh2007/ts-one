import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, LogIn, LogOut, UserCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/", key: "home" as const },
  { to: "/dashboard", key: "dashboard" as const },
  { to: "/schemes", key: "schemes" as const },
  { to: "/eligibility", key: "eligibility" as const },
  { to: "/chatbot", key: "chatbot" as const },
  { to: "/track", key: "track" as const },
  { to: "/help", key: "help" as const },
];

export function Navbar() {
  const { t } = useLanguage();
  const { student, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-navy bg-navy-50 text-navy dark:bg-navy-900/40 dark:text-navy-200"
            aria-hidden
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="3.2" />
              <path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6" />
              <path d="M12 2v2.2" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              {t.ministry}
            </span>
            <span className="block text-lg font-extrabold text-navy dark:text-navy-100">
              TS-One <span className="hidden text-sm font-medium text-muted-foreground sm:inline">| Tribal Scholar One</span>
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "rounded-gov px-3 py-2 text-sm font-semibold text-foreground/80 hover:bg-navy-50 hover:text-navy dark:hover:bg-navy-900/40",
                  isActive && "bg-navy-50 text-navy dark:bg-navy-900/50 dark:text-navy-200"
                )
              }
            >
              {t.nav[item.key]}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {student ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <UserCircle2 className="h-5 w-5 text-navy" /> {student.name.split(" ")[0]}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="primary" size="sm">
                <LogIn className="h-4 w-4" /> Login
              </Button>
            </Link>
          )}
        </div>

        <button
          className="rounded-gov p-2 text-foreground lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden" aria-label="Primary mobile">
          <div className="container flex flex-col gap-1 py-3">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-gov px-3 py-2.5 text-sm font-semibold text-foreground/80",
                    isActive && "bg-navy-50 text-navy dark:bg-navy-900/50 dark:text-navy-200"
                  )
                }
              >
                {t.nav[item.key]}
              </NavLink>
            ))}
            <div className="mt-2 border-t border-border pt-3">
              {student ? (
                <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start">
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">
                    <LogIn className="h-4 w-4" /> Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
      <div className="tricolor-bar" aria-hidden />
    </header>
  );
}
