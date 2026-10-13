import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-1">
        <Label htmlFor="search">Search company or job title</Label>
        <Input
          id="search"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search…"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="stage-filter">Stage</Label>
        <select
          id="stage-filter"
          value={stage}
          onChange={(e) => onStageChange(e.target.value as StageFilter)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-44" >
          
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
