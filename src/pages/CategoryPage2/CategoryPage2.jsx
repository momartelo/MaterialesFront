import { useCallback, useContext, useEffect, useState } from "react"
import Category from "../../components/Category/Category.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { fetchCategories2 } from "../../functions/getCategory.js";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./CategoryPage2.module.css"

function CategoryPage2 () {
    const [categories, setCategories] = useState([]);
    const { auth } = useContext(AuthContext);
    const getCategory = useCallback(() => {
        fetchCategories2()
        .then((data) => setCategories(data))
        .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        getCategory();
    }, [getCategory]);

    return(
        <div className={styles.container}>
            <Navbar />
            <h2>Categorias</h2>
            <main className={styles.main}>
                <Category getCategory={getCategory} categories={categories} />
            </main>
        </div>
    );
}

export default CategoryPage2;