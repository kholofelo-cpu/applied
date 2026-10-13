import { Badge } from "@/components/ui/badge";
import type { Stage } from "../types";
import { STAGE_LABELS } from "../lib/applications";

const STYLES: Record<Stage, string> = {
  wishlist: "border-slate-400 bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
  applied: "border-blue-500 bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-100",
  interview: "border-amber-500 bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100",
  offer: "border-green-600 bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-100",
  closed: "border-zinc-400 bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200",
};

export function StageBadge({ stage }: { stage: Stage }) {
  return (
    <Badge variant="outline" className={`uppercase ${STYLES[stage]}`}>
      {STAGE_LABELS[stage]}
    </Badge>
  );
}