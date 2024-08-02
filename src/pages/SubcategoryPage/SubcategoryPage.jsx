import { useCallback, useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./SubcategoryPage.module.css";
import { fetchSubcategoriesWithoutAuth } from "../../functions/getSubcategory.js";
import Subcategory from "../../components/Subcategory/Subcategory.jsx";

function SubcategoryPage() {
  const [subcategories, setSubcategories] = useState([]);
  const { auth } = useContext(AuthContext);
  const getSubcategory = useCallback(() => {
    fetchSubcategoriesWithoutAuth()
      .then((data) => setSubcategories(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getSubcategory();
  }, [getSubcategory]);

  return (
    <div className={styles.containerSubcategoryPage}>
      <Navbar />
      <h2>Subcategorias</h2>
      <main className={styles.main}>
        <Subcategory
          getSubcategory={getSubcategory}
          subcategories={subcategories}
        />
      </main>
    </div>
  );
}

export default SubcategoryPage;
