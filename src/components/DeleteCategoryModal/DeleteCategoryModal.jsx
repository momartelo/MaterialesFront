import styles from "./DeleteCategoryModal.module.css";
import { API_URL } from "../../utils/consts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";

const DeleteCategoryModal = ({
  show,
  categoryId,
  getCategory,
  onHide,
  category,
}) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const handleClose = () => {
    onHide();
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/category/${categoryId}`, {
        method: "DELETE",
        headers: { Authorization: auth.token },
      });
      if (res.status !== 200) {
        alert("Error al eliminar la categoria");
        return;
      }
      handleClose();
      await getCategory();
      navigate(0);
    } catch (error) {
      console.error("Error al eliminar la categoria:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          <img src="/img/advertencia.png" alt="" />
          <p> Eliminar Categoria</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModalBody}>
        <p>
          ¿Está seguro de que desea eliminar la categoria{" "}
          <strong>"{category}"</strong>?
        </p>
        <p>
          {" "}
          Las Subcategorias asociadas a esta categoria tambien se borraran.{" "}
        </p>
        <p>
          Los materiales asociados a esta categoria quedaran con los campos de
          categoria y subcategoria indefinidos
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

export default DeleteCategoryModal;
