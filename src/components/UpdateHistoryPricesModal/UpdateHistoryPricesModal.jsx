import styles from "./UpdateHistoryPricesModal.module.css";
import { useEffect, useState } from "react";
import { useTheme } from "../../providers/ThemeProvider";
import { useResponsive } from "../../providers/ResponsiveContext";

const UpdateHistoryPricesModal = ({ show, onHide, priceEntry, onSave }) => {
  const { isNightMode } = useTheme();
  const {
    isDesktopHD,
    isDesktopFullHD,
    isTabletHD,
    isTablet,
    isMobile,
    isMobileLandscape,
  } = useResponsive();

  const getContainerClass = () => {
    if (isDesktopFullHD) return styles.fullHD;
    if (isDesktopHD) return styles.hd;
    if (isTabletHD) return styles.tabletHD;
    if (isTablet) return styles.tablet;
    if (isMobileLandscape) return styles.mobileLandscape;
    if (isMobile) return styles.mobile;
    return "";
  };

  const containerClass = getContainerClass();
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;
  const [price, setPrice] = useState(priceEntry?.precio ?? "");
  const [currency, setCurrency] = useState(priceEntry?.moneda ?? "ARS");
  const [date, setDate] = useState(() => {
    const parsedDate = new Date(priceEntry?.fecha);
    return !isNaN(parsedDate.getTime())
      ? parsedDate.toISOString().substring(0, 10)
      : "";
  });

  console.log("Initial State:", { price, currency, date });

  useEffect(() => {
    if (priceEntry) {
      setPrice(priceEntry.precio ?? "");
      setCurrency(priceEntry.moneda ?? "ARS");
      const parsedDate = new Date(priceEntry.fecha);
      setDate(
        !isNaN(parsedDate.getTime())
          ? parsedDate.toISOString().substring(0, 10)
          : ""
      );
    }
  }, [priceEntry]);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const [year, month, day] = date.split('-'); // Asegúrate de que la fecha está en el formato YYYY-MM-DD
  //     const newDate = new Date(Date.UTC(year, month - 1, day)); // Usa UTC para evitar problemas de zona horaria
  //     if (isNaN(newDate.getTime())) {
  //         alert("Por favor, introduce una fecha válida.");
  //         return;
  //     }
  //     onSave({ ...priceEntry, precio: price, moneda: currency, fecha: newDate });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new date object from the input date
    const newDate = new Date(date + "T00:00:00");
    if (isNaN(newDate.getTime())) {
      alert("Por favor, introduce una fecha válida.");
      return; // Optionally handle the error (e.g., show a message to the user)
    }
    onSave({ ...priceEntry, precio: price, moneda: currency, fecha: newDate });
  };

  if (!show) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        {" "}
        {/* Asegúrate de usar un contenedor para el contenido */}
        <form
          className={`${styles.form} ${containerClass} ${modeClass}`}
          onSubmit={handleSubmit}
        >
          <div className={`${styles.formPrice} ${containerClass} ${modeClass}`}>
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              value={price || ""}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div
            className={`${styles.formCurrency} ${containerClass} ${modeClass}`}
          >
            <label htmlFor="currency">Moneda:</label>
            <select
              value={currency}
              id="currency"
              onChange={(e) => setCurrency(e.target.value)}
              required
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="ARS">ARS</option>
            </select>
          </div>
          <div className={`${styles.formDate} ${containerClass} ${modeClass}`}>
            <label htmlFor="date">Fecha:</label>
            <input
              type="date"
              id="date"
              value={date || ""}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div
            className={`${styles.formButtons} ${containerClass} ${modeClass}`}
          >
            <button
              className={`${styles.buttonSubmit} ${containerClass} ${modeClass}`}
              type="submit"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onHide}
              className={`${styles.buttonBack} ${containerClass} ${modeClass}`}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateHistoryPricesModal;

// import styles from "./UpdateHistoryPricesModal.module.css";
// import { useContext, useEffect, useRef, useState } from "react";
// import { API_URL } from "../../utils/consts";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../providers/AuthProvider";
// import { Modal } from "react-bootstrap";
// import Button from "react-bootstrap/Button";

// const UpdateHistoryPricesModal = ({
//   show,
//   materialId,
//   onUpdateHistoryPrices,
//   onHide,
//   material,
// }) => {
//   const [historyPrices, setHistoryPrices] = useState([]);

//   useEffect(() => {
//     if (material) {
//       const updatedHistoryPrices = material.historialPrecio.map((price) => {
//         const fecha = price.fecha ? price.fecha : null;
//         return {
//           ...price,
//           fecha: fecha ? fecha.split("T")[0] : "", // Formatear fecha
//         };
//       });
//       setHistoryPrices(updatedHistoryPrices); // Inicializa el historial al abrir la modal
//     }
//   }, [material]);

//   const handleInputChange = (index, field, value) => {
//     setHistoryPrices((prevPrices) => {
//       const updatedPrices = [...prevPrices];
//       updatedPrices[index] = {
//         ...updatedPrices[index],
//         [field]: field === "precio" ? parseFloat(value) : value,
//       };
//       return updatedPrices;
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Al enviar, devuelve el historial actualizado
//     onUpdateHistoryPrices(historyPrices); // Asegúrate de que el historial completo se envíe
//     onHide(); // Cerrar modal después de guardar
//   };

//   return (
//     <Modal show={show} onHide={onHide} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Editar Historial de Precios</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <form onSubmit={handleSubmit}>
//           {historyPrices.map((price, index) => (
//             <div key={index}>
//               <label>Precio:</label>
//               <input
//                 type="number"
//                 value={price.precio}
//                 onChange={(e) =>
//                   handleInputChange(index, "precio", e.target.value)
//                 }
//               />
//               <label>Fecha:</label>
//               <input
//                 type="date"
//                 value={price.fecha}
//                 onChange={(e) =>
//                   handleInputChange(index, "fecha", e.target.value)
//                 }
//               />
//               <label>Moneda:</label>
//               <input
//                 type="text"
//                 value={price.moneda}
//                 onChange={(e) =>
//                   handleInputChange(index, "moneda", e.target.value)
//                 }
//               />
//             </div>
//           ))}
//           <Button type="submit">Guardar Cambios</Button>
//           <Button type="button" onClick={onHide}>
//             Cancelar
//           </Button>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default UpdateHistoryPricesModal;

// import styles from "./UpdateHistoryPricesModal.module.css";
// import { useContext, useEffect, useRef, useState } from "react";
// import { API_URL } from "../../utils/consts";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../providers/AuthProvider";
// import { Modal } from "react-bootstrap";
// import Button from "react-bootstrap/Button";

// const UpdateHistoryPricesModal = ({
//   show,
//   materialId,
//   onUpdateHistoryPrices,
//   onHide,
//   material,
// }) => {
//   const [categories, setCategories] = useState([]);
//   const [historyPrices, setHistoryPrices] = useState([]);
//   const formRef = useRef(null);

//   useEffect(() => {
//     if (material) {
//       const updatedHistoryPrices = material.historialPrecio.map((price) => {
//         const fecha = price.fecha ? price.fecha : null;
//         console.log(fecha);
//         return {
//           ...price,
//           fecha: fecha ? fecha.split("T")[0] : "",
//         };
//       });
//       setHistoryPrices(updatedHistoryPrices);
//       console.log(updatedHistoryPrices);
//     }
//   }, [material]);

//   const handleClose = (e) => {
//     if (e) {
//       e.stopPropagation();
//     }
//     onHide();
//   };

//   const handleModalClick = (e) => {
//     e.stopPropagation();
//   };

//   const handleInputChange = (index, field, value) => {
//     setHistoryPrices((prevPrices) => {
//       const updatedPrices = [...prevPrices];
//       updatedPrices[index] = {
//         ...updatedPrices[index],
//         [field]: field === "precio" ? parseFloat(value) : value,
//       };
//       return updatedPrices;
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedMaterial = {
//       historialPrecio: historyPrices.map((price) => ({
//         precio: price.precio,
//         fecha: price.fecha,
//         moneda: price.moneda,
//       })),
//     };

//     try {
//       // Puedes aquí hacer un fetch para guardar el historial si es necesario,
//       // pero lo que realmente quieres hacer es actualizar el estado en el componente padre
//       onUpdateHistoryPrices(updatedMaterial.historialPrecio);
//       handleClose();
//     } catch (error) {
//       console.error("Error al guardar cambios:", error);
//     }
//   };

//   return (
//     <Modal show={show} onHide={handleClose} onClick={handleModalClick} centered>
//       <Modal.Header className={styles.modalHeaderTitle} closeButton>
//         <Modal.Title className={styles.modalTitleHistory}>
//           Editar Historial de Precios
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <form
//           ref={formRef}
//           onSubmit={handleSubmit}
//           className={styles.formUpdateHistory}
//         >
//           {historyPrices.map((price, index) => (
//             <div key={index} className={styles.priceEntry}>
//               <div className={styles.divHistoryPrice}>
//                 <label htmlFor={`precio-${index}`}>Precio:</label>
//                 <input
//                   type="number"
//                   name="precio"
//                   value={price.precio}
//                   onChange={(e) =>
//                     handleInputChange(index, "precio", e.target.value)
//                   }
//                 />
//               </div>
//               <div className={styles.divHistoryDate}>
//                 <label htmlFor={`fecha-${index}`}>Fecha:</label>
//                 <input
//                   type="date"
//                   name="fecha"
//                   value={price.fecha}
//                   onChange={(e) =>
//                     handleInputChange(index, "fecha", e.target.value)
//                   }
//                 />
//               </div>
//               <div className={styles.divHistoryCurrency}>
//                 <label htmlFor={`moneda-${index}`}>Moneda:</label>
//                 <input
//                   type="text"
//                   name="moneda"
//                   value={price.moneda}
//                   onChange={(e) =>
//                     handleInputChange(index, "moneda", e.target.value)
//                   }
//                 />
//               </div>
//             </div>
//           ))}
//           <div className={styles.containerButtons}>
//             <Button type="submit" className={styles.buttonSubmit}>
//               Guardar Cambios
//             </Button>
//             <Button
//               type="button"
//               className={styles.buttonBack}
//               onClick={handleClose}
//             >
//               Cancelar
//             </Button>
//           </div>
//         </form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default UpdateHistoryPricesModal;
