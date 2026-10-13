import { describe, it, expect } from "vitest";
import { countByStage, daysSince, filterApplications, needsNudge } from "./applications";
import type { Application } from "../types";

const job: Application = {
  id: "1",
  company: "Vodacom",
  role: "Junior Developer",
  dateSent: "2026-10-01",
  stage: "applied",
  createdAt: "2026-10-01T09:00:00Z",
};

describe("daysSince", () => {
  it("counts whole days and drops part days", () => {
    expect(daysSince("2026-10-01", new Date("2026-10-01T23:00:00Z"))).toBe(0);
    expect(daysSince("2026-10-01", new Date("2026-10-04"))).toBe(3);
  });
});

describe("needsNudge", () => {
  it("is false at exactly fourteen days", () => {
    expect(needsNudge(job, new Date("2026-10-15"))).toBe(false);
  });

  it("is true at fifteen days", () => {
    expect(needsNudge(job, new Date("2026-10-16"))).toBe(true);
  });

  it("is false once there is an interview", () => {
    expect(needsNudge({ ...job, stage: "interview" }, new Date("2026-12-01"))).toBe(false);
  });
});

describe("countByStage", () => {
  it("counts each stage and returns 0 for empty ones", () => {
    const counts = countByStage([
      job,
      { ...job, id: "2" },
      { ...job, id: "3", stage: "offer" },
    ]);
    expect(counts).toEqual({ wishlist: 0, applied: 2, interview: 0, offer: 1, closed: 0 });
  });
});

describe("filterApplications", () => {
  const list: Application[] = [
    job,
    { ...job, id: "2", company: "Takealot", role: "Frontend Intern", stage: "interview" },
  ];

  it("matches company or job title, ignoring capitals", () => {
    expect(filterApplications(list, "TAKE", "all")).toHaveLength(1);
    expect(filterApplications(list, "junior", "all")).toHaveLength(1);
  });

  it("works together with the stage filter", () => {
    expect(filterApplications(list, "takealot", "applied")).toHaveLength(0);
    expect(filterApplications(list, "takealot", "interview")).toHaveLength(1);
  });
});