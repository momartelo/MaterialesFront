import React, { createContext, useContext } from "react";
import { useMediaQuery } from "react-responsive";

const ResponsiveContext = createContext();

export const ResponsiveProvider = ({ children }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });
  const isDesktopHD = useMediaQuery({
    query: "(min-width: 1280px) and (max-width: 1360px)",
  });
  const isDesktopFullHD = useMediaQuery({ query: "(min-width: 1361px)" });

  return (
    <ResponsiveContext.Provider
      value={{ isMobile, isTablet, isDesktopHD, isDesktopFullHD }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useResponsive = () => {
  return useContext(ResponsiveContext);
};

// Breakpoints más detallados:
// Algunos desarrolladores utilizan breakpoints más específicos para adaptar el contenido a diferentes dispositivos y orientaciones de pantalla:

// 320px: Dispositivos móviles pequeños.
// 480px: Teléfonos móviles en general.
// 768px: Tablets y teléfonos en modo horizontal.
// 1024px: Tablets grandes, dispositivos híbridos.
// 1200px: Laptops y monitores pequeños.
// 1440px: Monitores de escritorio.
// 1600px: Monitores grandes y pantallas de alta resolución.
