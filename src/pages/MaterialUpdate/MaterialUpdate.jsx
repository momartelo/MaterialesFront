import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import UpdateHistoryPricesModal from "../../components/UpdateHistoryPricesModal/UpdateHistoryPricesModal";
import { getCovertExchangePair } from "../../functions/fetchs";
import useAppContext from "../../hooks/useAppContext";
import { AuthContext } from "../../providers/AuthProvider";
import { API_URL } from "../../utils/config";
import styles from "./MaterialUpdate.module.css";

const MaterialUpdate = () => {
  const { materialId } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const [material, setMaterial] = useState(null);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [source, setSource] = useState("");
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
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(null);
  const [selectedPriceEntry, setSelectedPriceEntry] = useState({});
  const [showModal, setShowModal] = useState(false); // ! Para el modal Historial Precio
  const [historyPrices, setHistoryPrices] = useState([]); // ! para guardar el array de historial
  const [showHistory, setShowHistory] = useState(false);

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
              // Authorization: auth.token,
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
        setSource(materialData.fuente);
        setHistoryPrices(materialData.historialPrecio);

        const unitResponse = await fetch(`${API_URL}/unit/`, {
          headers: {
            "content-type": "application/json",
            // Authorization: auth.token,
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
            // Authorization: auth.token,
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
            // Authorization: auth.token,
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
          fuente: source,
          unit: unitName,
          category: categoryName,
          subcategory: subcategoryName,
          historialPrecio: historyPrices,
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

  // ! Función para manejar la edición
  const handleEditPrice = (index) => {
    setSelectedPriceIndex(index);
    setSelectedPriceEntry(historyPrices[index]);
    setShowModal(true); // Muestra el modal o formulario de edición
  };

  // ! Función para guardar la entrada editada
  const handleSaveEditedPrice = async (updatedEntry) => {
    // Actualiza el historial de precios en el estado local
    const updatedHistoryPrices = historyPrices.map((entry, index) =>
      index === selectedPriceIndex ? { ...entry, ...updatedEntry } : entry
    );

    console.log("Updated Entry:", updatedEntry); // Debug

    try {
      // Actualiza los precios en diferentes monedas para el historial
      const updatedPricesWithConversions = await Promise.all(
        updatedHistoryPrices.map(async (entry) => {
          const { tipo_cambio: dollarRate } = await getCovertExchangePair(
            entry.moneda,
            "USD"
          );
          const { tipo_cambio: euroRate } = await getCovertExchangePair(
            entry.moneda,
            "EUR"
          );
          const { tipo_cambio: pesoRate } = await getCovertExchangePair(
            entry.moneda,
            "ARS"
          );

          return {
            ...entry,
            precioEnDolares: entry.precio * dollarRate,
            precioEnEuros: entry.precio * euroRate,
            precioEnPesos: entry.precio * pesoRate,
            valorDolar: dollarRate,
            valorEuro: euroRate,
            fechaCotizaciones: new Date(), // Actualiza la fecha de cotización
          };
        })
      );

      // Actualiza el estado local
      setHistoryPrices(updatedPricesWithConversions);

      // Envía la actualización a la base de datos
      const response = await fetch(`${API_URL}/material/${materialId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth.token,
        },
        body: JSON.stringify({
          historialPrecio: updatedPricesWithConversions, // Envía el historial completo
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(
          "Error al actualizar el historial de precios:",
          errorData
        );
        throw new Error("Error al actualizar el historial de precios");
      }

      setShowModal(false); // Cierra el modal después de guardar
    } catch (error) {
      console.error("Error al actualizar el historial de precios:", error);
    }
  };

  if (!material) {
    return <p>Cargando...</p>;
  }

  const formatPesos = (amount) => {
    return amount
      ? amount.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        })
      : "";
  };

  const formatDollars = (amount) => {
    const numericAmount = parseFloat(amount); // Convierte a número

    return !isNaN(numericAmount) && numericAmount !== 0
      ? (() => {
          const parts = numericAmount.toFixed(2).toString().split(".");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          return `U$S ${parts.join(",")}`;
        })()
      : ""; // Retornar una cadena vacía si amount no es un número
  };

  return (
    <>
      <Navbar />
      <div
        className={` ${styles.containerMaterialUpdate} ${containerClass} ${modeClass}`}
      >
        <div
          className={` ${styles.containerWrapper} ${containerClass} ${modeClass}`}
        >
          <div
            className={` ${styles.containerImage} ${containerClass} ${modeClass}`}
          >
            <img src={material.image} alt="" />
          </div>
          <div
            className={` ${styles.containerData} ${containerClass} ${modeClass}`}
          >
            <div className={styles.containerTitleUpdate}>
              <img src="/img/editar-documento.png" alt="" />
              <h2>Editar</h2> <h2>Material:</h2>
            </div>
            <div className={styles.containerNameUpdate}>
              <h3>{material.name}</h3>
            </div>
          </div>
        </div>

        <UpdateHistoryPricesModal
          show={showModal}
          onHide={() => setShowModal(false)}
          priceEntry={selectedPriceEntry}
          onSave={handleSaveEditedPrice}
        />

        <form
          onSubmit={handleSubmit}
          className={`${styles.form} ${containerClass} ${modeClass}`}
        >
          <div
            className={`${styles.inputGroup} ${containerClass} ${modeClass}`}
          >
            <label htmlFor="image">Imagen:</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div
            className={`${styles.inputGroup} ${containerClass} ${modeClass}`}
          >
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div
            className={`${styles.inputGroup} ${containerClass} ${modeClass}`}
          >
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div
            className={`${styles.inputGroup} ${containerClass} ${modeClass}`}
          >
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
          <div
            className={`${styles.historyToggleContainer} ${containerClass} ${modeClass}`}
          >
            <button
              type="button"
              className={styles.buttonToggleHistory}
              onClick={() => setShowHistory((prev) => !prev)}
            >
              {!showHistory ? (
                <div className={styles.spanOpenContainer}>
                  <span
                    className={`${styles.showHistoryText} ${containerClass} ${modeClass}`}
                  >
                    Mostrar Historial de Precios
                  </span>
                </div>
              ) : (
                <div className={styles.spanCloseContainer}>
                  <span className={styles.closeHistory}>X</span>
                </div>
              )}
            </button>
          </div>

          {showHistory && (
            <div
              className={`${styles.historySection} ${containerClass} ${modeClass}`}
            >
              <h3>Historial de Precios</h3>
              <ul className={styles.ulHistoryPrices}>
                {historyPrices.map((priceEntry, index) => (
                  <li
                    key={index}
                    className={` ${styles.liHistoryContainer} ${containerClass} ${modeClass}`}
                  >
                    <img src="/img/delantero.png" alt="" />
                    <span className={styles.dateLiHistoryPrice}>
                      {new Date(priceEntry.fecha).toLocaleDateString("es-ES", {
                        timeZone: "UTC", // Asegúrate de ajustar la zona horaria
                      })}
                    </span>
                    <span>-</span>
                    <span>
                      {priceEntry.moneda === "USD"
                        ? formatDollars(priceEntry.precio)
                        : priceEntry.moneda === "ARS"
                        ? formatPesos(priceEntry.precio)
                        : priceEntry.precio}{" "}
                      {/* Para otras monedas, mostrar solo el precio */}
                    </span>
                    <button
                      className={` ${styles.buttonEditHistoryPrice} ${containerClass} ${modeClass}`}
                      onClick={(e) => {
                        e.preventDefault(); // Previene el comportamiento por defecto
                        handleEditPrice(index); // Llama a la función de edición
                      }}
                    >
                      Editar
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* <button
              type="button"
              className={styles.buttonEditHistory}
              onClick={handleShowModal}
            >
              Editar Historial de Precios
            </button> */}
          <div
            className={`${styles.inputGroup} ${containerClass} ${modeClass}`}
          >
            <label htmlFor="source">Fuente:</label>
            <input
              type="text"
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </div>
          <div
            className={`${styles.inputGroup} ${containerClass} ${modeClass}`}
          >
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
          <div
            className={`${styles.inputGroup} ${containerClass} ${modeClass}`}
          >
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
          <div
            className={`${styles.inputGroup} ${containerClass} ${modeClass}`}
          >
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
          <div
            className={`${styles.containerButtons} ${containerClass} ${modeClass}`}
          >
            <button
              className={`${styles.buttonMaterialUpdate} ${containerClass} ${modeClass}`}
              type="submit"
            >
              Actualizar
            </button>
            <button
              type="button"
              className={`${styles.buttonBack} ${containerClass} ${modeClass}`}
              onClick={handleBack}
            >
              Volver
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default MaterialUpdate;
