import { useContext } from "react";
import Category from "../../components/Category/Category.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./CategoryPage2.module.css";
import { FadeLoader } from "react-spinners"; // Importa el loader
import { useCategoriesWithoutAuth } from "../../hooks/useCategoriesWithoutAuth.js";
import Footer from "../../components/Footer/Footer.jsx";
import useAppContext from "../../hooks/useAppContext.js";

function CategoryPage2() {
  const { isNightMode, containerClass } = useAppContext(styles);
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
        className={`${styles.containerCategoryPage} ${containerClass} ${modeClass}`}
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
