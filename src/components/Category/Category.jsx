import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import styles from "./Category.module.css"
import { FaSearch } from "react-icons/fa";
import CategoryItem from "../CategoryItem/CategoryItem";
import { AuthContext } from "../../providers/AuthProvider";


const Category = ({ categories, getCategory }) => {
    const [search, setSearch] = useState("");
    const [filterCategories, setFilterCategories] = useState(categories);
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);

    useEffect(() =>{
        const filtered = categories.filter((cat) => {
            return cat.category.toLowerCase().includes(search.toLowerCase());
        });
        setFilterCategories(filtered);
    }, [search, categories]);

    return (
        <div className={styles.containerCategory}>
            {auth ?
            <div className={styles.wrapperCategory}>
                <Link to="/category/new" className={styles.btnSuccess}>
                    Nueva Categoria
                </Link>
                <div className={styles.searchContainer}>
                    <input type="search" className={styles.formControl} placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <FaSearch className={styles.searchIcon} />
                </div>
            </div>
            :   <div>
                    <input type="search" className={styles.formControl} placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <FaSearch className={styles.searchIcon} />
                </div>}
            <div className={styles.containerItem}>
                {filterCategories.map((category) => (<CategoryItem getCategory={getCategory} key={category._id} category={category} onClick={() => navigate(`/category/${category._id}`)} />
                ))}
            </div>
        </div>
    );
};

export default Category;