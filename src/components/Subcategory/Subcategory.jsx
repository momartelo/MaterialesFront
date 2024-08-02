import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Subcategory.module.css";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import SubcategoryItem from "../SubcategoryItem/SubcategoryItem";

const Subcategory = ({ subcategories, getSubcategory }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filterSubcategories, setFilterSubcategories] = useState(subcategories);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    let filtered = subcategories.filter((subcat) => {
      return subcat.subcategory.toLowerCase().includes(search.toLowerCase());
    });

    filtered = filtered.slice().sort((a, b) => {
      return (a.subcategory || "").localeCompare(b.subcategory || "");
    });

    setFilterSubcategories(filtered);
  }, [search, sort, subcategories]);

  return (
    <div className={styles.containerSubcategory}>
      {auth ? (
        <div className={styles.wrapperSubcategory}>
          <Link to="/category/new" className={styles.btnSuccess}>
            Nueva Subcategoria
          </Link>
          <div className={styles.searchContainer}>
            <input
              type="search"
              className={styles.formControl}
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className={styles.containerIcon}>
              <FaSearch className={styles.searchIcon} />
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
            <FaSearch className={styles.searchIcon} />
          </div>
        </div>
      )}
      <div className={styles.containerItem}>
        {filterSubcategories.map((subcategory) => (
          <SubcategoryItem
            getSubcategory={getSubcategory}
            key={subcategory._id}
            subcategory={subcategory}
          />
        ))}
      </div>
    </div>
  );
};

export default Subcategory;
