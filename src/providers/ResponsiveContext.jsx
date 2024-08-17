import React, { createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";

const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
  const isMobileLandscape = useMediaQuery({
    query: "(min-width: 481px) and (max-width: 767px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  const isTabletHD = useMediaQuery({
    query: "(min-width: 1024px) and (max-width: 1279px)",
  });
  const isDesktopHD = useMediaQuery({
    query: "(min-width: 1280px) and (max-width: 1440px)",
  });
  const isDesktopFullHD = useMediaQuery({ query: "(min-width: 1441px)" });

  return (
    <ResponsiveContext.Provider
      value={{
        isMobile,
        isMobileLandscape,
        isTablet,
        isTabletHD,
        isDesktopHD,
        isDesktopFullHD,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useResponsive = () => {
  return useContext(ResponsiveContext);
};
