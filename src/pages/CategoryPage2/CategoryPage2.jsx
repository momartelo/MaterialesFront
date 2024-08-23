import { useCallback, useContext, useEffect, useState } from "react";
import Category from "../../components/Category/Category.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { fetchCategoriesWithoutAuth } from "../../functions/getCategory.js";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./CategoryPage2.module.css";
import { FadeLoader } from "react-spinners"; // Importa el loader
import { useCategoriesWithoutAuth } from "../../hooks/useCategoriesWithoutAuth.js";

function CategoryPage2() {
  const { categories, loading, minLoadingTimeElapsed, error } =
    useCategoriesWithoutAuth();
  const { auth } = useContext(AuthContext);

  if (error) {
    return <div>Error al cargar categorías: {error.message}</div>;
  }
  // const getCategory = useCallback(() => {
  //   setLoading(true);
  //   fetchCategoriesWithoutAuth()
  //     .then((data) => {
  //       setCategories(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   getCategory();

  //   const timer = setTimeout(() => {
  //     setMinLoadingTimeElapsed(true);
  //   }, MIN_LOADING_TIME);

  //   return () => clearTimeout(timer);
  // }, [getCategory]);

  return (
    <div className={styles.containerCategoryPage}>
      <Navbar />
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
  );
}

export default CategoryPage2;
