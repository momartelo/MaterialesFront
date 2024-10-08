import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Subcategory.module.css";
import { AuthContext } from "../../providers/AuthProvider";
import SubcategoryItem from "../SubcategoryItem/SubcategoryItem";
import SubcategoryNewModal from "../SubcategoryNewModal/SubcategoryNewModal";
import { useSubcategories } from "../../hooks/useSubcategories";
import useAppContext from "../../hooks/useAppContext";

const Subcategory = ({ subcategories, categories }) => {
  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filterSubcategories, setFilterSubcategories] = useState(subcategories);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [showSubcategoryNewModal, setShowSubcategoryNewModal] = useState(false);

  useEffect(() => {
    let filtered = subcategories.filter((subcat) => {
      return subcat.subcategory.toLowerCase().includes(search.toLowerCase());
    });

    filtered = filtered.slice().sort((a, b) => {
      const subcategoryA = String(a.subcategory || ""); // Asegura que sea una cadena
      const subcategoryB = String(b.subcategory || ""); // Asegura que sea una cadena
      const subcategoryComparison = subcategoryA.localeCompare(subcategoryB); // Comparación ascendente

      if (subcategoryComparison !== 0) {
        return subcategoryComparison; // Si las subcategorías son diferentes, retorna esa comparación
      }

      const categoryA = String(a.category.category || ""); // Asegura que sea una cadena
      const categoryB = String(b.category.category || ""); // Asegura que sea una cadena
      return categoryA.localeCompare(categoryB); // Comparación ascendente por categoría
    });

    setFilterSubcategories(filtered);
  }, [search, sort, subcategories]);

  const handleSubcategoryNewClick = (e) => {
    e.stopPropagation();
    setShowSubcategoryNewModal(true);
  };

  const handleCloseModal = () => {
    setShowSubcategoryNewModal(false);
  };

  return (
    <div
      className={`${styles.containerSubcategory} ${containerClass} ${modeClass}`}
    >
      {auth ? (
        <div
          className={`${styles.wrapperSubcategory} ${containerClass} ${modeClass}`}
        >
          <Link
            className={`${styles.btnSuccess} ${containerClass} ${modeClass}`}
            onClick={handleSubcategoryNewClick}
          >
            Nueva Subcategoria
          </Link>
          <SubcategoryNewModal
            show={showSubcategoryNewModal}
            onHide={handleCloseModal}
            onSubcategoryCreated={useSubcategories}
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
        <div
          className={`${styles.wrapperSubcategory} ${containerClass} ${modeClass}`}
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
      )}
      <div className={`${styles.containerItem} ${containerClass} ${modeClass}`}>
        {filterSubcategories.length > 0 ? (
          filterSubcategories.map((subcategory) => (
            <SubcategoryItem
              key={subcategory._id}
              subcategory={subcategory}
              categories={categories}
            />
          ))
        ) : (
          <div
            className={`${styles.containerNoShow} ${containerClass} ${modeClass}`}
          >
            <img src="/img/archivo.png" alt="" />
            <p>¡No hay </p>
            <p>&nbsp;Subcategorias</p>
            <p>&nbsp;creadas!!!</p>
            <img src="/img/archivo.png" alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Subcategory;
