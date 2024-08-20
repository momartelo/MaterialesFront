import styles from "./UpdateUnitModal.module.css";
import { API_URL } from "../../utils/consts";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useEffect, useRef, useState } from "react";

const UpdateUnitModal = ({ show, unitId, getUnit, onHide, unit }) => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [unitValue, setUnitValue] = useState("");
  const formRef = useRef(null);

  useEffect(() => {
    setUnitValue(unit);
  }, [unit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(formRef.current);
      const unit = formData.get("unit");

      const req = await fetch(`${API_URL}/unit/${unitId}`, {
        method: "PATCH",
        headers: {
          Authorization: auth.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ unit }),
      });

      if (!req.ok) {
        throw new Error("Error al actualizar la unidad");
      }

      formRef.current.reset();
      handleClose();
      await getUnit();
      navigate(0);
    } catch (error) {
      console.error("Error al actualizar la unidad");
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
          <p>Unidades</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModalBody}>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyTitle}>
            <h2>Editar Unidad</h2>
          </div>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className={styles.formUnit}>
              <input
                type="text"
                name="unit"
                value={unitValue}
                onChange={(e) => setUnitValue(e.target.value)}
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

export default UpdateUnitModal;
