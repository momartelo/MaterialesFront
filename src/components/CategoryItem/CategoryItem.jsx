import styles from "./CategoryItem.module.css";
import { Link } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useCallback, useContext, useEffect, useId, useState } from "react";
import { API_URL } from "../../utils/consts";
import DeleteCategoryModal from "../DeleteCategoryModal/DeleteCategoryModal";
import { AuthContext } from "../../providers/AuthProvider";
import UpdateCategoryModal from "../UpdateCategoryModal/UpdateCategoryModal";

const CategoryItem = ({ category, getCategory /* onClick*/ }) => {
  const modalId = useId();
  const { auth } = useContext(AuthContext);
  // const [ categories, setCategories ] = useState([]);
  // const [ units, setUnits ] = useState([]);
  // const [loadingCategories, setLoadingCategories] = useState(true);
  // const [ loadingUnits, setLoadingUnits ] = useState(true);

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
    <div className={styles.item} /*onClick={onClick}*/>
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
            getCategory={async () => {
              await getCategory();
            }}
            modalId={modalId}
            categoryId={category._id}
            category={category.category}
          />
          <DeleteCategoryModal
            show={showDeleteModal}
            onHide={handleCloseModal}
            getCategory={async () => {
              await getCategory();
            }}
            modalId={modalId}
            categoryId={category._id}
            category={category.category}
          />

          {/* <Link style={{ fontSize: "30px", color: "green" }} onClick={handleUpdateClick}>
                    <HiOutlinePencilAlt />
                </Link>
                <Link style={{ fontSize: "30px", color: "red" }} onClick={handleDeleteClick}>
                    <HiOutlineTrash />
                </Link>
                <UpdateCategoryModal show={showUpdateModal} onHide={handleCloseModal} getCategory={async () => { await getCategory();}} modalId={modalId} categoryId={category._id} category={category.category} />
                <DeleteCategoryModal show={showDeleteModal} onHide={handleCloseModal} getCategory={async () => { await getCategory();}} modalId={modalId} categoryId={category._id} category={category.category} /> */}
        </div>
      ) : (
        <div className={styles.containerIcons}></div>
      )}
    </div>
  );
};

export default CategoryItem;


