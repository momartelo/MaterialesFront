import styles from "./DeleteSubcategoryModal.module.css";
import { API_URL } from "../../utils/config";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";
import useAppContext from "../../hooks/useAppContext";

const DeleteSubcategoryModal = ({
  show,
  subcategoryId,
  onHide,
  subcategory,
}) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const handleClose = () => {
    onHide();
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/subcategory/${subcategoryId}`, {
        method: "DELETE",
        headers: {
          Authorization: auth.token,
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 200) {
        alert("Error al eliminar la subcategoria");
        return;
      }
      handleClose();
      // await getSubcategory();
      navigate(0);
    } catch (error) {
      console.error("Error al eliminar la subcategoria", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          <img src="/img/advertencia.png" alt="" />
          <p> Eliminar Subcategoria</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModalBody}>
        <p>
          ¿Está seguro de que desea eliminar la categoria{" "}
          <strong>"{subcategory}"</strong>?
        </p>
        <p>¡Esta acción no se puede deshacer!!!</p>
      </Modal.Body>
      <Modal.Footer>
        <button
          className={`${styles.buttonDelete} ${containerClass} ${modeClass}`}
          onClick={handleDelete}
        >
          Eliminar
        </button>
        <button
          className={`${styles.buttonBack} ${containerClass} ${modeClass}`}
          onClick={handleClose}
        >
          Cancelar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteSubcategoryModal;
