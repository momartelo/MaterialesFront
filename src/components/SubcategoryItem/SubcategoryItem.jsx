import styles from "./SubcategoryItem.module.css";
import { Link } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useContext, useEffect, useId, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { fetchCategoriesWithoutAuth } from "../../functions/getCategory";
import UpdateSubcategoryModal from "../UpdateSubcategoryModal/UpdateSubcategoryModal";
import DeleteSubcategoryModal from "../DeleteSubcategoryModal/DeleteSubcategoryModal";

const SubcategoryItem = ({ subcategory, categories }) => {
  const modalId = useId();
  const { auth } = useContext(AuthContext);
  // const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
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

  useEffect(() => {
    // const fetchCategories = async () => {
    // try {
    // const categoriesData = await fetchCategoriesWithoutAuth();
    // setCategories(categoriesData);
    const category = categories.find(
      (cat) => cat._id === subcategory.category._id
    );
    if (category) {
      setCategoryName(category.category);
      console.log(category);
    }
    // } catch (error) {
    //   console.error("Error fetching categories:", error);
    // }
    //};
    // fetchCategories();
  }, [subcategory.category]);

  return (
    <div className={styles.item} /*onClick={onClick}*/>
      <section className={styles.sectionSubcategoryItem}>
        <h2>{subcategory.subcategory}</h2>
        <p>{categoryName || "Cargando categoria..."}</p>
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
          {/* <Link
            style={{ fontSize: "30px", color: "green" }}
            onClick={handleUpdateClick}
          >
            <HiOutlinePencilAlt />
          </Link> */}
          {/* <Link
            style={{ fontSize: "30px", color: "red" }}
            onClick={handleDeleteClick}
          >
            <HiOutlineTrash />
          </Link> */}
          {/* <UpdateCategoryModal show={showUpdateModal} onHide={handleCloseModal} getCategory={async () => { await getCategory();}} modalId={modalId} categoryId={category._id} category={category.category} />
                <DeleteCategoryModal show={showDeleteModal} onHide={handleCloseModal} getCategory={async () => { await getCategory();}} modalId={modalId} categoryId={category._id} category={category.category} /> */}
        </div>
      ) : (
        <div className={styles.containerIcons}></div>
      )}
    </div>
  );
};

export default SubcategoryItem;
