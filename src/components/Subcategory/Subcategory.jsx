import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Subcategory.module.css";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import SubcategoryItem from "../SubcategoryItem/SubcategoryItem";
import SubcategoryNewModal from "../SubcategoryNewModal/SubcategoryNewModal";
import { fetchSubcategories } from "../../functions/getSubcategory";
import { useSubcategoriesWithoutAuth } from "../../hooks/useSubcategoriesWithoutAuth";
import { useSubcategories } from "../../hooks/useSubcategories";

const Subcategory = ({ subcategories, categories }) => {
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
    <div className={styles.containerSubcategory}>
      {auth ? (
        <div className={styles.wrapperSubcategory}>
          <Link
            className={styles.btnSuccess}
            onClick={handleSubcategoryNewClick}
          >
            Nueva Subcategoria
          </Link>
          <SubcategoryNewModal
            show={showSubcategoryNewModal}
            onHide={handleCloseModal}
            onSubcategoryCreated={useSubcategories}
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
              <img src="/img/lupaAzulRellena.png" alt="" />
              {/* <FaSearch className={styles.searchIcon} /> */}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.wrapperSubcategory}>
          <input
            type="search"
            className={styles.formControl}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className={styles.containerIcon}>
            <img src="/img/lupaAzulRellena.png" alt="" />
            {/* <FaSearch className={styles.searchIcon} /> */}
          </div>
        </div>
      )}
      <div className={styles.containerItem}>
        {filterSubcategories.length > 0 ? (
          filterSubcategories.map((subcategory) => (
            <SubcategoryItem
              key={subcategory._id}
              subcategory={subcategory}
              categories={categories}
            />
          ))
        ) : (
          <div className={styles.containerNoShow}>
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
