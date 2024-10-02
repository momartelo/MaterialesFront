import React, { useContext, useEffect, useId, useState } from "react";
import styles from "./CategoryNewModal.module.css";

import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { API_URL } from "../../utils/config";

const CategoryNewModal = ({ show, onCategoryCreated, onHide }) => {
  const categoryId = useId();
  const [category, setCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fetch(`${API_URL}/category/new`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({
        category: category,
      }),
    })
      .then((res) => {
        if (res.status === 400) {
          setModalMessage("Categoria existente");
          setShowModal(true);
        } else if (res.status === 201) {
          setModalMessage("Categoria creada exitosamente");
          setShowModal(true);
          onCategoryCreated();
        } else {
          setModalMessage("Error al crear la categoría");
          setShowModal(true);
        }
        handleClose();
        navigate(0);
      })
      .catch(() => {
        setModalMessage("Error al crear la categoría");
        setShowModal(true);
      });
  };

  const handleBackModal = () => {
    onHide();
  };

  const handleClose = (e) => {
    setCategory(""); // Reiniciar el input
    setShowModal(false);
    onHide(); // Cerrar el modal
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
            <p>
              Crear una nueva <span>categoria</span>
            </p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModalBody}>
        <form onSubmit={handleSubmit} className={styles.formCategory}>
          <div className={styles.inputGroup}>
            <label htmlFor={categoryId}>Categoria:</label>
            <div className={styles.containerInput}>
              <input
                type="text"
                id={categoryId}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              {/* <Link className={styles.buttonList} to="/category">
                Listar
                </Link> */}
            </div>
          </div>
          <div className={styles.containerButtons}>
            <button className={styles.buttonNewCategory} type="submit">
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

export default CategoryNewModal;
