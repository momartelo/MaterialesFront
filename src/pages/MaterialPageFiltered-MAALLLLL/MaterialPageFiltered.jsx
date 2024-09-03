import styles from "./MaterialPageFiltered.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../utils/config";
import { AuthContext } from "../../providers/AuthProvider";
import Material from "../../components/Material/Material";
import Navbar from "../../components/Navbar/Navbar";

function MaterialPageFiltered() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [materialsFitered, setMaterialsFiltered] = useState([]);
  const { auth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  // console.log("hola");
  // console.log(categoryId);

  const getCategories = useCallback(() => {
    fetch(`${API_URL}/category`)
      .then((res) => res.json())
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
        headers: {
          Authorization: auth.token,
        },
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
  }, [auth.token, categoryId]);

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
    <div className={styles.container}>
      <Navbar />
      <h2>Materiales</h2>
      {category ? (
        <h3>Categoria: {category.category}</h3>
      ) : (
        <h3>Cargando categoria....</h3>
      )}
      <main className={styles.section}>
        {isLoading ? (
          <div className={styles.loading}>
            <p>Cargando materiales...</p>
          </div>
        ) : (
          <Material
            getMaterial={getMaterialFiltered}
            materials={materialsFitered}
            onMaterialDelete={handleMaterialDeleted}
          />
        )}
      </main>
    </div>
  );
}

export default MaterialPageFiltered;
