import styles from "./UpdateSubcategoryModal.module.css";
import { API_URL } from "../../utils/config";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useRef, useState } from "react";

const UpdateSubcategoryModal = ({
  show,
  subcategory,
  onHide,
  subcategoryId,
}) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [subcategoryValue, setSubcategoryValue] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    setSubcategoryValue(subcategory);
  }, [subcategory]);

  const handleClose = () => {
    onHide();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(formRef.current);
      const subcategory = formData.get("subcategory");

      const req = await fetch(`${API_URL}/subcategory/${subcategoryId}`, {
        method: "PATCH",
        headers: {
          Authorization: auth.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subcategory }),
      });

      if (!req.ok) {
        throw new Error("Error al actualizar la subcategoria");
      }

      formRef.current.reset();
      handleClose();
      // await getSubcategory();
      navigate(0);
    } catch (error) {
      console.error("Error al actualizar la subcategoria", error);
    }
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
          <p>Subcategorias</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModalBody}>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyTitle}>
            <h2>Editar Subcategoria</h2>
          </div>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className={styles.formSubcategory}>
              {/* <label>Subcategoria: </label> */}
              <input
                type="text"
                name="subcategory"
                value={subcategoryValue}
                onChange={(e) => setSubcategoryValue(e.target.value)}
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

export default UpdateSubcategoryModal;
