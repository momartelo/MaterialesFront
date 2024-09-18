import { useContext } from "react";
import Category from "../../components/Category/Category.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./CategoryPage2.module.css";
import { FadeLoader } from "react-spinners"; // Importa el loader
import { useCategoriesWithoutAuth } from "../../hooks/useCategoriesWithoutAuth.js";
import { useTheme } from "../../providers/ThemeProvider.jsx";
import { useResponsive } from "../../providers/ResponsiveContext.jsx";
import Footer from "../../components/Footer/Footer.jsx";

function CategoryPage2() {
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

  const categoryClass = getContainerClass();
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const { categories, loading, minLoadingTimeElapsed, error } =
    useCategoriesWithoutAuth();
  const { auth } = useContext(AuthContext);

  if (error) {
    return <div>Error al cargar categorías: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <div
        className={`${styles.containerCategoryPage} ${categoryClass} ${modeClass}`}
      >
        <div className={styles.containerTitle}>
          <img src="/img/categoria.png" alt="" />
          <h2>Categorias</h2>
        </div>
        <main className={styles.main}>
          {loading || !minLoadingTimeElapsed ? (
            <div className={styles.loaderContainer}>
              <FadeLoader color="#007bff" loading={true} size={100} />
            </div>
          ) : (
            <Category categories={categories} />
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage2;
