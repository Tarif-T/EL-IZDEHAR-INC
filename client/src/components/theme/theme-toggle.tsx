import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/theme/theme-provider";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Button
      type="button"
      variant="ghost"
      size={showLabel ? "sm" : "icon"}
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={label}
      title={label}
      className={cn(
        "rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300",
        showLabel && "w-full justify-start gap-3 px-4",
        className,
      )}
      data-testid="theme-toggle"
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <Sun
          className={cn(
            "absolute transition-all duration-300",
            isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100",
          )}
        />
        <Moon
          className={cn(
            "absolute transition-all duration-300",
            isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0",
          )}
        />
      </span>
      {showLabel && <span className="font-medium">{isDark ? "Light mode" : "Dark mode"}</span>}
    </Button>
  );
}
