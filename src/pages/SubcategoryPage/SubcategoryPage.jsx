import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./SubcategoryPage.module.css";
import Subcategory from "../../components/Subcategory/Subcategory.jsx";
import { FadeLoader } from "react-spinners"; // Importa el loader
import { useSubcategoriesWithoutAuth } from "../../hooks/useSubcategoriesWithoutAuth.js";
import { useCategoriesWithoutAuth } from "../../hooks/useCategoriesWithoutAuth.js";
import Footer from "../../components/Footer/Footer.jsx";
import { useTheme } from "../../providers/ThemeProvider.jsx";
import { useResponsive } from "../../providers/ResponsiveContext.jsx";

function SubcategoryPage() {
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

  const subcategoryClass = getContainerClass();
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [minLoadingTimeElapsed, setMinLoadingTimeElapsed] = useState(false);

  const MIN_LOADING_TIME = 2000; // Tiempo mínimo en milisegundos (2 segundos)

  const { subcategories: subcategoriesData, loading: loadingSubcategories } =
    useSubcategoriesWithoutAuth();

  const { categories: categoriesData, loading: loadingCategories } =
    useCategoriesWithoutAuth();

  useEffect(() => {
    if (!loadingSubcategories && !loadingCategories) {
      setSubcategories(subcategoriesData);
      setCategories(categoriesData);
      setLoading(false);
    }
  }, [
    loadingSubcategories,
    subcategoriesData,
    loadingCategories,
    categoriesData,
  ]);

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
        className={`${styles.containerSubcategoryPage} ${subcategoryClass} ${modeClass}`}
      >
        <div className={styles.containerTitle}>
          <img src="/img/categoria.png" alt="" />
          <h2>Subcategorias</h2>
        </div>
        <main className={styles.main}>
          {loading || !minLoadingTimeElapsed ? (
            <div className={styles.loaderContainer}>
              <FadeLoader color="#007bff" loading={true} size={100} />
            </div>
          ) : (
            <Subcategory
              subcategories={subcategories}
              categories={categories}
            />
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default SubcategoryPage;
