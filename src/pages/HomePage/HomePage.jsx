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
  return (
    <>
      <Navbar />
      {isDesktopFullHD && (
        <div
          className={`${styles.containerFullHD} ${
            isNightMode ? styles.nightMode : styles.dayMode
          }`}
        >
          <div className={styles.containerCarouselFullHD}>
            <CarouselComponent />
          </div>
          <div className={styles.containerFullHDTitle}>
            <h1>Sistema de Materiales</h1>
          </div>
          <p>
            En este sistema tendremos una base de datos de materiales de obras
            donde se puedan ver precios, agregar materiales, actualizar, ver
            historial de precios. Los materiales se cargaran el la moneda que
            cotize el proveedor y a partir de alli la base se encargara de pasar
            el valor a pesos, dolares o euros de acuardo a la cotizacion del
            dia.
          </p>
        </div>
      )}
      {isDesktopHD && (
        <div
          className={`${styles.containerHD} ${
            isNightMode ? styles.nightMode : styles.dayMode
          }`}
        >
          <div className={styles.containerCarousel}>
            <CarouselComponent />
          </div>
          <div className={styles.textsHD}>
            <h1>Sistema de Materiales</h1>
            <p>
              En este sistema tendremos una base de datos de materiales de obras
              donde se puedan ver precios, agregar materiales, actualizar, ver
              historial de precios. Los materiales se cargaran el la moneda que
              cotize el proveedor y a partir de alli la base se encargara de
              pasar el valor a pesos, dolares o euros de acuardo a la cotizacion
              del dia.
            </p>
          </div>
        </div>
      )}
      {isTabletHD && (
        <div
          className={`${styles.containerTabletHD} ${
            isNightMode ? styles.nightMode : styles.dayMode
          }`}
        >
          <div className={styles.containerCarousel}>
            <CarouselComponent />
          </div>
          <div className={styles.textsTabletHD}>
            <h1>Sistema de Materiales</h1>
            <p>
              En este sistema tendremos una base de datos de materiales de obras
              donde se puedan ver precios, agregar materiales, actualizar, ver
              historial de precios. Los materiales se cargaran el la moneda que
              cotize el proveedor y a partir de alli la base se encargara de
              pasar el valor a pesos, dolares o euros de acuardo a la cotizacion
              del dia.
            </p>
          </div>
        </div>
      )}
      {isTablet && (
        <div
          className={`${styles.containerTablet} ${
            isNightMode ? styles.nightMode : styles.dayMode
          }`}
        >
          <div className={styles.containerCarouselTablet}>
            <CarouselComponent />
          </div>
          <div className={styles.textsTablet}>
            <h1>Sistema de Materiales</h1>
            <p>
              En este sistema tendremos una base de datos de materiales de obras
              donde se puedan ver precios, agregar materiales, actualizar, ver
              historial de precios. Los materiales se cargaran el la moneda que
              cotize el proveedor y a partir de alli la base se encargara de
              pasar el valor a pesos, dolares o euros de acuardo a la cotizacion
              del dia.
            </p>
          </div>
        </div>
      )}
      {isMobileLandscape && (
        <div
          className={`${styles.containerMobileLandscape} ${
            isNightMode ? styles.nightMode : styles.dayMode
          }`}
        >
          <div className={styles.containerCarouselMobileLandscape}>
            <CarouselComponent />
          </div>
          <div className={styles.textsMobileLandscape}>
            <h1>Sistema de Materiales</h1>
            <p>
              En este sistema tendremos una base de datos de materiales de obras
              donde se puedan ver precios, agregar materiales, actualizar, ver
              historial de precios. Los materiales se cargaran el la moneda que
              cotize el proveedor y a partir de alli la base se encargara de
              pasar el valor a pesos, dolares o euros de acuardo a la cotizacion
              del dia.
            </p>
          </div>
        </div>
      )}
      {isMobile && (
        <div
          className={`${styles.containerMobile} ${
            isNightMode ? styles.nightMode : styles.dayMode
          }`}
        >
          <div className={styles.containerCarouselMobile}>
            <CarouselComponent />
          </div>
          <div className={styles.textsMobile}>
            <h1>Sistema de Materiales</h1>
            <p>
              En este sistema tendremos una base de datos de materiales de obras
              donde se puedan ver precios, agregar materiales, actualizar, ver
              historial de precios. Los materiales se cargaran el la moneda que
              cotize el proveedor y a partir de alli la base se encargara de
              pasar el valor a pesos, dolares o euros de acuardo a la cotizacion
              del dia.
            </p>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
export default HomePage;
