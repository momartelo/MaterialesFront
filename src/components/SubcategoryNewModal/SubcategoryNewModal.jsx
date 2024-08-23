import styles from "./SubcategoryNewModal.module.css";
import React, { useContext, useEffect, useId, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { fetchSubcategories } from "../../functions/getSubcategory";
import { API_URL } from "../../utils/config";
import CategoryNewModal from "../CategoryNewModal/CategoryNewModal";
import { fetchCategories } from "../../functions/getCategory";

const SubcategoryNewModal = ({ show, onSubcategoryCreated, onHide }) => {
  const categoryId = useId();
  const subcategoryId = useId();
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryIdState, setCategoryIdState] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryIdState, setSubcategoryIdState] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${API_URL}/category/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));

    fetch(`${API_URL}/subcategory/`)
      .then((res) => res.json())
      .then((data) => setSubcategories(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModalMessage(""); // Opcional: Limpiar mensaje anterior antes de la nueva solicitud

    try {
      const res = await fetch(`${API_URL}/subcategory/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
        body: JSON.stringify({
          category: categoryName,
          subcategory: subcategory,
        }),
      });

      const data = await res.json(); // Obtener el cuerpo de la respuesta

      if (res.status === 400) {
        // Muestra el mensaje de error devuelto por el backend
        setModalMessage(data.error);
        setShowModal(true);
      } else if (res.status === 201) {
        setModalMessage("Subcategoría creada exitosamente");
        setShowModal(true);
        onSubcategoryCreated();
      } else {
        setModalMessage("Error al crear la Subcategoría");
        setShowModal(true);
      }
      handleClose();
    } catch (error) {
      setModalMessage("Error al crear la Subcategoría");
      setShowModal(true);
    }
  };

  const handleBackModal = () => {
    onHide();
  };

  const handleClose = (e) => {
    setSubcategory("");
    setCategory("");
    navigate(0);
    setShowModal(false);
    onHide();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(
      (cat) => cat._id === selectedCategoryId
    );
    setCategoryIdState(selectedCategory ? selectedCategory._id : "");
    setCategoryName(selectedCategory ? selectedCategory.category : "");
    const filteredSubs = subcategories.filter(
      (subcat) => subcat.category._id === selectedCategoryId
    );
    setFilteredSubcategories(filteredSubs);
    setSubcategoryIdState("");
    setSubcategoryName("");
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
            <p>Crear una nueva</p>&nbsp;<p>Subcategoria</p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModalBody}>
        <form onSubmit={handleSubmit} className={styles.formSubcategory}>
          <div className={styles.inputGroup}>
            <label htmlFor={subcategoryId}>Subcategoria:</label>
            <div className={styles.containerInput}>
              <input
                type="text"
                id={subcategoryId}
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor={categoryId}>Categoria:</label>
            <div className={styles.containerSelect}>
              <select
                id={categoryId}
                value={categoryIdState}
                onChange={handleCategoryChange}
              >
                <option value="">Seleccionar Categoria</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.category}
                  </option>
                ))}
              </select>
              <Link className={styles.buttonNew} to={"/category"}>
                Nueva
              </Link>
            </div>
          </div>
          <div className={styles.containerButtons}>
            <button className={styles.buttonNewSubcategory} type="submit">
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

export default SubcategoryNewModal;
