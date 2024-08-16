import { useCallback, useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./SubcategoryPage.module.css";
import { fetchSubcategoriesWithoutAuth } from "../../functions/getSubcategory.js";
import Subcategory from "../../components/Subcategory/Subcategory.jsx";
import { ClipLoader, CircleLoader, FadeLoader } from "react-spinners"; // Importa el loader

function SubcategoryPage() {
  const [subcategories, setSubcategories] = useState([]);
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [minLoadingTimeElapsed, setMinLoadingTimeElapsed] = useState(false);

  const MIN_LOADING_TIME = 2000; // Tiempo mínimo en milisegundos (2 segundos)

  const getSubcategory = useCallback(() => {
    setLoading(true);
    fetchSubcategoriesWithoutAuth()
      .then((data) => {
        setSubcategories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getSubcategory();

    const timer = setTimeout(() => {
      setMinLoadingTimeElapsed(true);
    }, MIN_LOADING_TIME);

    return () => clearTimeout(timer);
  }, [getSubcategory]);

  return (
    <div className={styles.containerSubcategoryPage}>
      <Navbar />
      <div className={styles.containerTitle}>
        <img src="../../../public/img/categoria.png" alt="" />
        <h2>Subcategorias</h2>
      </div>
      <main className={styles.main}>
        {loading || !minLoadingTimeElapsed ? (
          <div className={styles.loaderContainer}>
            <FadeLoader color="#007bff" loading={true} size={100} />
          </div>
        ) : (
          <Subcategory
            getSubcategory={getSubcategory}
            subcategories={subcategories}
          />
        )}
      </main>
    </div>
  );
}

export default SubcategoryPage;
