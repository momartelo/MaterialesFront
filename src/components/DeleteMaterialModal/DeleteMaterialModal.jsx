import { useId, useRef } from "react";
import { API_URL } from "../../utils/consts";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import styles from "./DeleteMaterialModal.module.css"

const DeleteMaterialModal = ({
  show,
  materialId,
  getMaterial,
  onHide,
  nombre,
}) => {
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
      await getMaterial();

      navigate(-1);
      console.log("saliendo del handledelete"); // Asegúrate de esperar esta llamada para obtener datos frescos
    } catch (error) {
      console.error("Error al eliminar el material:", error);
    }
  };

  const handleClose = () => {
    onHide();
  };

  return (
    <Modal className={styles.containerModalDeleteMaterial} show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Material</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          ¿Está seguro de que desea eliminar el material "{nombre}"? Esta acción
          no se puede deshacer.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Eliminar
        </Button>
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
