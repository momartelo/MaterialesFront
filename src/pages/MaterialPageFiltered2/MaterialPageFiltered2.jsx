import styles from "./MaterialPageFiltered2.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../utils/config";
import { AuthContext } from "../../providers/AuthProvider";
import Material from "../../components/Material/Material";
import Navbar from "../../components/Navbar/Navbar";
import { useCategoriesWithoutAuth } from "../../hooks/useCategoriesWithoutAuth";
import Footer from "../../components/Footer/Footer";
import { useTheme } from "../../providers/ThemeProvider";
import { useResponsive } from "../../providers/ResponsiveContext";

function MaterialPageFiltered2() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [materialsFitered, setMaterialsFiltered] = useState([]);
  const { auth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);

  const { isNightMode } = useTheme();
  const {
    isDesktopHD,
    isDesktopFullHD,
    isTabletHD,
    isTablet,
    isMobile,
    isMobileLandscape,
  } = useResponsive();

  console.log({
    isDesktopHD,
    isDesktopFullHD,
    isTabletHD,
    isTablet,
    isMobile,
    isMobileLandscape,
  });

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

  const { categories: categoriesData, loading: loadingCategories } =
    useCategoriesWithoutAuth();

  useEffect(() => {
    if (!loadingCategories) {
      setCategories(categoriesData);
      setLoading(false);
    }
  }, [loadingCategories, categoriesData]);

  const getCategoryName = useCallback(() => {
    const foundCategory = categories.find((cat) => cat._id === categoryId);
    setCategory(foundCategory);
  }, [categories, categoryId]);

  const getMaterialFiltered = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetch(`${API_URL}/material/by/${categoryId}`, {
        // headers: {
        //   Authorization: auth.token,
        // },
      })
        .then((res) => res.json())
        .then((data) => {
          setMaterialsFiltered(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }, 1000);
  }, [categoryId]);

  useEffect(() => {
    if (categories.length > 0) {
      getCategoryName();
      getMaterialFiltered();
    }
  }, [categories, getCategoryName, getMaterialFiltered, categoryId]);

  // const handleMaterialDeleted = () => {
  //   // Actualizar la lista de materiales filtrados después de eliminar
  //   getMaterialFiltered();
  //   // Actualizar la categoría después de la eliminación
  //   getCategoryName();
  // };

  return (
    <>
      <Navbar />
      {/* <div
        className={`${styles.containerMaterialPageFiltered} ${materialClass} ${modeClass}`}
      > */}
      <div
        className={`${styles.containerFiltered} ${materialClass} ${modeClass}`}
      >
        <h2>Materiales</h2>
        {category ? (
          <div className={styles.containerCategoryText}>
            <img src="/img/flecha-correcta.png" alt="" />
            <h3>Categoria:&nbsp;</h3> <h3>{category.category}</h3>
          </div>
        ) : (
          <h3>Cargando categoria....</h3>
        )}
        <main className={styles.sectionFiltered}>
          {isLoading ? (
            <div className={styles.loading}>
              <p>Cargando materiales...</p>
            </div>
          ) : (
            <Material
              getMaterial={getMaterialFiltered}
              materials={materialsFitered}
              categories={categories}
            />
          )}
        </main>
      </div>
      {/* </div> */}
      <Footer />
    </>
  );
}

export default MaterialPageFiltered2;
