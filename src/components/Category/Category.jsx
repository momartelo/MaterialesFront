import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Category.module.css";
import CategoryItem from "../CategoryItem/CategoryItem";
import { AuthContext } from "../../providers/AuthProvider";
import CategoryNewModal from "../CategoryNewModal/CategoryNewModal";
import useAppContext from "../../hooks/useAppContext";

const Category = ({ categories }) => {
  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const [search, setSearch] = useState("");
  const [filterCategories, setFilterCategories] = useState(categories);
  const [showCategoryNewModal, setShowCategoryNewModal] = useState(false);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    let filtered = categories.filter((cat) => {
      return cat.category.toLowerCase().includes(search.toLowerCase());
    });

    filtered = filtered.slice().sort((a, b) => {
      return (a.category || "").localeCompare(b.category || "");
    });

    setFilterCategories(filtered);
  }, [search, categories]);

  const handleCategoryNewClick = (e) => {
    e.stopPropagation();
    setShowCategoryNewModal(true);
  };

  const handleCloseModal = () => {
    setShowCategoryNewModal(false);
  };

  return (
    <div
      className={`${styles.containerCategory} ${containerClass} ${modeClass}`}
    >
      {auth ? (
        <div
          className={`${styles.wrapperCategory} ${containerClass} ${modeClass}`}
        >
          <Link
            className={`${styles.btnSuccess} ${containerClass} ${modeClass}`}
            onClick={handleCategoryNewClick}
          >
            Nueva Categoria
          </Link>
          <CategoryNewModal
            show={showCategoryNewModal}
            onHide={handleCloseModal}
          />
          <div
            className={`${styles.searchContainer} ${containerClass} ${modeClass}`}
          >
            <input
              type="search"
              className={styles.formControl}
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles.containerIcon}>
              <img src="/img/lupaAzulRellena.png" alt="" />
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
            <img src="/img/lupaAzulRellena.png" alt="" />
          </div>
        </div>
      )}
      <div className={`${styles.containerItem} ${containerClass} ${modeClass}`}>
        {filterCategories.length > 0 ? (
          filterCategories.map((category) => (
            <CategoryItem key={category._id} category={category} />
          ))
        ) : (
          <div
            className={`${styles.containerNoShow} ${containerClass} ${modeClass}`}
          >
            <img src="/img/archivo.png" alt="" />
            <p>¡No hay </p>
            <p>&nbsp;Categorias</p>
            <p>&nbsp;creadas!!!</p>
            <img src="/img/archivo.png" alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
