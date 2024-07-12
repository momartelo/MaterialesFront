import styles from "./MaterialNew.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../providers/AuthProvider";
import { API_URL } from "../../utils/consts";
import React, { useContext, useEffect, useState, useId } from "react";

// const MaterialNew = () => {
//   const nameId = useId();
//   const priceId = useId();
//   const currencyId = useId();
//   const unitId = useId();
//   const categoryId = useId();
//   const subcategoryId = useId();

//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [currency, setCurrency] = useState("");
//   const [unit, setUnit] = useState("");
//   const [category, setCategory] = useState("");
//   const [subcategory, setSubcategory] = useState("");

//   const [units, setUnits] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSubcategories, setFilteredSubcategories] = useState([]);

//   const navigate = useNavigate();
//   const { auth } = useContext(AuthContext);

//   useEffect(() => {
//     fetch(`${API_URL}/unit/`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Units:", data); // Log units data
//         setUnits(data);
//       })
//       .catch((err) => console.error(err));

//     fetch(`${API_URL}/category/`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Categories:", data); // Log categories data
//         setCategories(data);
//       })
//       .catch((err) => console.error(err));

//     fetch(`${API_URL}/subcategory/`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Subcategories:", data); // Log subcategories data
//         setSubcategories(data);
//       })
//       .catch((err) => console.error(err));
//   }, []);

//   const handleCategoryChange = (e) => {
//     const selectedCategory = e.target.value;
//     setCategory(selectedCategory);

//     console.log("Selected Category ID:", selectedCategory);

//     const filteredSubcats = subcategories.filter((subcat) => {
//       const subcatCategoryId = String(subcat.category._id);
//       console.log("Subcategory Category ID:", subcatCategoryId);
//       return subcatCategoryId === selectedCategory;
//     });

//     console.log("Filtered Subcategories:", filteredSubcats);

//     setFilteredSubcategories(filteredSubcats);
//     setSubcategory("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!name.trim() || !price.trim()) return;

//     fetch(`${API_URL}/material/new`, {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         Authorization: auth.token,
//       },
//       body: JSON.stringify({
//         name: name.trim(),
//         precio: parseFloat(price),
//         moneda: currency,
//         unit,
//         category,
//         subcategory,
//       }),
//     }).then((res) => {
//       if (res.status !== 201) return alert("Error creating material");

//       navigate("/material");
//     });
//   };

//   return (
//     <div>
//       <Navbar3 />
//       <h2>Crear un nuevo material</h2>
//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.imputGroup}>
//           <label htmlFor={nameId}>Nombre:</label>
//           <input
//             type="text"
//             id={nameId}
//             placeholder="Nombre Material"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className={styles.imputGroup}>
//           <label htmlFor={priceId}>Precio:</label>
//           <input
//             type="number"
//             id={priceId}
//             placeholder="Precio"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </div>
//         <div className={styles.inputGroup}>
//           <label htmlFor={currencyId}>Moneda:</label>
//           <select
//             id={currencyId}
//             value={currency}
//             onChange={(e) => setCurrency(e.target.value)}
//           >
//             <option value="">Seleccionar moneda</option>
//             <option value="USD">USD</option>
//             <option value="EUR">EUR</option>
//             <option value="ARS">ARS</option>
//           </select>
//         </div>
//         <div className={styles.inputGroup}>
//           <label htmlFor={unitId}>Unidad:</label>
//           <select
//             id={unitId}
//             value={unit}
//             onChange={(e) => setUnit(e.target.value)}
//           >
//             <option value="">Seleccionar unidad</option>
//             {units.map((unit) => (
//               <option key={unit._id} value={unit._id}>
//                 {unit.unit}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className={styles.inputGroup}>
//           <label htmlFor={categoryId}>Categoria:</label>
//           <select
//             id={categoryId}
//             value={category}
//             onChange={handleCategoryChange}
//           >
//             <option value="">Seleccionar categoría</option>
//             {categories.map((category) => (
//               <option key={category._id} value={category._id}>
//                 {category.category}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className={styles.inputGroup}>
//           <label htmlFor={subcategoryId}>Subcategoria:</label>
//           <select
//             id={subcategoryId}
//             value={subcategory}
//             onChange={(e) => setSubcategory(e.target.value)}
//             disabled={!category}
//           >
//             <option value="">Seleccionar subcategoría</option>
//             {filteredSubcategories.map((subcategory) => (
//               <option key={subcategory._id} value={subcategory._id}>
//                 {subcategory.subcategory}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button type="submit">Crear</button>
//       </form>
//     </div>
//   );
// };

// export default MaterialNew;

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

  return (
    <div>
      <Navbar />
      <h2>Crear un nuevo material</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor={nameId}>Nombre:</label>
          <input
            type="text"
            id={nameId}
            placeholder="Nombre Material"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor={priceId}>Precio:</label>
          <input
            type="number"
            id={priceId}
            placeholder="Precio"
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
          <select id={unitId} value={unitIdState} onChange={handleUnitChange}>
            <option value="">Seleccionar Unidad</option>
            {units.map((unit) => (
              <option key={unit._id} value={unit._id}>
                {unit.unit}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor={categoryId}>Categoria:</label>
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
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor={subcategoryId}>Subcategoria:</label>
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
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default MaterialNew;
