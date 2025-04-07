import React, { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext();

const ThemeContextPrvider = ({ children }) => {
  // const [isDark, setTheme] = useState(false);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    // Remove both classes first
    document.documentElement.classList.remove("dark");
    // Add the current theme class
    document.documentElement.classList.add(theme);
    // Save it in localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const ToggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  console.log(theme);

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
