import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isNightMode, setIsNightMode] = useState(false);

  const toggleTheme = () => {
    setIsNightMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const body = document.body;
    if (isNightMode) {
      body.classList.add("nightMode");
      body.classList.remove("dayMode");
    } else {
      body.classList.add("dayMode");
      body.classList.remove("nightMode");
    }
  }, [isNightMode]);

  return (
    <ThemeContext.Provider value={{ isNightMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
