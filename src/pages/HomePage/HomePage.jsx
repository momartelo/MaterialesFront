import CarouselComponent from "../../components/Carousel/CarouselComponent";
import Navbar from "../../components/Navbar/Navbar";
import Navbar3 from "../../components/Navbar3/Navbar3";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import { useTheme } from "../../providers/ThemeProvider";

function HomePage() {
  const { auth } = useContext(AuthContext);
  const { isNightMode, toggleTheme } = useTheme();

  return (
    <>
      <div className={isNightMode ? "night-mode" : "day-mode"}>
        <Navbar />
        <button onClick={toggleTheme} className={styles.themeToggle}>
          {isNightMode ? "Modo Dia" : "Modo Noche"}
        </button>
        <CarouselComponent />
        <div className={styles.container}>
          <h1>Sistema de Materiales</h1>
          <p>
            En este sistema tendremos una base de datos de materiales de obras
            donde se puedan ver precios, agragar materiales, actualizar, ver
            historial de precios. Los materiales se cargaran el la moneda que
            cotize el proveedor y a partir de alli la base se encargara de pasar
            el valor a pesos, dolares o euros de acuardo a la cotizacion del
            dia.
          </p>
        </div>
      </div>
    </>
  );
}
export default HomePage;
