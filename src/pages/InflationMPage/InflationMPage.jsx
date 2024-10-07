import { useCallback, useEffect, useMemo, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField"; // Importa TextField
import { getInflationData } from "../../functions/fetchs";
import useAppContext from "../../hooks/useAppContext";
import styles from "./InflationMPage.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { format } from "date-fns";

const InflationMPage = () => {
  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const [isLoading, setIsLoading] = useState(true);
  const [inflacion, setInflacion] = useState([]);
  const [errorI, setErrorI] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = useCallback((newValue) => {
    setStartDate(newValue);
  }, []);

  const handleEndDateChange = useCallback((newValue) => {
    setEndDate(newValue);
  }, []);

  useEffect(() => {
    const fetchInflacionData = async () => {
      try {
        const data = await getInflationData();
        setInflacion(data.data);
      } catch (error) {
        setErrorI(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInflacionData();
  }, []);

  const filterByDate = (data) => {
    if (!startDate && !endDate) return data;
    return data.filter((item) => {
      const itemDate = new Date(item.fecha);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      return (!start || itemDate >= start) && (!end || itemDate <= end);
    });
  };

  const filteredData = useMemo(
    () => filterByDate(inflacion),
    [inflacion, startDate, endDate]
  );

  return (
    <>
      <Navbar />
      <div
        className={`${styles.containerInflationM} ${containerClass} ${modeClass}`}
      >
        <div
          className={`${styles.containerTitle} ${containerClass} ${modeClass}`}
        >
          <h1>Inflacion Mensual</h1>
        </div>
        <div
          className={`${styles.containerDatesSearch} ${containerClass} ${modeClass}`}
        >
          {" "}
          <div>
            <p>
              Seleccione un rango de fechas si quiere ver los datos de ese lapso
            </p>
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div
                className={`${styles.containerDatePickers} ${containerClass} ${modeClass}`}
              >
                <DatePicker
                  label="Fecha Inicial"
                  value={startDate}
                  onChange={handleStartDateChange} // Usa la función optimizada
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#198754",
                            borderWidth: "2px", // Ajusta el grosor aquí // Cambia a tu color deseado
                          },
                          "&:hover fieldset": {
                            borderColor: "#198754",
                            borderWidth: "1px", // Ajusta el grosor aquí // Cambia el color al pasar el mouse
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#0d6efd",
                            borderWidth: "2px", // Ajusta el grosor aquí // Cambia el color cuando está enfocado
                          },
                        },
                      }}
                    />
                  )}
                />
                <DatePicker
                  label="Fecha Final"
                  value={endDate}
                  onChange={handleEndDateChange} // Usa la función optimizada
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#198754",
                            borderWidth: "2px", // Ajusta el grosor aquí // Cambia a tu color deseado
                          },
                          "&:hover fieldset": {
                            borderColor: "#198754",
                            borderWidth: "1px", // Ajusta el grosor aquí // Cambia el color al pasar el mouse
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#0d6efd",
                            borderWidth: "2px", // Ajusta el grosor aquí // Cambia el color cuando está enfocado
                          },
                        },
                      }}
                    />
                  )}
                />
              </div>
            </LocalizationProvider>
          </div>
        </div>
        {isLoading ? (
          <div
            className={`${styles.containerNoData} ${containerClass} ${modeClass}`}
          >
            <p>Cargando datos...</p>
          </div>
        ) : errorI ? (
          <p>Error al cargar los datos: {errorI}</p>
        ) : filteredData.length === 0 ? (
          <p>No hay Datos en el rango seleccionado</p>
        ) : (
          <div
            className={`${styles.containerData} ${containerClass} ${modeClass}`}
          >
            {filteredData.map((data, index) => {
              const formattedDate = format(new Date(data.fecha), "dd/MM/yyyy"); // Formatea la fecha

              return (
                <div
                  key={`${data.fecha}-${index}`}
                  className={`${styles.containerDataInflation} ${containerClass} ${modeClass}`}
                >
                  <span>{formattedDate}</span>{" "}
                  {/* Muestra la fecha formateada */}
                  <span>Índice: {data.valor}%</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default InflationMPage;
