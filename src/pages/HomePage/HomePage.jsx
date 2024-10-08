import CarouselComponent from "../../components/Carousel/CarouselComponent";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./HomePage.module.css";
import Footer from "../../components/Footer/Footer";
import useAppContext from "../../hooks/useAppContext";

const HomePage = () => {
  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  return (
    <>
      <Navbar />
      <div className={`${styles.containerHome} ${containerClass} ${modeClass}`}>
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
};
export default HomePage;
