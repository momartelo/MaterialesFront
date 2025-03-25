import styles from "./InflationIPage.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
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
import esLocale from "date-fns/locale/es";
import { getInflationAnualData } from "../../functions/fetchs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";

const getCurrentYearStartEnd = () => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate);
  startOfYear.setFullYear(currentDate.getFullYear() - 1);
  const endOfYear = new Date(currentDate);
  return { startOfYear, endOfYear };
};

const InflationIPage = () => {
  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;
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
  const { startOfYear, endOfYear } = useMemo(getCurrentYearStartEnd, []);
  const [startDate, setStartDate] = useState(startOfYear);
  const [endDate, setEndDate] = useState(endOfYear);

  const handleStartDateChange = useCallback((newValue) => {
    setStartDate(newValue);
  }, []);

  const handleEndDateChange = useCallback((newValue) => {
    setEndDate(newValue);
  }, []);

  useEffect(() => {
    const fetchInflacionAnualData = async () => {
      try {
        const data = await getInflationAnualData();
        setInflacion(data.data);
      } catch (error) {
        setErrorI(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInflacionAnualData();
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
        className={`${styles.containerInflationI} ${containerClass} ${modeClass}`}
      >
        <div
          className={`${styles.containerTitle} ${containerClass} ${modeClass}`}
        >
          <h1>Inflacion Interanual</h1>
        </div>
        <div
          className={`${styles.containerDatesSearch} ${containerClass} ${modeClass}`}
        >
          {" "}
          <div>
            <p>
              Seleccione el rengo de fechas para ver los indices de los meses
              deseados
            </p>
          </div>
          <div>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={esLocale}
            >
              <div
                className={`${styles.containerDatePickers} ${containerClass} ${modeClass}`}
              >
                <DatePicker
                  label="Fecha Inicial"
                  value={startDate}
                  inputFormat="dd/MM/yyyy"
                  className={`${styles.smallDatepicker} ${containerClass} ${modeClass}`}
                  onChange={handleStartDateChange}
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
                  inputFormat="dd/MM/yyyy"
                  className={`${styles.smallDatepicker} ${containerClass} ${modeClass}`}
                  onChange={handleEndDateChange}
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
            <p>Cargando datos....</p>
          </div>
        ) : errorI ? (
          <div
            className={`${styles.containerNoData} ${containerClass} ${modeClass}`}
          >
            <p>Error al cargar los datos: {errorI}</p>
          </div>
        ) : filteredData.lenght === 0 ? (
          <div
            className={`${styles.containerNoDataInRange} ${containerClass} ${modeClass}`}
          >
            <img src="/img/sin-datos.png" alt="" />
            <p>¡No hay datos en el rango seleccionado</p>
          </div>
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
                  showSizeChanger: false,
                  showQuickJumper: false,
                  showLessItems: true,
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
                    tick={{ fontSize: 12, fill: colorAxis }}
                    stroke={colorAxis}
                  />
                  <YAxis
                    label={{
                      value: "Indice",
                      angle: -90,
                      position: "insideLeft",
                      offset: 15,
                      fill: colorAxis,
                    }}
                    domain={[0, "dataMax + 10"]}
                    tick={{ fontSize: 12, fill: colorAxis }}
                    tickCount={6}
                    stroke={colorAxis}
                  />
                  <Tooltip formatter={(value) => [`${value}%`, "Indice"]} />
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

export default InflationIPage;
