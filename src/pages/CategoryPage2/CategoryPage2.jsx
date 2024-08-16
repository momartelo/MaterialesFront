import { useCallback, useContext, useEffect, useState } from "react";
import Category from "../../components/Category/Category.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { fetchCategoriesWithoutAuth } from "../../functions/getCategory.js";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./CategoryPage2.module.css";
import { ClipLoader, CircleLoader, FadeLoader } from "react-spinners"; // Importa el loader

function CategoryPage2() {
  const [categories, setCategories] = useState([]);
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [minLoadingTimeElapsed, setMinLoadingTimeElapsed] = useState(false);

  const MIN_LOADING_TIME = 2000; // Tiempo mínimo en milisegundos (2 segundos)

  const getCategory = useCallback(() => {
    setLoading(true);
    fetchCategoriesWithoutAuth()
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getCategory();

    const timer = setTimeout(() => {
      setMinLoadingTimeElapsed(true);
    }, MIN_LOADING_TIME);

    return () => clearTimeout(timer);
  }, [getCategory]);

  return (
    <div className={styles.containerCategoryPage}>
      <Navbar />
      <div className={styles.containerTitle}>
        <img src="../../../public/img/categoria.png" alt="" />
        <h2>Categorias</h2>
      </div>
      <main className={styles.main}>
        {loading || !minLoadingTimeElapsed ? (
          <div className={styles.loaderContainer}>
            <FadeLoader color="#007bff" loading={true} size={100} />
          </div>
        ) : (
          <Category getCategory={getCategory} categories={categories} />
        )}
      </main>
    </div>
  );
}

export default CategoryPage2;
