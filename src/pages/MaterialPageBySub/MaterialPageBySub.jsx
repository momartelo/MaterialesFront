import styles from "./MaterialPageBySub.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";
import Material from "../../components/Material/Material";
import Navbar from "../../components/Navbar/Navbar";

function MaterialPageBySub() {
  const { categoryId, subcategoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [materialsFitered, setMaterialsFiltered] = useState([]);
  const { auth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const getCategories = useCallback(() => {
    fetch(`${API_URL}/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  const getCategoryName = useCallback(() => {
    const foundCategory = categories.find((cat) => cat._id === categoryId);
    setCategory(foundCategory);
  }, [categories, categoryId]);

  const getMaterialsFiltered = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetch(`${API_URL}/material/cat/${categoryId}/${subcategoryId}`, {
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
  }, [auth.token, categoryId, subcategoryId]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    if (categories.length > 0) {
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

  const handleMaterialDeleted = () => {
    // Actualizar la lista de materiales filtrados después de eliminar
    getMaterialsFiltered();
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
            getMaterial={getMaterialsFiltered}
            materials={materialsFitered}
            onMaterialDelete={handleMaterialDeleted}
          />
        )}
      </main>
    </div>
  );
}

export default MaterialPageBySub;

// return (
//     <div className={styles.container}>
//       <Navbar3 />
//       <h2>Materiales</h2>
//       {category ? (
//         <h3>Categoria: {category.category}</h3>
//       ) : (
//         <h3>Cargando categoria....</h3>
//       )}
//       <main className={styles.section}>
//         <Material
//           getMaterial={getMaterialsFiltered}
//           materials={materialsFitered}
//         />
//       </main>
//     </div>
//   );
// }
