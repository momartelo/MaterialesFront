import CarouselComponent from "../../components/Carousel/CarouselComponent";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import { useTheme } from "../../providers/ThemeProvider";

function HomePage() {
  const { isNightMode } = useTheme();
  return (
    <>
      <div
        className={`${styles.container} ${
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
          el valor a pesos, dolares o euros de acuardo a la cotizacion del dia.
        </p>
      </div>
    </>
  );
}
export default HomePage;
