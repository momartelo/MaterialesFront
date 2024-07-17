import { useContext, useEffect, useId, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchCategories } from "../../functions/getCategory";
import { AuthContext } from "../../providers/AuthProvider";
import styles from "./CategoryNew.module.css";
import { API_URL } from "../../utils/consts";
import Navbar from "../../components/Navbar/Navbar";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

const CategoryNew = () => {
  const modalId = useId();
  const categoryId = useId();
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryIdState, setCategoryIdState] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetchCategories(auth.token)
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, [auth]);

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(
      (cat) => cat._id === selectedCategoryId
    );
    setCategoryIdState(selectedCategory ? selectedCategory._id : "");
    setCategoryName(selectedCategory ? selectedCategory.category : "");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        if (res.status === 201) {
          setModalMessage("Categoría creada exitosamente");
          setShowModal(true);
        } else {
          setModalMessage("Error al crear la categoría");
          setShowModal(true);
        }
      })
      .catch(() => {
        setModalMessage("Error al crear la categoría");
        setShowModal(true);
      });
  };

  const handleBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  return (
    <>
      <Navbar />
      <div className={styles.containerCategoryNew}>
        <h2>Crear una nueva categoria</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor={categoryId}>Categoria:</label>
            <div className={styles.containerInput}>
            <input
              type="text"
              id={categoryId}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Link className={styles.buttonList} to="/category">
            Listar
            </Link>
            </div>
          </div>
          <div className={styles.containerButtons}>
          <button className={styles.buttonNewCategory} type="submit">
            Crear
          </button>
          <button className={styles.buttonBack} onClick={handleBack} >
            Volver
          </button>
          </div>
        </form>
      </div>
      <ConfirmModal
        show={showModal}
        onHide={handleConfirm}
        modalMessage={modalMessage}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default CategoryNew;
