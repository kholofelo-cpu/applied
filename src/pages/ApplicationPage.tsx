import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Application, Stage } from "../types";
import { useApplications } from "../hooks/useApplications";
import {
  STAGES,
  STAGE_LABELS,
  daysSince,
  daysAgoLabel,
  formatDate,
  needsNudge,
} from "../lib/applications";
import { StageBadge } from "../components/StageBadge";

const nativeClass =
  "w-full rounded-md border bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function ApplicationPage() {
  const { id } = useParams();
  const { applications, loading, error, saving, update, remove } = useApplications();

  if (loading) {
    return (
      <main className="p-4" aria-busy="true">
        Loading…
      </main>
    );
  }

  if (error) {
    return (
      <main className="space-y-2 p-4">
        <p role="alert">{error}</p>
        <Link to="/" className="underline">
          Back to all applications
        </Link>
      </main>
    );
  }

  const application = applications.find((a) => a.id === id);

  if (!application) {
    return (
      <main className="space-y-2 p-4">
        <p>We could not find that application.</p>
        <Link to="/" className="underline">
          Back to all applications
        </Link>
      </main>
    );
  }

  return (
    <ApplicationDetail
      application={application}
      saving={saving}
      update={update}
      remove={remove}
    />
  );
}

type DetailProps = {
  application: Application;
  saving: boolean;
  update: (id: string, changes: Partial<Application>) => Promise<Application>;
  remove: (id: string) => Promise<void>;
};

// A separate component so the notes state can start from the loaded value.
function ApplicationDetail({ application, saving, update, remove }: DetailProps) {
  const navigate = useNavigate();
  const [notes, setNotes] = useState(application.notes ?? "");
  const [confirming, setConfirming] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const days = daysSince(application.dateSent);
  const nudge = needsNudge(application);

  // Runs a write and shows a message if it fails.
  async function run(work: () => Promise<unknown>) {
    setMessage(null);
    try {
      await work();
    } catch {
      setMessage("Something went wrong saving that. Please try again.");
    }
  }

  function handleStageChange(e: ChangeEvent<HTMLSelectElement>) {
    return run(() => update(application.id, { stage: e.target.value as Stage }));
  }

  function handleSaveNotes() {
    return run(() => update(application.id, { notes: notes.trim() || undefined }));
  }

  function handleDelete() {
    return run(async () => {
      await remove(application.id);
      navigate("/applications");
    });
  }

  return (
    <main className="space-y-4 p-4">
      <Link to="/applications" className="text-sm underline">
        ← Back to all applications
      </Link>

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold">{application.company}</h1>
        <StageBadge stage={application.stage} />
      </div>
      <p className="text-lg">{application.role}</p>

      <p className="text-sm">
        Sent {formatDate(application.dateSent)} · {daysAgoLabel(days)}
        {application.link && (
          <>
            {" "}
            ·{" "}
            <a
              href={application.link}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              View the advert ↗
            </a>
          </>
        )}
      </p>

      {nudge && <p className="text-sm font-semibold">Needs a nudge</p>}
      {message && <p role="alert">{message}</p>}

      <div className="max-w-xs space-y-1">
        <Label htmlFor="stage">Stage</Label>
        <select
          id="stage"
          value={application.stage}
          onChange={handleStageChange}
          disabled={saving}
          className={nativeClass}
        >
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {STAGE_LABELS[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <textarea
          id="notes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={nativeClass}
        />
        <Button type="button" onClick={handleSaveNotes} disabled={saving}>
          {saving ? "Saving…" : "Save notes"}
        </Button>
      </div>

      {confirming ? (
        <div role="alertdialog" aria-label="Confirm delete" className="space-y-2 rounded-md border p-3">
          <p>Delete this application? This cannot be undone.</p>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleDelete} disabled={saving}>
              Yes, delete
            </Button>
            <Button type="button" onClick={() => setConfirming(false)} disabled={saving}>
              Keep it
            </Button>
          </div>
        </div>
      ) : (
        <Button type="button" variant="outline" onClick={() => setConfirming(true)}>
          Delete this application
        </Button>
      )}
    </main>
  );
}