import styles from "./UnitPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Unit from "../../components/Unit/Unit";
import { FadeLoader } from "react-spinners"; // Importa el loader
import { useUnitsWithoutAuth } from "../../hooks/useUnitsWithoutAuth";
import Footer from "../../components/Footer/Footer";
import useAppContext from "../../hooks/useAppContext";

const UnitPage = () => {
  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const [units, setUnits] = useState([]);
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [minLoadingTimeElapsed, setMinLoadingTimeElapsed] = useState(false);

  const MIN_LOADING_TIME = 2000; // Tiempo mínimo en milisegundos (2 segundos)

  const { units: unitsData, loading: loadingUnits } = useUnitsWithoutAuth();

  useEffect(() => {
    if (!loadingUnits) {
      setUnits(unitsData);
      setLoading(false);
    }
  }, [loadingUnits, unitsData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingTimeElapsed(true);
    }, MIN_LOADING_TIME);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div
        className={`${styles.containerUnitPage} ${containerClass} ${modeClass}`}
      >
        <div className={styles.containerTitle}>
          <img src="/img/categoria.png" alt="" />
          <h2>Unidades</h2>
        </div>
        <main className={styles.main}>
          {loading || !minLoadingTimeElapsed ? (
            <div className={styles.loaderContainer}>
              <FadeLoader color="#007bff" loading={true} size={100} />
            </div>
          ) : (
            <Unit units={units} />
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default UnitPage;
