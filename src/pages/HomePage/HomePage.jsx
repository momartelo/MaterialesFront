import CarouselComponent from "../../components/Carousel/CarouselComponent";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./HomePage.module.css";
import { useTheme } from "../../providers/ThemeProvider";
import { useResponsive } from "../../providers/ResponsiveContext";

function HomePage() {
  const { isNightMode } = useTheme();
  const { isDesktopHD, isDesktopFullHD, isTablet, isMobile } = useResponsive();
  return (
    <>
      {isDesktopFullHD && (
        <div
          className={`${styles.containerFullHD} ${
            isNightMode ? styles.nightMode : styles.dayMode
          }`}
        >
          <Navbar />
          <CarouselComponent />
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
          <Navbar />
          <CarouselComponent />
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
      )}
      {isTablet && (
        <div
          className={`${styles.containerTablet} ${
            isNightMode ? styles.nightMode : styles.dayMode
          }`}
        >
          <Navbar />
          <CarouselComponent />
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
      )}
    </>
  );
}
export default HomePage;
