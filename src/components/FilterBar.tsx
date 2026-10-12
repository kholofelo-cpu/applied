import type { StageFilter } from "../types";
import { STAGES, STAGE_LABELS } from "../lib/applications";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  stage: StageFilter;
  onStageChange: (value: StageFilter) => void;
};

export function FilterBar({ search, onSearchChange, stage, onStageChange }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div>
        <label htmlFor="search">Search company or job title</label>
        <input
          id="search"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search…"
          className="block rounded border p-2"
        />
      </div>
      <div>
        <label htmlFor="stage-filter">Stage</label>
        <select
          id="stage-filter"
          value={stage}
          onChange={(e) => onStageChange(e.target.value as StageFilter)}
          className="block rounded border p-2"
        >
          <option value="all">All stages</option>
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {STAGE_LABELS[s]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}