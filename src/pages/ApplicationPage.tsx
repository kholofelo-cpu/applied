import { Link, useParams } from "react-router";
import { seed } from "../data/seed"; // temporary, replaced by the hook in Step 4

export function ApplicationPage() {
  const { id } = useParams();
  const application = seed.find((job) => job.id === id);

  if (!application) {
    return (
      <main className="p-4">
        <p>We could not find that application.</p>
        <Link to="/">Back to all applications</Link>
      </main>
    );
  }

  return (
    <main className="space-y-2 p-4">
      <Link to="/">← Back to all applications</Link>
      <h1 className="text-2xl font-bold">{application.company}</h1>
      <p>{application.role}</p>
    </main>
  );
}