export type Stage = "wishlist" | "applied" | "interview" | "offer" | "closed";

export type StageFilter = Stage | "all";

export interface Application {
  id: string;
  company: string;
  role: string;
  link?: string;
  dateSent: string;
  nextStepDate?: string;
  stage: Stage;
  notes?: string;
  createdAt: string;
}

export type NewApplication = Omit<Application, "id" | "createdAt">;