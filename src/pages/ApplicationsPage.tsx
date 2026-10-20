import { useState } from "react";
import type { StageFilter } from "../types";
import { useApplications } from "../hooks/useApplications";
import { countByStage, filterApplications } from "../lib/applications";
import { StageSummary } from "../components/StageSummary";
import { FilterBar } from "../components/FilterBar";
import { ApplicationList } from "../components/ApplicationList";

export function ApplicationsPage() {
  const { applications, loading, error } = useApplications();
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState<StageFilter>("all");

  const counts = countByStage(applications);
  const visible = filterApplications(applications, search, stage).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );

  if (loading) return <div className="p-8">Loading your applications...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Your Applications</h1>
        <div className="mt-4">
          <StageSummary counts={counts} />
        </div>
      </div>

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        stage={stage}
        onStageChange={setStage}
      />

      <ApplicationList applications={visible} />
    </div>
  );
}