import { Link, Outlet } from "react-router";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../components/ThemeToggle";

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 p-4">
          <Link to="/" className="text-xl font-bold">
            Applied
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild>
              <Link to="/new">+ Add application</Link>
            </Button>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-5xl">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout