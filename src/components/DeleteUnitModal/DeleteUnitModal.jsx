import styles from "./DeleteUnitModal.module.css";
import { API_URL } from "../../utils/consts";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";

const DeleteUnitModal = ({ show, unitId, getUnit, onHide, unit }) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const handleClose = () => {
    onHide();
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/unit/${unitId}`, {
        method: "DELETE",
        headers: { Authorization: auth.token },
      });
      if (res.status !== 200) {
        alert("Error al eliminar la unidad");
        return;
      }
      handleClose();
      await getUnit();
      navigate(0);
    } catch (error) {
      console.error("Error al eliminar la unidad:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          <img src="/img/advertencia.png" alt="" />
          <p> Eliminar Unidad</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModalBody}>
        <p>
          ¿Está seguro de que desea eliminar la unidad <strong>"{unit}"</strong>
          ?
        </p>
        <p>
          {" "}
          Los materiales asociadas a esta unidad quedaran con el campo unidad
          indefinido.{" "}
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

export default DeleteUnitModal;
