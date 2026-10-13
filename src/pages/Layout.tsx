import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <>
      <header className="flex items-center justify-between border-b p-4">
        <Link to="/" className="text-xl font-bold">
          Applied
        </Link>
        <Link to="/new" className="rounded border px-3 py-2">
          + Add application
        </Link>
      </header>
      <Outlet />
    </>
  );
}

export default Layout;