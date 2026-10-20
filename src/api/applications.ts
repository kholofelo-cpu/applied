import { supabase } from "../lib/supabase";
import type { Application, NewApplication } from "../types";

type DbRow = {
  id: string;
  company: string;
  role: string;
  link: string | null;
  dateSent: string;
  stage: Application["stage"];
  notes: string | null;
  created_at: string;
};

function toApp(row: DbRow): Application {
  return {
    id: row.id,
    company: row.company,
    role: row.role,
    link: row.link || "",
    dateSent: row.dateSent,
    stage: row.stage,
    notes: row.notes || "",
    createdAt: row.created_at,
  };
}

export async function fetchApplications(): Promise<Application[]> {
  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as DbRow[] || []).map(toApp);
}

export async function createApplication(input: NewApplication): Promise<Application> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in");

  const { data, error } = await supabase
    .from("applications")
    .insert({
      user_id: user.id,
      company: input.company,
      role: input.role,
      link: input.link,
      dateSent: input.dateSent,
      stage: input.stage,
      notes: input.notes,
    })
    .select()
    .single();

  if (error) throw error;
  return toApp(data as DbRow);
}

export async function updateApplication(
  id: string,
  changes: Partial<Application>
): Promise<Application> {
  const dbChanges: Record<string, string> = {};
  if (changes.company !== undefined) dbChanges.company = changes.company;
  if (changes.role !== undefined) dbChanges.role = changes.role;
  if (changes.link !== undefined) dbChanges.link = changes.link;
  if (changes.dateSent !== undefined) dbChanges.dateSent = changes.dateSent;
  if (changes.stage !== undefined) dbChanges.stage = changes.stage;
  if (changes.notes !== undefined) dbChanges.notes = changes.notes;

  const { data, error } = await supabase
    .from("applications")
    .update(dbChanges)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return toApp(data as DbRow);
}

export async function deleteApplication(id: string): Promise<void> {
  const { error } = await supabase.from("applications").delete().eq("id", id);
  if (error) throw error;
}