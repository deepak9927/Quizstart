import React, { createContext, useState } from "react";

// Create the ThemeContext
export const ThemeContext = createContext();

// Create the ThemeProvider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme is light

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};