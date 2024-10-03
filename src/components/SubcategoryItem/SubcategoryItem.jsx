import styles from "./SubcategoryItem.module.css";
import { Link } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useContext, useEffect, useId, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import UpdateSubcategoryModal from "../UpdateSubcategoryModal/UpdateSubcategoryModal";
import DeleteSubcategoryModal from "../DeleteSubcategoryModal/DeleteSubcategoryModal";
import useAppContext from "../../hooks/useAppContext";

const SubcategoryItem = ({ subcategory, categories }) => {
  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const modalId = useId();
  const { auth } = useContext(AuthContext);
  const [categoryName, setCategoryName] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleUpdateClick = (e) => {
    e.stopPropagation();
    setShowUpdateModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setShowUpdateModal(false);
  };

  useEffect(() => {
    const category = categories.find(
      (cat) => cat._id === subcategory.category._id
    );
    if (category) {
      setCategoryName(category.category);
      console.log(category);
    }
  }, [subcategory.category]);

  return (
    <div className={`${styles.item} ${containerClass} ${modeClass}`}>
      <section
        className={`${styles.sectionSubcategoryItem} ${containerClass} ${modeClass}`}
      >
        <h2>{subcategory.subcategory}</h2>
        <p>{categoryName || "Cargando categoria..."}</p>
      </section>
      {auth ? (
        <div
          className={`${styles.containerIcons} ${containerClass} ${modeClass}`}
        >
          <Link
            className={styles.containerIconEdit}
            onClick={handleUpdateClick}
          >
            <div className={styles.iconEdit}>
              <HiOutlinePencilAlt />
            </div>
          </Link>
          <Link
            className={styles.containerIconErase}
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(e);
            }}
          >
            <div className={styles.iconErase}>
              <HiOutlineTrash />
            </div>
          </Link>
          <UpdateSubcategoryModal
            show={showUpdateModal}
            onHide={handleCloseModal}
            subcategoryId={subcategory._id}
            subcategory={subcategory.subcategory}
          />
          <DeleteSubcategoryModal
            show={showDeleteModal}
            onHide={handleCloseModal}
            subcategoryId={subcategory._id}
            subcategory={subcategory.subcategory}
          />
        </div>
      ) : (
        <div className={styles.containerIcons}></div>
      )}
    </div>
  );
};

export default SubcategoryItem;
