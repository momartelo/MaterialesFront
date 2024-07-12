import { createContext, useState, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isNightMode, setIsNightMode] = useState(false);

  const toggleTheme = () => {
    setIsNightMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isNightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
