import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import { formatDollars, formatPesos } from "../../functions/formatCurrency";
import styles from "./MaterialDescription.module.css";
import DeleteMaterialModal from "../../components/DeleteMaterialModal/DeleteMaterialModal";
import { useTheme } from "../../providers/ThemeProvider";
import { useResponsive } from "../../providers/ResponsiveContext";

const MaterialDetails = ({
  material,
  category,
  subcategory,
  unit,
  auth,
  handleBack,
  handleDeleteClick,
  modalId,
  showDeleteModal,
  handleCloseModal,
}) => {
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

  const containerClass = getContainerClass();
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  return (
    <div className={`${styles.materialWrapper} ${containerClass} ${modeClass}`}>
      <div
        className={`${styles.materialDetails} ${containerClass} ${modeClass}`}
      >
        <h1>{material.name}</h1>
        <div
          className={`${styles.containerCategory} ${containerClass} ${modeClass}`}
        >
          <p>Categoria:&nbsp;</p>
          <p>{category ? category.category : "No disponible"}</p>
          <p>&nbsp;- Subcategoria:&nbsp;</p>
          <p>{subcategory ? subcategory.subcategory : "No disponible"}</p>
        </div>
        <div className={styles.containerUnit}>
          <p>Unidad:&nbsp;</p>
          <p>{unit ? unit.unit : "No disponible"}</p>
        </div>
        <div className={styles.materialImageAndPrice}>
          <div className={styles.materialImage}>
            <img src={material.image} alt="" />
          </div>
          <div
            className={`${styles.priceMaterialItem} ${containerClass} ${modeClass}`}
          >
            <p>Precio en Dolares</p>
            <span>{formatDollars(material.precioEnDolares)}</span>
            <hr className={`${styles.hr} ${containerClass} ${modeClass}`} />
            <p>Precio en Pesos</p>
            <span>{formatPesos(material.precioEnPesos)}</span>
            <hr className={`${styles.hr} ${containerClass} ${modeClass}`} />
            <div className={styles.containerSource}>
              <p>Fuente:&nbsp;</p>
              <p>{material.fuente}</p>
            </div>
          </div>
        </div>
        {auth ? (
          <div
            className={`${styles.containerButtons} ${containerClass} ${modeClass}`}
          >
            <Link
              className={`${styles.buttonEdit} ${containerClass} ${modeClass}`}
              to={`/material/update/${material._id}`}
            >
              Editar
            </Link>
            <button
              className={`${styles.buttonBack} ${containerClass} ${modeClass}`}
              onClick={handleBack}
            >
              Volver
            </button>
            <Link
              className={`${styles.buttonEraseDescription} ${containerClass} ${modeClass}`}
              onClick={handleDeleteClick}
            >
              <HiOutlineTrash />
            </Link>
            <DeleteMaterialModal
              show={showDeleteModal}
              onHide={handleCloseModal}
              modalId={modalId}
              materialId={material._id}
              nombre={material.name}
            />
          </div>
        ) : (
          <div className={styles.containerButtons}>
            <button className={styles.buttonBack} onClick={handleBack}>
              Volver
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialDetails;
