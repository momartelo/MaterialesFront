import styles from "./UpdateCategoryModal.module.css";
import { API_URL } from "../../utils/config";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useState, useRef } from "react";

const UpdateCategoryModal = ({ show, categoryId, onHide, category }) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [categoryValue, setCategoryValue] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    setCategoryValue(category);
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(formRef.current);
      const category = formData.get("category");

      const req = await fetch(`${API_URL}/category/${categoryId}`, {
        method: "PATCH",
        headers: {
          Authorization: auth.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category }),
      });

      if (!req.ok) {
        throw new Error("Error al actualizar la categoria");
      }

      formRef.current.reset();
      handleClose();
      navigate(0);
    } catch (error) {
      console.error("Error al actualizar la categoria:", error);
    }
  };

  const handleClose = () => {
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className={styles.containerModal}
      centered
    >
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          <img src="/img/editar-documento.png" alt="" />
          <p>Categorias</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModalBody}>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyTitle}>
            <h2>Editar Categoria</h2>
          </div>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className={styles.formCategory}>
              {/* <label>Categoria: </label> */}
              <input
                type="text"
                name="category"
                value={categoryValue}
                onChange={(e) => setCategoryValue(e.target.value)}
                required
              />
            </div>
            <div className={styles.containerButtons}>
              <Button className={styles.buttonSubmit} type="submit">
                Actualizar
              </Button>
              <button className={styles.buttonBack} onClick={handleClose}>
                Volver
              </button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateCategoryModal;
