import { Link } from "react-router";

export function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-700 px-6 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
        Track every application.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-zinc-200 sm:text-xl">
        You applied. Now stay organized. Monitor stages, follow up, and never lose track of where you applied.
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/applications" className="rounded-md bg-white px-6 py-3 text-sm font-medium text-black hover:bg-zinc-100">
          View Applications
        </Link>
        <Link to="/new" className="rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white hover:bg-white/20">
          + New Application
        </Link>
      </div>
    </div>
  );
}