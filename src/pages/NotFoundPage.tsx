import { Link } from "react-router";

export function NotFoundPage() {
  return (
    <main className="space-y-2 p-4">
      <h1 className="text-2xl font-bold">That page does not exist</h1>
      <p>You may have followed an old link, or mistyped the address.</p>
      <Link to="/">Back to all applications</Link>
    </main>
  );
}