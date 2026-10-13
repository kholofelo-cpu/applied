import type { Application, NewApplication } from "../types";
import { seed } from "../data/seed";

const KEY = "applied.applications";
const DELAY_MS = 300;

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

function readAll(): Application[] {
  const raw = localStorage.getItem(KEY);
  if (raw === null) {
    localStorage.setItem(KEY, JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(raw) as Application[];
}

function writeAll(list: Application[]): void {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export async function fetchApplications(): Promise<Application[]> {
  await wait(DELAY_MS);
  return readAll();
}

export async function createApplication(input: NewApplication): Promise<Application> {
  await wait(DELAY_MS);
  const created: Application = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  writeAll([created, ...readAll()]);
  return created;
}

export async function updateApplication(
  id: string,
  changes: Partial<Application>
): Promise<Application> {
  await wait(DELAY_MS);
  const list = readAll();
  const existing = list.find((a) => a.id === id);
  if (!existing) throw new Error("Application not found");
  const updated: Application = { ...existing, ...changes, id: existing.id };
  writeAll(list.map((a) => (a.id === id ? updated : a)));
  return updated;
}

export async function deleteApplication(id: string): Promise<void> {
  await wait(DELAY_MS);
  writeAll(readAll().filter((a) => a.id !== id));
}