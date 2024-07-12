import { useCallback, useContext, useEffect, useState } from "react"
import Category from "../../components/Category/Category.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { fetchCategories } from "../../functions/getCategory.js";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./CategoryPage.module.css"

function CategoryPage () {
    const [categories, setCategories] = useState([]);
    const { auth } = useContext(AuthContext);
    const getCategory = useCallback(() => {
        fetchCategories(auth.token)
        .then((data) => setCategories(data))
        .catch((err) => console.log(err));
    }, [auth.token]);

    useEffect(() => {
        getCategory();
    }, [auth, getCategory]);

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

export default CategoryPage;