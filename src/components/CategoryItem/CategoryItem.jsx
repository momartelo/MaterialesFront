import styles from "./CategoryItem.module.css";
import { Link } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useContext, useId, useState } from "react";
import DeleteCategoryModal from "../DeleteCategoryModal/DeleteCategoryModal";
import { AuthContext } from "../../providers/AuthProvider";
import UpdateCategoryModal from "../UpdateCategoryModal/UpdateCategoryModal";
import { useTheme } from "../../providers/ThemeProvider";
import { useResponsive } from "../../providers/ResponsiveContext";

const CategoryItem = ({ category }) => {
  const { isNightMode } = useTheme();
  const {
    isDesktopHD,
    isDesktopFullHD,
    isTabletHD,
    isTablet,
    isMobile,
    isMobileLandscape,
  } = useResponsive();

  const getContainerClass = () => {
    if (isDesktopFullHD) return styles.fullHD;
    if (isDesktopHD) return styles.hd;
    if (isTabletHD) return styles.tabletHD;
    if (isTablet) return styles.tablet;
    if (isMobileLandscape) return styles.mobileLandscape;
    if (isMobile) return styles.mobile;
    return "";
  };

  const materialClass = getContainerClass();
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const modalId = useId();
  const { auth } = useContext(AuthContext);
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

  return (
    <div className={`${styles.item} ${materialClass} ${modeClass}`}>
      <section className={styles.sectionCategoryItem}>
        <h2>{category.category}</h2>
      </section>
      {auth ? (
        <div className={styles.containerIcons}>
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
          <UpdateCategoryModal
            show={showUpdateModal}
            onHide={handleCloseModal}
            modalId={modalId}
            categoryId={category._id}
            category={category.category}
          />
          <DeleteCategoryModal
            show={showDeleteModal}
            onHide={handleCloseModal}
            modalId={modalId}
            categoryId={category._id}
            category={category.category}
          />
        </div>
      ) : (
        <div className={styles.containerIcons}></div>
      )}
    </div>
  );
};

export default CategoryItem;
