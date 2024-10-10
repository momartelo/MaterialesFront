import { useId, useRef } from "react";
import { API_URL } from "../../utils/config";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import styles from "./DeleteMaterialModal.module.css";
import { fetchMaterialsWithoutAuth } from "../../functions/getMaterial";

const DeleteMaterialModal = ({ show, materialId, onHide, nombre }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    console.log("estoy en el handleDelete");
    console.log("Eliminar material", materialId);

    try {
      const res = await fetch(`${API_URL}/material/${materialId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 200) {
        alert("Error al eliminar el material");
        return;
      }
      handleClose();

      if (location.pathname === "/material") {
        navigate(0); // Recargar la página si ya estás en /material
      } else {
        navigate("/material"); // Redirigir a /material si estás en otra página
      }

      console.log("saliendo del handledelete"); // Asegúrate de esperar esta llamada para obtener datos frescos
    } catch (error) {
      console.error("Error al eliminar el material:", error);
    }
  };

  const handleClose = (e) => {
    if (e) {
      e.stopPropagation();
    }
    onHide();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      className={styles.containerModalDeleteMaterial}
      show={show}
      onHide={handleClose}
      onClick={handleModalClick}
      centered
    >
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          <img src="/img/advertencia.png" alt="" />
          <p> Eliminar Material</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModalBody}>
        <p>
          ¿Está seguro de que desea eliminar el material{" "}
          <strong>"{nombre}"</strong>?{" "}
        </p>
        <p>¡Esta acción no se puede deshacer!!!</p>
      </Modal.Body>
      <Modal.Footer>
        <button className={styles.buttonDelete} onClick={handleDelete}>
          Eliminar
        </button>
        <button className={styles.buttonBack} onClick={handleClose}>
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteMaterialModal;

/* <div
      className="modal fade"
      id={"modal" + materialId}
      aria-labelledby={labelId}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={labelId}>
              Delete Material
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this material?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              ref={ref}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div> */
