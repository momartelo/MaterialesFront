import styles from "./MaterialItem2.module.css";
import { Link } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useContext, useId, useState } from "react";
import DeleteMaterialModal from "../DeleteMaterialModal/DeleteMaterialModal";
import { AuthContext } from "../../providers/AuthProvider";
import { useCategoriesWithoutAuth } from "../../hooks/useCategoriesWithoutAuth";
import { useUnitsWithoutAuth } from "../../hooks/useUnitsWithoutAuth";
import useAppContext from "../../hooks/useAppContext";

const MaterialItem2 = ({ material, getMaterial, onClick }) => {
  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const modalId = useId();
  const { auth } = useContext(AuthContext);
  //-----------------Modal---------------------------//
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { categories, loading: loadingCategories } = useCategoriesWithoutAuth();
  const { units, loading: loadingUnits } = useUnitsWithoutAuth();

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true); // Abrir el modal al hacer clic en el icono
  };

  const handleCloseModal = (e) => {
    if (e) {
      e.stopPropagation();
    }
    setShowDeleteModal(false); // Cerrar el modal de eliminar
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.category : "Categoría no encontrada";
  };
  const getUnitName = (unitId) => {
    const unit = units.find((unit) => unit._id === unitId);
    return unit ? unit.unit : "Unidad no encontrada";
  };

  const formatPesos = (amount) => {
    return amount.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  };

  const formatDollars = (amount) => {
    const parts = amount.toFixed(2).toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `U$S ${parts.join(",")}`;
  };

  const handleClick = (e) => {
    if (e.defaultPrevented) return;
    onClick(e);
  };

  return (
    <div
      className={`${styles.item} ${containerClass} ${modeClass}`}
      onClick={handleClick}
    >
      <section
        className={`${styles.sectionMaterialItem} ${containerClass} ${modeClass}`}
      >
        <div
          className={`${styles.imageAndTitleItem} ${containerClass} ${modeClass}`}
        >
          <img src={material.image} alt="" />
          <h2>{material.name}</h2>
        </div>
        {loadingCategories && loadingUnits ? (
          <p>Cargando categorías y unidades...</p>
        ) : (
          <div className={`${styles.catPrice} ${containerClass} ${modeClass}`}>
            <div
              className={`${styles.priceMaterialItem} ${containerClass} ${modeClass}`}
            >
              <span>{formatDollars(material.precioEnDolares)}</span>
              <span>-</span>
              <span>{formatPesos(material.precioEnPesos)}</span>
            </div>
            <p>{getUnitName(material.unit)}</p>
            <div className={`${styles.infoCat} ${containerClass} ${modeClass}`}>
              <p>Categoria:&nbsp;</p>
              <p>{getCategoryName(material.category)}</p>
            </div>
          </div>
        )}
      </section>
      {auth ? (
        <div
          className={`${styles.containerIcons} ${containerClass} ${modeClass}`}
        >
          <Link
            className={styles.containerIconEdit}
            to={`/material/update/${material._id}`}
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
          />
        </div>
      ) : (
        <div className={styles.containerIcons}></div>
      )}
    </div>
  );
};

export default MaterialItem2;
