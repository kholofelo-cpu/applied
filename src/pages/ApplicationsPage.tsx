import { useState } from "react";
import type { StageFilter } from "../types";
import { seed } from "../data/seed"; // temporary, replaced by the hook in Step 4
import { countByStage, filterApplications } from "../lib/applications";
import { StageSummary } from "../components/StageSummary";
import { FilterBar } from "../components/FilterBar";


export function ApplicationsPage() {
  const applications = seed;

  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<StageFilter>("all");

  // Derived, never stored in state:
  const counts = countByStage(applications);
  const visible = filterApplications(applications, search, stage).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );

  function clearFilters() {
    setSearch("");
    setStage("all");
  }

  return (
    <main className="space-y-4 p-4">
      <StageSummary counts={counts} />
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        stage={stage}
        onStageChange={setStage}
      />

      {applications.length === 0 ? (
        <p>Nothing here yet. Add your first application.</p>
      ) : visible.length === 0 ? (
        <div>
          <p>No applications match your search.</p>
          <button type="button" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      ) : (
        <ApplicationList applications={visible} />
      )}
    </main>
  );
}