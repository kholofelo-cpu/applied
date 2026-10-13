import { Button } from "@/components/ui/button";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button variant="outline" onClick={toggleTheme}>
      {theme === "dark" ? "Light" : "Dark"}
    </Button>
  );
}