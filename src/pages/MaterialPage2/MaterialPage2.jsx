import styles from "../MaterialPage2/MaterialPage2.module.css";
import { useEffect, useState } from "react";
import Material from "../../components/Material/Material";
import Navbar from "../../components/Navbar/Navbar";
import { FadeLoader } from "react-spinners"; // Importa el loader
import Footer from "../../components/Footer/Footer";
import { useCategoriesWithoutAuth } from "../../hooks/useCategoriesWithoutAuth";
import { useMaterialsWithoutAuth } from "../../hooks/useMaterialsWithoutAuth";
import { useTheme } from "../../providers/ThemeProvider";
import { useResponsive } from "../../providers/ResponsiveContext";

function MaterialPage2() {
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
    if (isDesktopFullHD) return styles.fullHD;
    if (isDesktopHD) return styles.hd;
    if (isTabletHD) return styles.tabletHD;
    if (isTablet) return styles.tablet;
    if (isMobileLandscape) return styles.mobileLandscape;
    if (isMobile) return styles.mobile;
    return "";
  };

  const materialClass = getContainerClass();
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const [materials, setMaterials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minLoadingTimeElapsed, setMinLoadingTimeElapsed] = useState(false);

  const MIN_LOADING_TIME = 2000; // Tiempo mínimo en milisegundos (2 segundos)

  const { categories: categoriesData, loading: loadingCategories } =
    useCategoriesWithoutAuth();
  const { materials: materialsData, loading: loadingMaterials } =
    useMaterialsWithoutAuth();

  useEffect(() => {
    if (!loadingCategories && !loadingMaterials) {
      // Cuando los datos se han cargado
      setCategories(categoriesData);
      setMaterials(materialsData);
      setLoading(false);
    }
  }, [loadingCategories, loadingMaterials, categoriesData, materialsData]);

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
        className={`${styles.containerMaterialPage} ${materialClass} ${modeClass}`}
      >
        <div className={styles.containerTitle}>
          <img src="/img/categoria.png" alt="" />
          <h2>Materiales</h2>
        </div>
        <main className={styles.mainMaterialPage}>
          {loading || !minLoadingTimeElapsed ? ( // Muestra el loader si está cargando o no ha pasado el tiempo mínimo
            <div className={styles.loaderContainer}>
              <FadeLoader color="#007bff" loading={true} size={100} />
            </div>
          ) : (
            <Material
              getMaterial={useMaterialsWithoutAuth}
              materials={materials}
              categories={categories}
            />
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default MaterialPage2;
