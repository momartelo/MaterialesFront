import { useContext, useEffect, useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Category.module.css";
import { FaSearch } from "react-icons/fa";
import CategoryItem from "../CategoryItem/CategoryItem";
import { AuthContext } from "../../providers/AuthProvider";
import CategoryNewModal from "../CategoryNewModal/CategoryNewModal";
import { fetchCategories } from "../../functions/getCategory";

const Category = ({ categories, getCategory }) => {
  const modalId = useId();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filterCategories, setFilterCategories] = useState(categories);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [showCategoryNewModal, setShowCategoryNewModal] = useState(false);

  const loadCategories = () => {
    fetchCategories(auth.token) // Asegúrate de pasar el token correcto
      .then((data) => {
        setFilterCategories(data); // Actualiza el estado con las nuevas categorías
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    let filtered = categories.filter((cat) => {
      return cat.category.toLowerCase().includes(search.toLowerCase());
    });

    filtered = filtered.slice().sort((a, b) => {
      return (a.category || "").localeCompare(b.category || "");
    });

    setFilterCategories(filtered);
  }, [search, sort, categories]);

  const handleCategoryNewClick = (e) => {
    e.stopPropagation();
    setShowCategoryNewModal(true);
  };

  const handleCloseModal = () => {
    setShowCategoryNewModal(false);
  };

  return (
    <div className={styles.containerCategory}>
      {auth ? (
        <div className={styles.wrapperCategory}>
          <Link className={styles.btnSuccess} onClick={handleCategoryNewClick}>
            Nueva Categoria
          </Link>
          <CategoryNewModal
            show={showCategoryNewModal}
            onHide={handleCloseModal}
            onCategoryCreated={loadCategories}
            // categoryId={category._id}
          />
          <div className={styles.searchContainer}>
            <input
              type="search"
              className={styles.formControl}
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles.containerIcon}>
              <img src="../../../public/img/lupaAzulRellena.png" alt="" />
              {/* <FaSearch className={styles.searchIcon} /> */}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.wrapperCategory}>
          <input
            type="search"
            className={styles.formControl}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className={styles.containerIcon}>
            <img src="../../../public/img/lupaAzulRellena.png" alt="" />
            {/* <FaSearch className={styles.searchIcon} /> */}
          </div>
        </div>
      )}
      <div className={styles.containerItem}>
        {filterCategories.length > 0 ? (
          filterCategories.map((category) => (
            <CategoryItem
              getCategory={getCategory}
              key={category._id}
              category={category}
            />
          ))
        ) : (
          <div className={styles.containerNoShow}>
            <img src="../../../public/img/archivo.png" alt="" />
            <p>¡No hay </p>
            <p>&nbsp;Categorias</p>
            <p>&nbsp;creadas!!!</p>
            <img src="../../../public/img/archivo.png" alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
