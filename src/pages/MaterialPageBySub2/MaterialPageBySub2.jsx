import styles from "./MaterialPageBySub2.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../utils/config";
import { AuthContext } from "../../providers/AuthProvider";
import Material from "../../components/Material/Material";
import Navbar from "../../components/Navbar/Navbar";
import { useCategoriesWithoutAuth } from "../../hooks/useCategoriesWithoutAuth";
import { useSubcategoriesWithoutAuth } from "../../hooks/useSubcategoriesWithoutAuth";
import Footer from "../../components/Footer/Footer";

function MaterialPageBySub2() {
  const { categoryId, subcategoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [subcategory, setSubcategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [materialsFitered, setMaterialsFiltered] = useState([]);
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const { categories: categoriesData, loading: loadingCategories } =
    useCategoriesWithoutAuth();

  useEffect(() => {
    if (!loadingCategories) {
      setCategories(categoriesData);
      setLoading(false);
    }
  }, [loadingCategories, categoriesData]);

  const { subcategories: subcategoriesData, loading: loadingSubcategories } =
    useSubcategoriesWithoutAuth();

  useEffect(() => {
    if (!loadingSubcategories) {
      setSubcategories(subcategoriesData);
      setLoading(false);
    }
  }, [loadingSubcategories, subcategoriesData]);

  const getCategoryName = useCallback(() => {
    const foundCategory = categories.find((cat) => cat._id === categoryId);
    setCategory(foundCategory);
  }, [categories, categoryId]);

  const getSubcategoryName = useCallback(() => {
    const foundSubcategory = subcategories.find(
      (subcat) => subcat._id === subcategoryId
    );
    setSubcategory(foundSubcategory);
  }, [subcategories, subcategoryId]);

  const getMaterialsFiltered = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetch(`${API_URL}/material/cat/${categoryId}/${subcategoryId}`, {
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
  }, [categoryId, subcategoryId]);

  useEffect(() => {
    if (categories.length > 0) {
      console.log(categories);
      getCategoryName();
      getMaterialsFiltered();
    }
  }, [
    categories,
    getCategoryName,
    getMaterialsFiltered,
    categoryId,
    subcategoryId,
  ]);

  useEffect(() => {
    if (subcategories.length > 0) {
      console.log(subcategories);
      getSubcategoryName();
      getMaterialsFiltered();
    }
  }, [
    subcategories,
    getSubcategoryName,
    getMaterialsFiltered,
    categoryId,
    subcategoryId,
  ]);

  const handleMaterialDeleted = () => {
    // Actualizar la lista de materiales filtrados después de eliminar
    getMaterialsFiltered();
    // Actualizar la categoría después de la eliminación
    getCategoryName();
  };

  return (
    <>
      <Navbar />
      <div className={styles.containerBySub}>
        <h2>Materiales</h2>
        {category ? (
          <div className={styles.containerCategoryTitle}>
            <div className={styles.containerCategoryText}>
              <img src="/img/flecha-correcta.png" alt="" />
              <h3>Categoria:&nbsp;</h3> <h3>{category.category}</h3>
            </div>
            <div className={styles.containerSubcategoryText}>
              <img src="/img/puntos-de-menu.png" alt="" />
              <h5>Subcategoria:&nbsp; </h5>{" "}
              {subcategory ? (
                <h5>{subcategory.subcategory}</h5>
              ) : (
                "Cargando subcategoria..."
              )}
            </div>
          </div>
        ) : (
          <h3>Cargando categoria....</h3>
        )}
        <main className={styles.sectionBySub}>
          {isLoading ? (
            <div className={styles.loading}>
              <p>Cargando materiales...</p>
            </div>
          ) : (
            <Material
              getMaterial={getMaterialsFiltered}
              materials={materialsFitered}
              onMaterialDelete={handleMaterialDeleted}
            />
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}

export default MaterialPageBySub2;
