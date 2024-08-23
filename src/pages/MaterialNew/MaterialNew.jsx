import styles from "./MaterialNew.module.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../providers/AuthProvider";
import { API_URL } from "../../utils/config";
import React, { useContext, useEffect, useState, useId } from "react";
import { fetchCategories } from "../../functions/getCategory";
import CategoryNewModal from "../../components/CategoryNewModal/CategoryNewModal";
import { fetchSubcategories } from "../../functions/getSubcategory";
import SubcategoryNewModal from "../../components/SubcategoryNewModal/SubcategoryNewModal";
import { fetchUnits } from "../../functions/getUnit";
import UnitNewModal from "../../components/UnitNewModal/UnitNewModal";
import { ClipLoader } from "react-spinners";

const MaterialNew = () => {
  const nameId = useId();
  const priceId = useId();
  const currencyId = useId();
  const sourceId = useId();
  const unitId = useId();
  const categoryId = useId();
  const subcategoryId = useId();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [source, setSource] = useState("");
  const [unitIdState, setUnitIdState] = useState("");
  const [unitName, setUnitName] = useState("");
  const [categoryIdState, setCategoryIdState] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryIdState, setSubcategoryIdState] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterSubcategories, setFilterSubcategories] = useState([]);
  const [filterUnits, setFilterUnits] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [units, setUnits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  const [showCategoryNewModal, setShowCategoryNewModal] = useState(false);
  const [showSubcategoryNewModal, setShowSubcategoryNewModal] = useState(false);
  const [showUnitNewModal, setShowUnitNewModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${API_URL}/unit/`)
      .then((res) => res.json())
      .then((data) => setUnits(data))
      .catch((err) => console.error(err));

    fetch(`${API_URL}/category/`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));

    fetch(`${API_URL}/subcategory/`)
      .then((res) => res.json())
      .then((data) => setSubcategories(data))
      .catch((err) => console.error(err));
  }, []);

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

  const handleSubcategoryChange = (e) => {
    const selectedSubcategoryId = e.target.value;
    const selectedSubcategory = filteredSubcategories.find(
      (subcat) => subcat._id === selectedSubcategoryId
    );
    setSubcategoryIdState(selectedSubcategory ? selectedSubcategory._id : "");
    setSubcategoryName(
      selectedSubcategory ? selectedSubcategory.subcategory : ""
    );
  };

  const handleUnitChange = (e) => {
    const selectedUnitId = e.target.value;
    const selectedUnit = units.find((unit) => unit._id === selectedUnitId);
    setUnitIdState(selectedUnit ? selectedUnit._id : "");
    setUnitName(selectedUnit ? selectedUnit.unit : "");
  };

  const loadCategories = () => {
    fetchCategories(auth.token) // Asegúrate de pasar el token correcto
      .then((data) => {
        setFilterCategories(data); // Actualiza el estado con las nuevas categorías
      })
      .catch((err) => console.error(err));
  };

  const loadSubcategories = () => {
    fetchSubcategories(auth.token)
      .then((data) => {
        setFilterSubcategories(data);
      })
      .catch((err) => console.error(err));
  };

  const loadUnits = () => {
    fetchUnits(auth.token)
      .then((data) => {
        setFilterUnits(data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price.trim()) {
      alert("Por favor, completa todos los campos requeridos");
      return;
    }
    setLoading(true);

    try {
      console.log("Datos a enviar:", {
        name: name.trim(),
        precio: parseFloat(price),
        moneda: currency,
        fuente: source,
        unit: unitName,
        category: categoryName,
        subcategory: subcategoryName,
      });

      const response = await fetch(`${API_URL}/material/new`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: auth.token,
        },
        body: JSON.stringify({
          name: name.trim(),
          precio: parseFloat(price),
          moneda: currency,
          fuente: source,
          unit: unitName,
          category: categoryName,
          subcategory: subcategoryName,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el material");
      }

      alert("Material creado exitosamente!");
      navigate("/material");
    } catch (error) {
      console.error("Error", error);
      alert(
        "Hubo un error al crear el material. Por favor, intente nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryNewClick = (e) => {
    e.stopPropagation();
    setShowCategoryNewModal(true);
  };

  const handleSubcategoryNewClick = (e) => {
    e.stopPropagation();
    setShowSubcategoryNewModal(true);
  };

  const handleUnitNewClick = (e) => {
    e.stopPropagation();
    setShowUnitNewModal(true);
  };

  const handleCloseModal = () => {
    setShowSubcategoryNewModal(false);
    setShowCategoryNewModal(false);
    setShowUnitNewModal(false);
  };

  const handleBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  return (
    <>
      <Navbar />
      <div className={styles.containerMaterialNew}>
        <div className={styles.containerTitle}>
          <img src="/img/papel.png" alt="" />
          <h2>Crear un nuevo material</h2>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor={nameId}>Nombre:</label>
            <input
              type="text"
              id={nameId}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor={priceId}>Precio:</label>
            <input
              type="number"
              id={priceId}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor={currencyId}>Moneda:</label>
            <select
              id={currencyId}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option value="">Seleccionar Moneda</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="ARS">ARS</option>
            </select>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor={sourceId}>Fuente:</label>
            <input
              type="text"
              id={sourceId}
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor={unitId}>Unidad:</label>
            <div className={styles.containerSelect}>
              <select
                id={unitId}
                value={unitIdState}
                onChange={handleUnitChange}
              >
                <option value="">Seleccionar Unidad</option>
                {units.map((unit) => (
                  <option key={unit._id} value={unit._id}>
                    {unit.unit}
                  </option>
                ))}
              </select>
              <Link className={styles.buttonNew} onClick={handleUnitNewClick}>
                Nueva
              </Link>
              <UnitNewModal
                show={showUnitNewModal}
                onHide={handleCloseModal}
                onUnitCreated={loadUnits}
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
              <Link
                className={styles.buttonNew}
                onClick={handleCategoryNewClick}
              >
                Nueva
              </Link>
              <CategoryNewModal
                show={showCategoryNewModal}
                onHide={handleCloseModal}
                onCategoryCreated={loadCategories}
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor={subcategoryId}>Subcategoria:</label>
            <div className={styles.containerSelect}>
              <select
                id={subcategoryId}
                value={subcategoryIdState}
                onChange={handleSubcategoryChange}
              >
                <option value="">Seleccionar Subcategoria</option>
                {filteredSubcategories.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.subcategory}
                  </option>
                ))}
              </select>
              <Link
                className={styles.buttonNew}
                onClick={handleSubcategoryNewClick}
              >
                Nueva
              </Link>
              <SubcategoryNewModal
                show={showSubcategoryNewModal}
                onHide={handleCloseModal}
                onSubcategoryCreated={loadSubcategories}
              />
            </div>
          </div>
          <div className={styles.containerButtons}>
            <button
              className={styles.buttonMaterialNew}
              type="submit"
              disabled={loading}
            >
              Crear
            </button>
            <button className={styles.buttonBack} onClick={handleBack}>
              Volver
            </button>
          </div>
          {loading && (
            <div className={styles.loaderOverlay}>
              <ClipLoader color="#3498db" loading={loading} />
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default MaterialNew;
