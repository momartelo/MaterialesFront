import styles from "./MaterialItem2.module.css";
import { Link } from "react-router-dom";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { useCallback, useContext, useEffect, useId, useState } from "react";
import DeleteMaterialModal from "../DeleteMaterialModal/DeleteMaterialModal";
import { fetchCategories2 } from "../../functions/getCategory";
import { AuthContext } from "../../providers/AuthProvider";
import { fetchUnits2 } from "../../functions/getUnit";

const MaterialItem2 = ({ material, getMaterial, onClick }) => {
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
    fetchCategories2()
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
    // try {
    //   const res = await fetch(`${API_URL}/category`);
    //   const data = await res.json();
    //   setCategories(data);
    // } catch (err) {
    //   console.error("Error al obtener las categorías:", err);
    // } finally {
    setLoadingCategories(false);
    // }
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const getUnits = useCallback(async () => {
    setLoadingUnits(true);
    fetchUnits2()
      .then((data) => setUnits(data))
      .catch((err) => console.log(err));
    // try {
    //   const res = await fetch(`${API_URL}/unit`);
    //   const data = await res.json();
    //   setUnits(data);
    // } catch (err) {
    //   console.error("Error al obtener las unidades:", err);
    // } finally {
    setLoadingUnits(false);
    // }
  }, []);

  useEffect(() => {
    getUnits();
  }, [getUnits]);

  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.category : "Categoría no encontrada";
  };
  const getUnitName = (unitId) => {
    const unit = units.find((unit) => unit._id === unitId);
    return unit ? unit.unit : "Unidad no encontrada";
  };

  return (
    <div className={styles.item} onClick={onClick}>
      <section className={styles.sectionMaterialItem}>
        {/* <p>Material:</p> */}
        <img src={material.image} alt="" />
        <h2>{material.name}</h2>
        {loadingCategories ? (
          <p>Cargando categorías...</p>
        ) : (
          <div className={styles.catPrice}>
            {/* <div className={styles.infoCat}>
              <p>Categoria</p>
              <p>{getCategoryName(material.category)}</p>
            </div> */}
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
      {auth ? 
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
      : <div className={styles.containerIcons}></div>}
    </div>
  );
};

export default MaterialItem2;
