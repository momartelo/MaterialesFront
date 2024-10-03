import styles from "./MaterialDescription.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useId, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoriesWithoutAuth } from "../../hooks/useCategoriesWithoutAuth";
import { useSubcategoriesWithoutAuth } from "../../hooks/useSubcategoriesWithoutAuth";
import { useUnitsWithoutAuth } from "../../hooks/useUnitsWithoutAuth";
import { useMaterialsWithoutAuth } from "../../hooks/useMaterialsWithoutAuth";
import MaterialDetails from "./MaterialDetails";
import HistorialPricesTable from "./HistorialPricesTable";
import MaterialCharts from "./MaterialCharts";
import Footer from "../../components/Footer/Footer";
import useAppContext from "../../hooks/useAppContext";

const MaterialDescription = () => {
  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const modalId = useId();
  const { materialId } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { materials, errorMat } = useMaterialsWithoutAuth();
  const { categories, errorCat } = useCategoriesWithoutAuth();
  const { subcategories, errorSub } = useSubcategoriesWithoutAuth();
  const { units, errorUnits } = useUnitsWithoutAuth();

  if (errorMat || errorCat || errorSub || errorUnits) {
    return <div>Error al cargar datos</div>;
  }

  if (
    materials.length === 0 ||
    categories.length === 0 ||
    subcategories.length === 0 ||
    units.length === 0
  ) {
    return <p>Cargando....</p>;
  }

  const material = materials.find((mat) => mat._id === materialId);
  if (!material) {
    return <p>No se encontró el material solicitado.</p>;
  }

  const handleBack = () => navigate(-1);
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };
  const handleCloseModal = (e) => {
    if (e) e.stopPropagation();
    setShowDeleteModal(false);
  };

  return (
    <>
      <Navbar />
      <div
        className={`${styles.containerMaterialDescription} ${containerClass} ${modeClass}`}
      >
        <div
          className={`${styles.containerMaterialFull} ${containerClass} ${modeClass}`}
        >
          <MaterialDetails
            material={material}
            category={categories.find((cat) => cat._id === material.category)}
            subcategory={subcategories.find(
              (sub) => sub._id === material.subcategory
            )}
            unit={units.find((u) => u._id === material.unit)}
            auth={auth}
            handleBack={handleBack}
            handleDeleteClick={handleDeleteClick}
            modalId={modalId}
            showDeleteModal={showDeleteModal}
            handleCloseModal={handleCloseModal}
          />
          <div
            className={`${styles.containerHistorialPrices} ${containerClass} ${modeClass}`}
          >
            <HistorialPricesTable historialPrecio={material.historialPrecio} />
          </div>
        </div>
        <div
          className={`${styles.containerGraphics} ${containerClass} ${modeClass}`}
        >
          <MaterialCharts historialPrecio={material.historialPrecio} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MaterialDescription;
