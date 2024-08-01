import styles from "./MaterialNew.module.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../providers/AuthProvider";
import { API_URL } from "../../utils/consts";
import React, { useContext, useEffect, useState, useId } from "react";

const MaterialNew = () => {
  const nameId = useId();
  const priceId = useId();
  const currencyId = useId();
  const unitId = useId();
  const categoryId = useId();
  const subcategoryId = useId();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [unitIdState, setUnitIdState] = useState("");
  const [unitName, setUnitName] = useState("");
  const [categoryIdState, setCategoryIdState] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryIdState, setSubcategoryIdState] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");

  const [units, setUnits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !price.trim()) return;

    console.log("Datos a enviar:", {
      name: name.trim(),
      precio: parseFloat(price),
      moneda: currency,
      unit: unitName,
      category: categoryName,
      subcategory: subcategoryName,
    });

    fetch(`${API_URL}/material/new`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify({
        name: name.trim(),
        precio: parseFloat(price),
        moneda: currency,
        unit: unitName,
        category: categoryName,
        subcategory: subcategoryName,
      }),
    }).then((res) => {
      if (res.status !== 201) return alert("Error creating material");

      navigate("/material");
    });
  };

  const handleBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  return (
    <>
      <Navbar />
      <div className={styles.containerMaterialNew}>
        <div className={styles.containerTitle}>
        <img src="../../../public/img/papel.png" alt="" />
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
              <Link className={styles.buttonNew} to="/unit/new">
                Nueva
              </Link>
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
              <Link className={styles.buttonNew} to="/category/new">
                Nueva
              </Link>
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
              <Link className={styles.buttonNew} to="/subcategorynew">
                Nueva
              </Link>
            </div>
          </div>
          <div className={styles.containerButtons}>
            <button className={styles.buttonMaterialNew} type="submit">
              Crear
            </button>
            <button className={styles.buttonBack} onClick={handleBack}>
              Volver
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MaterialNew;
