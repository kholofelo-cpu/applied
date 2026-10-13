import type { Application } from "../types";
import { ApplicationCard } from "./ApplicationCard";

type Props = { applications: Application[] };

export function ApplicationList({ applications }: Props) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {applications.map((application) => (
        <li key={application.id}>
          <ApplicationCard application={application} />
        </li>
      ))}
    </ul>
  );
}