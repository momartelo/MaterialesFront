import { useContext, useEffect, useState, useRef, useId } from "react";
import { API_URL } from "../../utils/consts";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import styles from "./UpdateMaterialModal.module.css";

const UpdateMaterialModal = ({
  show,
  materialId,
  getMaterial,
  onHide,
  material,
}) => {
  const imageId = useId();
  const nameId = useId();
  const priceId = useId();
  const currencyId = useId();
  const unitId = useId();
  const categoryId = useId();
  const subcategoryId = useId();

  const [image, setImage] = useState("");
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
  const formRef = useRef(null);

  useEffect(() => {
    setImage(material.image || "");
    setName(material.name || "");
    setPrice(material.precio || "");
    setCurrency(material.moneda || "");
    setUnitName(material.unit || "");
    setCategoryName(material.category || "");
    setSubcategoryName(material.subcategory || "");

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
  }, [material]);

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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const formData = {
  //       name: name.trim(),
  //       precio: parseFloat(price),
  //       moneda: currency,
  //       unit: unitName,
  //       category: categoryName,
  //       subcategory: subcategoryName,
  //     };
  //     console.log(name)
  //     console.log(price)
  //     console.log(currency)
  //     console.log(unitName)
  //     console.log(categoryName)
  //     console.log(subcategoryName)
  //     const body = JSON.stringify(formData);
  //     console.log(formData);
  //     console.log(body) 

  //     const req = await fetch(`${API_URL}/material/${materialId}`, {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: auth.token,
  //       },
  //       body,
  //     });

  //     if (!req.ok) {
  //       throw new Error("Error al actualizar el material");
  //     }

  //     formRef.current.reset(); // Limpiar el formulario
  //     handleClose(); // Cerrar el modal
  //     await getMaterial(); // Actualizar la lista de materiales
  //     navigate("/material"); // Navegar a la lista de materiales
  //   } catch (error) {
  //     console.error("Error al actualizar el material:", error);
  //     alert("Error al actualizar el material. Por favor, inténtelo nuevamente.");
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Datos a enviar:", {
      image: image,
      name: name.trim(),
      precio: parseFloat(price),
      moneda: currency,
      unit: unitName,
      category: categoryName,
      subcategory: subcategoryName,
    });

    fetch(`${API_URL}/material/${materialId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
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
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al actualizar el material")
      }
      formRef.current.reset();
      handleClose();
      return getMaterial();
    })
    .then(() =>{
      navigate("/material");
    })
    .catch((error) =>{
      console.error("Error al actualizar el material:", error);
    });
  };

  const handleBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  const handleClose = () => {
    onHide();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      onClick={handleModalClick}
      className={styles.containerModalUpdate}
      centered
    >
      <Modal.Header closeButton className={styles.ModalHeaderUpdate}>
        <Modal.Title className={styles.modalTitleUpdate}>Material</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.containerModalBodyUpdate}>
        <div className={styles.modalBodyUpdate}>
          <div className={styles.modalBodyTitleUpdate}>
            <img src="/img/actualizarRellenoCuadrado.png" alt="" />
            <h2>Actualizar Material</h2>
          </div>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={styles.formUpdateMaterial}
          >
            <div className={styles.formGroupImageUpdate}>
              <label htmlFor={imageId}>Imagen: </label>
              <input
                type="text"
                id={imageId}
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className={styles.formGroupNameUpdate}>
              <label htmlFor={nameId}>Nombre: </label>
              <input
                type="text"
                name={nameId}
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.formGroupPrecioUpdate}>
              <label htmlFor={priceId}>Precio: </label>
              <input
                type="number"
                id={priceId}
                name="precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className={styles.formGroupMonedaUpdate}>
              <label htmlFor={currencyId}>Moneda: </label>
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
            <div className={styles.formGroupUnidadUpdate}>
              <label htmlFor={unitId}>Unidad: </label>
              <select id={unitId} value={unitIdState} onChange={handleUnitChange}>
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
            <div className={styles.formGroupCategoriaUpdate}>
              <label htmlFor={categoryId}>Categoría:</label>
              <select
                id={categoryId}
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
            <div className={styles.formGroupSubcategoriaUpdate}>
              <label htmlFor={subcategoryId}>Subcategoría:</label>
              <select
                id={subcategoryId}
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

export default UpdateMaterialModal;




// import styles from "./UpdateMaterialModal.module.css";
// import { API_URL } from "../../utils/consts";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../providers/AuthProvider";
// import { useContext, useEffect, useState, useRef, useId } from "react";

// import React from "react";


// const UpdateMaterialModal = ({
//   show,
//   materialId,
//   getMaterial,
//   onHide,
//   material,
// }) => {

//   const { auth } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [imageValue, setImageValue] = useState("");
//   const [nameValue, setNameValue] = useState("");
//   const [precioValue, setPrecioValue] = useState("");
//   const [monedaValue, setMonedaValue] = useState("");
//   const [unitValue, setUnitValue] = useState("");
//   const [categoryValue, setCategoryValue] = useState("");
//   const [subcategoryValue, setSubcategoryValue] = useState("");

//   const formRef = useRef(null);


//   const imageId = useId();
//   const nameId = useId();
//   const priceId = useId();
//   const currencyId = useId();
//   const unitId = useId();
//   const categoryId = useId();
//   const subcategoryId = useId();

//   const [units, setUnits] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [filteredSubcategories, setFilteredSubcategories] = useState([]);

//   const [unitIdState, setUnitIdState] = useState("");
//   const [categoryIdState, setCategoryIdState] = useState("");
//   const [subcategoryIdState, setSubcategoryIdState] = useState("");
//   const [unitName, setUnitName] = useState("");
//   const [categoryName, setCategoryName] = useState("");
//   const [subcategoryName, setSubcategoryName] = useState("");


//   useEffect(() => {
//     if (material)
//     setImageValue(material.image || "");
//     setNameValue(material.name) || "";
//     setPrecioValue(material.precio || "");
//     setMonedaValue(material.moneda) || "";
//     setUnitValue(material.unit || "");
//     setCategoryValue(material.category || "");
//     setSubcategoryValue(material.subcategory || "");
//   }, [material]);

//   useEffect(() => {
//     fetch(`${API_URL}/unit/`)
//       .then((res) => res.json())
//       .then((data) => setUnits(data))
//       .catch((err) => console.error(err));

//     fetch(`${API_URL}/category/`)
//       .then((res) => res.json())
//       .then((data) => setCategories(data))
//       .catch((err) => console.error(err));

//     fetch(`${API_URL}/subcategory/`)
//       .then((res) => res.json())
//       .then((data) => setSubcategories(data))
//       .catch((err) => console.error(err));
//   }, []);

//   const handleCategoryChange = (e) => {
//     const selectedCategoryId = e.target.value;
//     const selectedCategory = categories.find(
//       (cat) => cat._id === selectedCategoryId
//     );
//     setCategoryIdState(selectedCategory ? selectedCategory._id : "");
//     setCategoryName(selectedCategory ? selectedCategory.category : "");
//     const filteredSubs = subcategories.filter(
//       (subcat) => subcat.category._id === selectedCategoryId
//     );
//     setFilteredSubcategories(filteredSubs);
//     setSubcategoryIdState("");
//     setSubcategoryName("");
//   };

//   const handleSubcategoryChange = (e) => {
//     const selectedSubcategoryId = e.target.value;
//     const selectedSubcategory = filteredSubcategories.find(
//       (subcat) => subcat._id === selectedSubcategoryId
//     );
//     setSubcategoryIdState(selectedSubcategory ? selectedSubcategory._id : "");
//     setSubcategoryName(
//       selectedSubcategory ? selectedSubcategory.subcategory : ""
//     );
//   };

//   const handleUnitChange = (e) => {
//     const selectedUnitId = e.target.value;
//     const selectedUnit = units.find((unit) => unit._id === selectedUnitId);
//     setUnitIdState(selectedUnit ? selectedUnit._id : "");
//     setUnitName(selectedUnit ? selectedUnit.unit : "");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData(formRef.current);
//       const image = formData.get("image");
//       const name = formData.get("name");
//       const precio = formData.get("precio");
//       const moneda = formData.get("moneda");
//       const unit = formData.get("unit");
//       const category = formData.get("category");
//       const subcategory = formData.get("subcategory");

//       const req = await fetch(`${API_URL}/material/${materialId}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: auth.token,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           image: imageValue,
//           name: nameValue,
//           precio: precioValue,
//           moneda: monedaValue,
//           unit :unitValue,
//           category: categoryValue,
//           subcategory: subcategoryValue,
//         }),
//       });

//       if (!req.ok) {
//         throw new Error("Error al actualizar el material");
//       }

//       formRef.current.reset();
//       handleClose();
//       await getMaterial();
//       navigate("/material");
//     } catch (error) {
//       console.error("Error al actualizar el material:", error);
//     }
//   };

//   const handleClose = () => {
//     onHide();
//   };

//   const handleModalClick = (e) => {
//     e.stopPropagation();
//   };

//   return (
//     <Modal
//       show={show}
//       onHide={handleClose}
//       onClick={handleModalClick}
//       className={styles.containerModalUpdate}
//       centered
//     >
//       <Modal.Header closeButton className={styles.ModalHeaderUpdate}>
//         <Modal.Title className={styles.modalTitleUpdate}>Material</Modal.Title>
//       </Modal.Header>
//       <Modal.Body className={styles.containerModalBodyUpdate}>
//         <div className={styles.modalBodyUpdate}>
//           <div className={styles.modalBodyTitleUpdate}>
//             <img
//               src="../../../public/img/actualizarRellenoCuadrado.png"
//               alt=""
//             />
//             <h2>Actualizar Material</h2>
//           </div>
//           <form ref={formRef} onSubmit={handleSubmit} className={styles.formUpdateMaterial}>
//             <div className={styles.formGroupImageUpdate}>
//               <label htmlFor={imageId}>Imagen: </label>
//               <input
//                 type="text"
//                 id={imageId}
//                 name="image"
//                 value={imageValue}
//                 onChange={(e) => setImageValue(e.target.value)}
//                 required
//               />
//             </div>
//             <div className={styles.formGroupNameUpdate}>
//               <label htmlFor={nameId}>Nombre: </label>
//               <input
//                 type="text"
//                 name="name"
//                 id={nameId}
//                 value={nameValue}
//                 onChange={(e) => setNameValue(e.target.value)}
//                 required
//               />
//             </div>
//             <div className={styles.formGroupPrecioUpdate}>
//               <label htmlFor={priceId}>Precio: </label>
//               <input
//                 type="number"
//                 id={priceId}
//                 name="precio"
//                 value={precioValue}
//                 onChange={(e) => setPrecioValue(e.target.value)}
//                 required
//               />
//             </div>
//             <div className={styles.formGroupMonedaUpdate}>
//               <label htmlFor={currencyId}>Moneda: </label>
//               <select
//                 id={currencyId}
//                 value={monedaValue}
//                 onChange={(e) => setMonedaValue(e.target.value)}
//               >
//                 <option value="">Seleccionar Moneda</option>
//                 <option value="USD">USD</option>
//                 <option value="EUR">EUR</option>
//                 <option value="ARS">ARS</option>
//               </select>
//             </div>
//             <div className={styles.formGroupUnidadUpdate}>
//               <label htmlFor={unitId}>Unidad: </label>
//               <div className={styles.containerSelect}>
//                 <select
//                   id={unitId}
//                   value={unitValue}
//                   onChange={handleUnitChange}
//                 >
//                   <option value="">Seleccionar Unidad</option>
//                   {units.map((unit) => (
//                     <option key={unit._id} value={unit._id}>
//                       {unit.unit}
//                     </option>
//                   ))}
//                 </select>
//                 <Link className={styles.buttonNew} to="/unit/new">
//                   Nueva
//                 </Link>
//               </div>
//             </div>
//             <div className={styles.formGroupCategoriaUpdate}>
//               <label htmlFor={categoryId}>Categoria:</label>
//               <div className={styles.containerSelect}>
//                 <select
//                   id={categoryId}
//                   value={categoryValue}
//                   onChange={handleCategoryChange}
//                 >
//                   <option value="">Seleccionar Categoria</option>
//                   {categories.map((category) => (
//                     <option key={category._id} value={category._id}>
//                       {category.category}
//                     </option>
//                   ))}
//                 </select>
//                 <Link className={styles.buttonNew} to="/category/new">
//                   Nueva
//                 </Link>
//               </div>
//             </div>
//             <div className={styles.formGroupSubcategoriaUpdate}>
//               <label htmlFor={subcategoryId}>Subcategoria:</label>
//               <div className={styles.containerSelect}>
//                 <select
//                   id={subcategoryId}
//                   value={subcategoryValue}
//                   onChange={handleSubcategoryChange}
//                 >
//                   <option value="">Seleccionar Subcategoria</option>
//                   {filteredSubcategories.map((subcategory) => (
//                     <option key={subcategory._id} value={subcategory._id}>
//                       {subcategory.subcategory}
//                     </option>
//                   ))}
//                 </select>
//                 <Link className={styles.buttonNew} to="/subcategorynew">
//                   Nueva
//                 </Link>
//               </div>
//             </div>

//             <div className={styles.containerButtons}>
//               <Button className={styles.buttonSubmit} type="submit">
//                 Actualizar
//               </Button>
//               <button className={styles.buttonBack} onClick={handleClose}>
//                 Volver
//               </button>
//             </div>
//           </form>
//         </div>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default UpdateMaterialModal;

