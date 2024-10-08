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
import { Table } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { useResponsive } from "../../providers/ResponsiveContext";

const getCurrentYearStartEnd = () => {
  const currentYear = new Date().getFullYear();
  const startOfYear = new Date(currentYear, 0, 1); // 1 de enero
  const endOfYear = new Date(currentYear, 11, 31); // 31 de diciembre
  return { startOfYear, endOfYear };
};

const InflationMPage = () => {
  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;
  console.log(containerClass);
  const {
    isMobile,
    isMobileLandscape,
    isTablet,
    isTabletHD,
    isDesktopHD,
    isDesktopFullHD,
  } = useResponsive();

  const colorAxis = isNightMode ? "#e0e0e0" : "rgb(128, 128, 128)";

  const pageSize = isMobile
    ? 3
    : isMobileLandscape
    ? 3
    : isTablet
    ? 3
    : isTabletHD
    ? 3
    : isDesktopHD
    ? 3
    : isDesktopFullHD
    ? 8
    : 4;

  const chartHeight = isMobile
    ? 280
    : isMobileLandscape
    ? 280
    : isTablet
    ? 280
    : isTabletHD
    ? 280
    : isDesktopHD
    ? 280
    : isDesktopFullHD
    ? 500
    : 400;

  const [isLoading, setIsLoading] = useState(true);
  const [inflacion, setInflacion] = useState([]);
  const [errorI, setErrorI] = useState(null);
  // Usa las fechas iniciales por defecto
  const { startOfYear, endOfYear } = useMemo(getCurrentYearStartEnd, []);
  const [startDate, setStartDate] = useState(startOfYear); // Fecha inicial por defecto
  const [endDate, setEndDate] = useState(endOfYear); // Fecha final por defecto

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

  const columns = [
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (text) => format(new Date(text), "dd/MM/yyyy"),
      align: "center",
    },
    {
      title: "Indice",
      dataIndex: "valor",
      key: "valor",
      render: (text) => `${text}%`,
      align: "center",
    },
  ];

  const dataSourceTable = filteredData.map((data, index) => ({
    key: index,
    fecha: data.fecha,
    valor: data.valor,
  }));

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
              Seleccione un rango de fechas distinto si quiere ver los datos
              anteriores de este lapso
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
                  className={` ${styles.smallDatepicker} ${containerClass} ${modeClass}`}
                  onChange={handleStartDateChange} // Usa la función optimizada
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#2a96ee",
                            borderWidth: "2px", // Ajusta el grosor aquí // Cambia a tu color deseado
                          },
                          "&:hover fieldset": {
                            borderColor: "#2a96ee",
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
                  className={` ${styles.smallDatepicker} ${containerClass} ${modeClass}`}
                  onChange={handleEndDateChange} // Usa la función optimizada
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#2a96ee",
                            borderWidth: "2px", // Ajusta el grosor aquí // Cambia a tu color deseado
                          },
                          "&:hover fieldset": {
                            borderColor: "#2a96ee",
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
            className={`${styles.containerChargingData} ${containerClass} ${modeClass}`}
          >
            <p>Cargando datos...</p>
          </div>
        ) : errorI ? (
          <div
            className={`${styles.containerNoData} ${containerClass} ${modeClass}`}
          >
            <p>Error al cargar los datos: {errorI}</p>
          </div>
        ) : filteredData.length === 0 ? (
          <p>No hay Datos en el rango seleccionado</p>
        ) : (
          <div
            className={`${styles.containerDataAndGraphic} ${containerClass} ${modeClass}`}
          >
            <div
              className={`${styles.containerDataTable} ${containerClass} ${modeClass}`}
            >
              <Table
                dataSource={dataSourceTable}
                columns={columns}
                pagination={{
                  pageSize: pageSize,
                  showSizeChanger: false, // Oculta el desplegable para seleccionar el tamaño de la página
                  showQuickJumper: false, // Opcional: oculta el salto rápido a páginas
                  showLessItems: true, // Muestra menos botones de paginación
                }}
                className={`${styles.tableData} ${containerClass} ${modeClass}`}
              />
            </div>
            <div
              className={`${styles.containerGraphic} ${containerClass} ${modeClass}`}
            >
              <ResponsiveContainer width="100%" height={chartHeight}>
                <LineChart
                  data={filteredData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="fecha"
                    tickFormatter={(date) =>
                      format(new Date(date), "dd/MM/yyyy")
                    }
                    label={{
                      value: "Fecha",
                      position: "insideBottom",
                      offset: -15,
                      fill: colorAxis,
                    }}
                    tick={{ fontSize: 12, fill: colorAxis }} // Cambia el tamaño del texto en el eje X
                    stroke={colorAxis}
                  />
                  <YAxis
                    label={{
                      value: "Índice",
                      angle: -90,
                      position: "insideLeft",
                      offset: 0,
                      fill: colorAxis,
                    }} // Título del eje Y
                    domain={[0, "dataMax + 10"]}
                    tick={{ fontSize: 12, fill: colorAxis }} // Cambia el tamaño del texto en el eje Y
                    tickCount={6}
                    stroke={colorAxis}
                  />
                  <Tooltip formatter={(value) => [`${value}%`, "Índice"]} />

                  <Line
                    type="monotone"
                    dataKey="valor"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default InflationMPage;
