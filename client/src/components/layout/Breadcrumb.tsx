import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-muted/40">
      <div className="container flex h-11 items-center gap-1.5 text-xs text-muted-foreground overflow-x-auto">
        <Link to="/" className="flex items-center gap-1 hover:text-navy">
          <Home className="h-3.5 w-3.5" /> Home
        </Link>
        {items.map((item, i) => (
          <span key={item.label} className="flex items-center gap-1.5 whitespace-nowrap">
            <ChevronRight className="h-3.5 w-3.5" />
            {item.to && i < items.length - 1 ? (
              <Link to={item.to} className="hover:text-navy">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-navy dark:text-navy-200" aria-current="page">
                {item.label}
              </span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
