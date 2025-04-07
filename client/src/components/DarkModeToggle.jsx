import { Moon, Sun } from "lucide-react";
import { useThemeContext } from "../contexts/ThemeContext";

export default function DarkModeToggle() {
  const { theme, ToggleTheme } = useThemeContext();

  return (
    <button
      onClick={ToggleTheme}
      className="cursor-pointer border dark:border-gray-800 border-gray-200   flex items-center justify-center  rounded-lg p-1"
    >
      {theme === "dark" ? (
        <Sun size={20} className="object-contain" />
      ) : (
        <Moon size={20} className="object-contain" />
      )}
    </button>
  );
}
