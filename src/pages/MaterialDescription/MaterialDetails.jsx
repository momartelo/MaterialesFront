import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import { formatDollars, formatPesos } from "../../functions/formatCurrency";
import styles from "./MaterialDescription.module.css";
import DeleteMaterialModal from "../../components/DeleteMaterialModal/DeleteMaterialModal";

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
}) => (
  <div className={styles.materialWrapper}>
    <div className={styles.materialDetails}>
      <h1>{material.name}</h1>
      <div className={styles.containerCategory}>
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
        <div className={styles.priceMaterialItem}>
          <p>Precio en Dolares</p>
          <span>{formatDollars(material.precioEnDolares)}</span>
          <hr className={styles.hr} />
          <p>Precio en Pesos</p>
          <span>{formatPesos(material.precioEnPesos)}</span>
          <hr className={styles.hr} />
          <div className={styles.containerSource}>
            <p>Fuente:&nbsp;</p>
            <p>{material.fuente}</p>
          </div>
        </div>
      </div>
      {auth ? (
        <div className={styles.containerButtons}>
          <Link
            className={styles.buttonEdit}
            to={`/material/update/${material._id}`}
          >
            Editar
          </Link>
          <button className={styles.buttonBack} onClick={handleBack}>
            Volver
          </button>
          <Link
            className={styles.buttonEraseDescription}
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

export default MaterialDetails;
