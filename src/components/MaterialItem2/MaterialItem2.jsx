import styles from "./MaterialItem2.module.css";
import { Link } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useContext, useId, useState } from "react";
import DeleteMaterialModal from "../DeleteMaterialModal/DeleteMaterialModal";
import { AuthContext } from "../../providers/AuthProvider";
import { useCategoriesWithoutAuth } from "../../hooks/useCategoriesWithoutAuth";
import { useUnitsWithoutAuth } from "../../hooks/useUnitsWithoutAuth";
import { useResponsive } from "../../providers/ResponsiveContext";
import { useTheme } from "../../providers/ThemeProvider";

const MaterialItem2 = ({ material, getMaterial, onClick }) => {
  const { isNightMode } = useTheme();
  const {
    isDesktopHD,
    isDesktopFullHD,
    isTabletHD,
    isTablet,
    isMobile,
    isMobileLandscape,
  } = useResponsive();

  console.log({
    isDesktopHD,
    isDesktopFullHD,
    isTabletHD,
    isTablet,
    isMobile,
    isMobileLandscape,
  });

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
      className={`${styles.item} ${materialClass} ${modeClass}`}
      onClick={handleClick}
    >
      <section
        className={`${styles.sectionMaterialItem} ${materialClass} ${modeClass}`}
      >
        <div
          className={`${styles.imageAndTitleItem} ${materialClass} ${modeClass}`}
        >
          <img src={material.image} alt="" />
          <h2>{material.name}</h2>
        </div>
        {loadingCategories && loadingUnits ? (
          <p>Cargando categorías y unidades...</p>
        ) : (
          <div className={`${styles.catPrice} ${materialClass} ${modeClass}`}>
            <div
              className={`${styles.priceMaterialItem} ${materialClass} ${modeClass}`}
            >
              <span>{formatDollars(material.precioEnDolares)}</span>
              <span>-</span>
              <span>{formatPesos(material.precioEnPesos)}</span>
            </div>
            <p>{getUnitName(material.unit)}</p>
            <div className={`${styles.infoCat} ${materialClass} ${modeClass}`}>
              <p>Categoria:&nbsp;</p>
              <p>{getCategoryName(material.category)}</p>
            </div>
          </div>
        )}
      </section>
      {auth ? (
        <div
          className={`${styles.containerIcons} ${materialClass} ${modeClass}`}
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
