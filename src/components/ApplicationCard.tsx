import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Application } from "../types";
import { daysSince, daysAgoLabel, formatDate, needsNudge } from "../lib/applications";
import { StageBadge } from "./StageBadge";

type Props = { application: Application };

export function ApplicationCard({ application }: Props) {
  const days = daysSince(application.dateSent);
  const nudge = needsNudge(application);

  return (
    <Card className="relative h-full">
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>
          {/* The after: classes stretch the link over the whole card. */}
          <Link
            to={`/applications/${application.id}`}
            className="after:absolute after:inset-0 hover:underline"
          >
            {application.company}
          </Link>
        </CardTitle>
        <StageBadge stage={application.stage} />
      </CardHeader>
      <CardContent className="space-y-1">
        <p>{application.role}</p>
        <p className="text-xs">
          Sent {formatDate(application.dateSent)} · {daysAgoLabel(days)}
        </p>
        {nudge && <p className="text-xs font-semibold">Needs a nudge</p>}
      </CardContent>
    </Card>
  );
}