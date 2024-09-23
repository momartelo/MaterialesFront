import React from "react";
import { Table } from "antd";
import { formatDollars, formatPesos } from "../../functions/formatCurrency";
import styles from "./MaterialDescription.module.css";
import { useResponsive } from "../../providers/ResponsiveContext";
import { useTheme } from "../../providers/ThemeProvider";

const HistorialPricesTable = ({ historialPrecio }) => {
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

  const dataSourceTable = historialPrecio?.map((historia, index) => ({
    key: index,
    fecha: new Date(historia.fecha).toLocaleDateString(),
    precioDolares: formatDollars(historia.precioEnDolares),
    precioPesos: formatPesos(historia.precioEnPesos),
  }));

  const columns = [
    { title: "Fecha", dataIndex: "fecha" },
    { title: "Precio en USD", dataIndex: "precioDolares" },
    { title: "Precio en ARS", dataIndex: "precioPesos" },
  ];

  return (
    <>
      <div
        className={`${styles.historialPrices} ${containerClass} ${modeClass}`}
      >
        <h2>Historial de Precios</h2>
        <Table
          dataSource={dataSourceTable}
          columns={columns}
          pagination={{ pageSize: 4 }}
          className={`${styles.tableData} ${containerClass} ${modeClass}`}
        />
      </div>
    </>
  );
};

export default HistorialPricesTable;
