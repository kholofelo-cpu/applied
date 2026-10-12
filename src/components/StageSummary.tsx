import type { Stage } from "../types";
import { STAGES, STAGE_LABELS } from "../lib/applications";

type Props = {
  counts: Record<Stage, number>;
};

export function StageSummary({ counts }: Props) {
  return (
    <ul className="flex flex-wrap gap-4" aria-label="Applications by stage">
      {STAGES.map((stage) => (
        <li key={stage}>
          {STAGE_LABELS[stage]} <strong>{counts[stage]}</strong>
        </li>
      ))}
    </ul>
  );
}