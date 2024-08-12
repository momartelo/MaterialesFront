import { useCallback, useContext, useEffect, useState } from "react"
import Category from "../../components/Category/Category.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { fetchCategoriesWithoutAuth } from "../../functions/getCategory.js";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./CategoryPage2.module.css"

function CategoryPage2 () {
    const [categories, setCategories] = useState([]);
    const { auth } = useContext(AuthContext);
    const getCategory = useCallback(() => {
        fetchCategoriesWithoutAuth()
        .then((data) => setCategories(data))
        .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        getCategory();
    }, [getCategory]);

    return(
        <div className={styles.containerCategoryPage}>
            <Navbar />
            <div className={styles.containerTitle}>
            <img src="../../../public/img/categoria.png" alt="" />
            <h2>Categorias</h2>
            </div>
            <main className={styles.main}>
                <Category getCategory={getCategory} categories={categories} />
            </main>
        </div>
    );
}

export default CategoryPage2;