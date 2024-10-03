import styles from "./MaterialItem.module.css";
import { Link } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useCallback, useContext, useEffect, useId, useState } from "react";
import DeleteMaterialModal from "../DeleteMaterialModal/DeleteMaterialModal";
import { fetchCategories } from "../../functions/getCategory";
import { AuthContext } from "../../providers/AuthProvider";
import { fetchUnits } from "../../functions/getUnit";
import { useTheme } from "../../providers/ThemeProvider";
import { useResponsive } from "../../providers/ResponsiveContext";

const MaterialItem = ({ material, getMaterial, onClick }) => {
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
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingUnits, setLoadingUnits] = useState(true);
  const { auth } = useContext(AuthContext);
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

  const getCategories = useCallback(() => {
    setLoadingCategories(true);
    fetchCategories(auth.token)
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
    setLoadingCategories(false);
    // }
  }, [auth.token]);

  useEffect(() => {
    getCategories();
  }, [auth, getCategories]);

  const getUnits = useCallback(async () => {
    setLoadingUnits(true);
    fetchUnits(auth.token)
      .then((data) => setUnits(data))
      .catch((err) => console.log(err));
    setLoadingUnits(false);
    // }
  }, [auth.token]);

  useEffect(() => {
    getUnits();
  }, [auth, getUnits]);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.category : "Categoría no encontrada";
  };
  const getUnitName = (unitId) => {
    const unit = units.find((unit) => unit._id === unitId);
    return unit ? unit.unit : "Unidad no encontrada";
  };

  return (
    <div
      className={`${styles.item} ${materialClass} ${modeClass}`}
      onClick={onClick}
    >
      <section className={styles.sectionMaterialItem}>
        <img src={material.image} alt="" />
        <h2>{material.name}</h2>
        {loadingCategories ? (
          <p>Cargando categorías...</p>
        ) : (
          <div className={styles.catPrice}>
            <div className={styles.priceMaterialItem}>
              <span>{material.moneda}: </span>
              <span>{material.precio}</span>
              <span>$</span>
              <span>{material.precioEnPesos.toFixed(2)}</span>
            </div>
            <p>{getUnitName(material.unit)}</p>
          </div>
        )}
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
        />
      </div>
    </div>
  );
};

export default MaterialItem;
