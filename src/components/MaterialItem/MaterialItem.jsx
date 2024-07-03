import styles from "./MaterialItem.module.css";
import { Link } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useCallback, useEffect, useId, useState } from "react";
import DeleteMaterialModal from "../DeleteMaterialModal/DeleteMaterialModal";
import { API_URL } from "../../utils/consts";

const MaterialItem = ({ material, getMaterial, onMaterialDelete, onClick }) => {
  const modalId = useId();
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  //-----------------Modal---------------------------//
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true); // Abrir el modal al hacer clic en el icono
  };

  const handleUpdateClick = (e) => {
    e.stopPropagation();
    setShowUpdateModal(true); // Abrir el modal al hacer clic en el icono
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false); // Cerrar el modal de eliminar
    setShowUpdateModal(false); // Cerrar el modal de actualizar
  };

  const getCategories = useCallback(async () => {
    setLoadingCategories(true);
    try {
      const res = await fetch(`${API_URL}/category`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error al obtener las categorías:", err);
    } finally {
      setLoadingCategories(false);
    }
  }, []);

  // console.log("categorias desde MaterialItem");
  // console.log(categories);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.category : "Categoría no encontrada";
  };

  return (
    <div className={styles.item} onClick={onClick}>
      <section className={styles.sectionMaterialItem}>
        <p>Material:</p>
        <h2>{material.name}</h2>
        {loadingCategories ? (
          <p>Cargando categorías...</p>
        ) : (
          <p>Categoria:{getCategoryName(material.category)}</p>
        )}
        <div className={styles.priceMaterialItem}>
          <span>{material.moneda}: </span>
          <span>{material.precio}</span>
        </div>
      </section>
      <div className={styles.containerIcons}>
        <Link
          style={{ fontSize: "30px", color: "green" }}
          onClick={handleUpdateClick}
        >
          <HiOutlinePencilAlt />
        </Link>
        <Link
          style={{ fontSize: "30px", color: "red" }}
          onClick={handleDeleteClick}
        >
          <HiOutlineTrash />
        </Link>

        <DeleteMaterialModal
          show={showDeleteModal}
          onHide={handleCloseModal}
          getMaterial={async () => {
            await getMaterial();
            getCategories();
          }}
          modalId={modalId}
          materialId={material._id}
          nombre={material.name}
          onMaterialDelete={onMaterialDelete}
        />
      </div>
    </div>
  );
};

export default MaterialItem;
