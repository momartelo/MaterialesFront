import styles from "./UnitNewModal.module.css";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../providers/AuthProvider";
import { API_URL } from "../../utils/config";
import { useContext, useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";

const UnitNewModal = ({ show, onUnitCreated, onHide }) => {
  const unitId = useId();
  const [unit, setUnit] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetch(`${API_URL}/unit/new`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({
        unit: unit,
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          setModalMessage("Unidad existente");
          setShowModal(true);
        } else if (res.status === 201) {
          setModalMessage("Unidad creada exitosamente");
          setShowModal(true);
          onUnitCreated();
        } else {
          setModalMessage("Error al crear la unidad");
          setShowModal(true);
        }
        handleClose();
        navigate(0);
      })
      .catch(() => {
        setModalMessage("Error al crear la unidad");
        setShowModal(true);
      });
  };

  const handleBackModal = () => {
    onHide();
  };

  const handleClose = (e) => {
    setUnit("");
    setShowModal(false);
    onHide();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className={styles.containerModal}
      onClick={handleModalClick}
      centered
    >
      <Modal.Header closeButton className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>
          <img src="/img/nuevo-documento.png" alt="" />
          <div className={styles.modalTitleP}>
            <p>Crear una nueva</p>&nbsp;<p>unidad</p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModalBody}>
        <form onSubmit={handleSubmit} className={styles.formUnit}>
          <div className={styles.inputGroup}>
            <label htmlFor={unitId}>Unidad:</label>
            <div className={styles.containerInput}>
              <input
                type="text"
                id={unitId}
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.containerButtons}>
            <button className={styles.buttonNewUnit} type="submit">
              Crear
            </button>
            <button
              className={styles.buttonBack}
              type="button"
              onClick={handleBackModal}
            >
              Volver
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default UnitNewModal;
