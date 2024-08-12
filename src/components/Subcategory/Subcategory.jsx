import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Subcategory.module.css";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import SubcategoryItem from "../SubcategoryItem/SubcategoryItem";
import SubcategoryNewModal from "../SubcategoryNewModal/SubcategoryNewModal";
import { fetchSubcategories } from "../../functions/getSubcategory";

const Subcategory = ({ subcategories, getSubcategory }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [filterSubcategories, setFilterSubcategories] = useState(subcategories);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [showSubcategoryNewModal, setShowSubcategoryNewModal] = useState(false);

  const loadSubcategories = () => {
    fetchSubcategories(auth.token)
    .then((data) => {
      setFilterSubcategories(data);
    })
    .catch((err) => console.error(err));
  };


  useEffect(() => {
    let filtered = subcategories.filter((subcat) => {
      return subcat.subcategory.toLowerCase().includes(search.toLowerCase());
    });

    filtered = filtered.slice().sort((a, b) => {
      return (a.subcategory || "").localeCompare(b.subcategory || "");
    });

    setFilterSubcategories(filtered);
  }, [search, sort, subcategories]);


  const handleSubcategoryNewClick = (e) => {
    e.stopPropagation();
    setShowSubcategoryNewModal(true);
  }

  const handleCloseModal = () => {
    setShowSubcategoryNewModal(false);
  };

  return (
    <div className={styles.containerSubcategory}>
      {auth ? (
        <div className={styles.wrapperSubcategory}>
          <Link className={styles.btnSuccess} onClick={handleSubcategoryNewClick}>
            Nueva Subcategoria
          </Link>
          <SubcategoryNewModal show={showSubcategoryNewModal} onHide={handleCloseModal} onSubcategoryCreated={loadSubcategories} />
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
        <div className={styles.wrapperSubcategory}>
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
