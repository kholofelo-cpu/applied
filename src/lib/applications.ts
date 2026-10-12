import type { Application, Stage, StageFilter } from "../types";

export const STAGES: Stage[] = ["wishlist", "applied", "interview", "offer", "closed"];

export const STAGE_LABELS: Record<Stage, string> = {
  wishlist: "Saved",
  applied: "Applied",
  interview: "Interview",
  offer: "Offer",
  closed: "Closed",
};

const DAY = 1000 * 60 * 60 * 24;

export function daysSince(dateSent: string, today: Date = new Date()): number {
  const sent = new Date(dateSent);
  const gap = today.getTime() - sent.getTime();
  return Math.floor(gap / DAY);
}

export function needsNudge(job: Application, today: Date = new Date()): boolean {
  if (job.stage !== "applied") return false;
  return daysSince(job.dateSent, today) > 14;
}

export function countByStage(applications: Application[]): Record<Stage, number> {
  const counts: Record<Stage, number> = {
    wishlist: 0,
    applied: 0,
    interview: 0,
    offer: 0,
    closed: 0,
  };
  for (const job of applications) {
    counts[job.stage] += 1;
  }
  return counts;
}

export function filterApplications(
  applications: Application[],
  search: string,
  stage: StageFilter
): Application[] {
  const query = search.trim().toLowerCase();
  return applications.filter((job) => {
    const matchesStage = stage === "all" || job.stage === stage;
    const matchesSearch =
      query === "" ||
      job.company.toLowerCase().includes(query) ||
      job.role.toLowerCase().includes(query);
    return matchesStage && matchesSearch;
  });
}