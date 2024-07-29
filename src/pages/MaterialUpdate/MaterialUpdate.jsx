import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../providers/AuthProvider";
import { API_URL } from "../../utils/consts";
import styles from "./MaterialUpdate.module.css";

const MaterialUpdate = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const [material, setMaterial] = useState(null);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [unitIdState, setUnitIdState] = useState("");
  const [categoryIdState, setCategoryIdState] = useState("");
  const [subcategoryIdState, setSubcategoryIdState] = useState("");
  const [units, setUnits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [unitName, setUnitName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");

  useEffect(() => {
    if (!auth) {
      return;
    }

    const fetchMaterial = async () => {
      try {
        const materialResponse = await fetch(
          `${API_URL}/material/get/${materialId}`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: auth.token,
            },
          }
        );
        if (!materialResponse.ok) {
          throw new Error("Error al obtener el material");
        }
        const materialData = await materialResponse.json();
        setMaterial(materialData);
        setImage(materialData.image);
        setName(materialData.name);
        setPrice(materialData.precio.toString());
        setCurrency(materialData.moneda);

        const unitResponse = await fetch(`${API_URL}/unit/`, {
          headers: {
            "content-type": "application/json",
            Authorization: auth.token,
          },
        });
        if (!unitResponse.ok) {
          throw new Error("Error al obtener las unidades");
        }
        const unitData = await unitResponse.json();
        setUnits(unitData);

        const categoryResponse = await fetch(`${API_URL}/category/`, {
          headers: {
            "content-type": "application/json",
            Authorization: auth.token,
          },
        });
        if (!categoryResponse.ok) {
          throw new Error("Error al obtener las categorías");
        }
        const categoryData = await categoryResponse.json();
        setCategories(categoryData);

        const subcategoryResponse = await fetch(`${API_URL}/subcategory/`, {
          headers: {
            "content-type": "application/json",
            Authorization: auth.token,
          },
        });
        if (!subcategoryResponse.ok) {
          throw new Error("Error al obtener las subcategorías");
        }
        const subcategoryData = await subcategoryResponse.json();
        setSubcategories(subcategoryData);

        const unit = unitData.find((unit) => unit._id === materialData.unit);
        setUnitIdState(unit ? unit._id : "");
        setUnitName(unit ? unit.unit : "");

        const category = categoryData.find(
          (cat) => cat._id === materialData.category
        );
        setCategoryIdState(category ? category._id : "");
        setCategoryName(category ? category.category : "");

        const subcategory = subcategoryData.find(
          (subcat) => subcat._id === materialData.subcategory
        );
        setSubcategoryIdState(subcategory ? subcategory._id : "");
        setSubcategoryName(subcategory ? subcategory.subcategory : "");

        if (category) {
          const filteredSubs = subcategoryData.filter(
            (subcat) => subcat.category._id === category._id
          );
          setFilteredSubcategories(filteredSubs);
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    if (materialId) {
      fetchMaterial();
    }
  }, [materialId, auth]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price.trim()) return;

    try {
      const response = await fetch(`${API_URL}/material/${materialId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
        body: JSON.stringify({
          image: image,
          name: name.trim(),
          precio: parseFloat(price),
          moneda: currency,
          unit: unitName,
          category: categoryName,
          subcategory: subcategoryName,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error details:", errorData);
        throw new Error("Error al actualizar el material");
      }

      navigate("/material");
    } catch (error) {
      console.error("Error al actualizar el material:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!material) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <Navbar />
      <div className={styles.containerMaterialUpdate}>
        <div className={styles.containerWrapper}>
          <div className={styles.containerImage}>
            <img src={material.image} alt="" />
          </div>
          <div className={styles.containerData}>
            <div className={styles.containerTitleUpdate}>
              <img src="/img/actualizarRellenoCuadrado.png" alt="" />
              <h2>Actualizar material:</h2>
            </div>
            <div className={styles.containerNameUpdate}>
              <h3>{material.name}</h3>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="image">Imagen:</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="currency">Moneda:</label>
            <select
              id="currency"
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
            <label htmlFor="unit">Unidad:</label>
            <div className={styles.containerSelect}>
              <select id="unit" value={unitIdState} onChange={handleUnitChange}>
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
            <label htmlFor="category">Categoría:</label>
            <div className={styles.containerSelect}>
              <select
                id="category"
                value={categoryIdState}
                onChange={handleCategoryChange}
              >
                <option value="">Seleccionar Categoría</option>
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
            <label htmlFor="subcategory">Subcategoría:</label>
            <div className={styles.containerSelect}>
              <select
                id="subcategory"
                value={subcategoryIdState}
                onChange={handleSubcategoryChange}
              >
                <option value="">Seleccionar Subcategoría</option>
                {filteredSubcategories.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory._id}>
                    {subcategory.subcategory}
                  </option>
                ))}
              </select>
              <Link className={styles.buttonNew} to="/subcategory/new">
                Nueva
              </Link>
            </div>
          </div>
          <div className={styles.containerButtons}>
            <button className={styles.buttonMaterialUpdate} type="submit">
              Actualizar
            </button>
            <button
              type="button"
              className={styles.buttonBack}
              onClick={handleBack}
            >
              Volver
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MaterialUpdate;
