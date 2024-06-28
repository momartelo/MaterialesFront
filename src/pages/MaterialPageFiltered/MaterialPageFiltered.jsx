import styles from "./MaterialPageFiltered.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../utils/consts";
import { AuthContext } from "../../providers/AuthProvider";
import Material from "../../components/Material/Material";
import Navbar3 from "../../components/Navbar3/Navbar3";

function MaterialPageFiltered() {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  console.log("hola");
  console.log(categoryId);

  const getCategories = useCallback(() => {
    fetch(`${API_URL}/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);
  console.log("categorias");
  console.log(categories);

  const getCategoryName = useCallback(() => {
    const foundCategory = categories.find((cat) => cat._id === categoryId);
    setCategory(foundCategory);
  }, [categories, categoryId]);

  console.log("categoria");
  console.log(category);

  const [materialsFitered, setMaterialsFiltered] = useState([]);
  const { auth } = useContext(AuthContext);

  const getMaterialFiltered = useCallback(() => {
    fetch(`${API_URL}/material/by/${categoryId}`, {
      headers: {
        Authorization: auth.token,
      },
    })
      .then((res) => res.json())
      .then((data) => setMaterialsFiltered(data))
      .catch((err) => console.log(err));
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

  return (
    <div className={styles.container}>
      <Navbar3 />
      <h2>Materiales</h2>
      {category ? (
        <h3>Categoria: {category.category}</h3>
      ) : (
        <h3>Cargando categoria....</h3>
      )}
      <main className={styles.section}>
        <Material
          getMaterial={getMaterialFiltered}
          materials={materialsFitered}
        />
      </main>
    </div>
  );
}

export default MaterialPageFiltered;
