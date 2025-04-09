import React, { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext();

const ThemeContextPrvider = ({ children }) => {
  // const [isDark, setTheme] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.remove("dark");

    document.documentElement.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  const ToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const ContextValues = {
    theme,
    ToggleTheme,
  };

  return (
    <ThemeContext.Provider value={ContextValues}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
export default ThemeContextPrvider;
