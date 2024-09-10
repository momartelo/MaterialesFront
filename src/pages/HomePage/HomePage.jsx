import CarouselComponent from "../../components/Carousel/CarouselComponent";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./HomePage.module.css";
import { useTheme } from "../../providers/ThemeProvider";
import { useResponsive } from "../../providers/ResponsiveContext";
import Footer from "../../components/Footer/Footer";

function HomePage() {
  const { isNightMode } = useTheme();
  const {
    isDesktopHD,
    isDesktopFullHD,
    isTabletHD,
    isTablet,
    isMobile,
    isMobileLandscape,
  } = useResponsive();

  const getContainerClass = () => {
    if (isDesktopFullHD) return styles.containerFullHD;
    if (isDesktopHD) return styles.containerHD;
    if (isTabletHD) return styles.containerTabletHD;
    if (isTablet) return styles.containerTablet;
    if (isMobileLandscape) return styles.containerMobileLandscape;
    if (isMobile) return styles.containerMobile;
    return "";
  };

  const containerClass = getContainerClass();
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  return (
    <>
      <Navbar />
      <div className={`${containerClass} ${modeClass}`}>
        <div className={`${styles.containerCarousel} ${containerClass} `}>
          <CarouselComponent />
        </div>
        <div className={`${styles.texts} ${containerClass} ${modeClass}`}>
          <h1>Sistema de Materiales</h1>

          <p>
            En este sistema tendremos una base de datos de materiales de obras
            donde se puedan ver precios, agregar materiales, actualizar, ver
            historial de precios. Los materiales se cargaran el la moneda que
            cotize el proveedor y a partir de alli la base se encargara de pasar
            el valor a pesos, dolares o euros de acuardo a la cotizacion del
            dia.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default HomePage;
