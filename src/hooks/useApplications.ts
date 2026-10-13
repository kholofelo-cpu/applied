import { useCallback, useEffect, useState } from "react";
import type { Application, NewApplication } from "../types";
import {
  fetchApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "../api/applications";

export function useApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Used after every write. It is not called from the effect below.
  const reload = useCallback(async () => {
    try {
      setError(null);
      setApplications(await fetchApplications());
    } catch {
      setError("Something went wrong loading your applications.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Load once when the component using this hook first appears.
  useEffect(() => {
    let cancelled = false;
    fetchApplications()
      .then((list) => {
        if (!cancelled) setApplications(list);
      })
      .catch(() => {
        if (!cancelled) setError("Something went wrong loading your applications.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Run a write, then refresh so the screen and the stored data never disagree.
  async function run<T>(work: () => Promise<T>): Promise<T> {
    setSaving(true);
    try {
      const result = await work();
      await reload();
      return result;
    } finally {
      setSaving(false);
    }
  }

  const add = (input: NewApplication) => run(() => createApplication(input));
  const update = (id: string, changes: Partial<Application>) =>
    run(() => updateApplication(id, changes));
  const remove = (id: string) => run(() => deleteApplication(id));

  return { applications, loading, error, saving, add, update, remove, reload };
}