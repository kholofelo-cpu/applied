import { Link } from "react-router";

export function NewApplicationPage() {
  return (
    <main className="p-4">
      <Link to="/"> Back to all applications</Link>
      <h1 className="text-2xl font-bold">Add an application</h1>
      <p>The form comes in Step 5.</p>
    </main>
  );
}