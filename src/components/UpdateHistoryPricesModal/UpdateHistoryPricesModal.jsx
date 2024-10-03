import styles from "./UpdateHistoryPricesModal.module.css";
import { useEffect, useState } from "react";
import useAppContext from "../../hooks/useAppContext";

const UpdateHistoryPricesModal = ({ show, onHide, priceEntry, onSave }) => {
  const { isNightMode, containerClass } = useAppContext(styles);
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
