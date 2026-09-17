import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NotificationCard } from "@/components/ui/NotificationCard";
import { Button } from "@/components/ui/Button";
import { MOCK_NOTIFICATIONS } from "@/data/notifications";

export function NotificationCenter() {
  return (
    <section className="bg-background py-16">
      <div className="container">
        <SectionHeading
          eyebrow="Stay Informed"
          title="Real-Time Notification Center"
          description="Get instant updates at every stage of your scholarship journey — from document verification to DBT credit."
        />
        <div className="mx-auto grid max-w-3xl gap-3">
          {MOCK_NOTIFICATIONS.slice(0, 4).map((n) => (
            <NotificationCard key={n.id} item={n} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/notifications">
            <Button variant="outline">
              View All Notifications <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
