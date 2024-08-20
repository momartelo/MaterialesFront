import styles from "./MaterialPageFiltered2.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";
import Material from "../../components/Material/Material";
import Navbar from "../../components/Navbar/Navbar";
import { fetchCategoriesWithoutAuth } from "../../functions/getCategory";

function MaterialPageFiltered2() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [materialsFitered, setMaterialsFiltered] = useState([]);
  const { auth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  // console.log("hola");
  // console.log(categoryId);

  const getCategories = useCallback(() => {
    fetchCategoriesWithoutAuth()
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);
  // console.log("categorias");
  // console.log(categories);

  const getCategoryName = useCallback(() => {
    const foundCategory = categories.find((cat) => cat._id === categoryId);
    setCategory(foundCategory);
  }, [categories, categoryId]);

  // console.log("categoria");
  // console.log(category);

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
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    if (categories.length > 0) {
      getCategoryName();
      getMaterialFiltered();
    }
  }, [categories, getCategoryName, getMaterialFiltered, categoryId]);

  const handleMaterialDeleted = () => {
    // Actualizar la lista de materiales filtrados después de eliminar
    getMaterialFiltered();
    // Actualizar la categoría después de la eliminación
    getCategoryName();
  };

  return (
    <div className={styles.containerFiltered}>
      <Navbar />
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
  );
}

export default MaterialPageFiltered2;
