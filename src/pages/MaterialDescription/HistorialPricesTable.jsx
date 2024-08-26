import React from "react";
import { Table } from "antd";
import { formatDollars, formatPesos } from "../../functions/formatCurrency";
import styles from "./MaterialDescription.module.css";

const HistorialPricesTable = ({ historialPrecio }) => {
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
      <div className={styles.historialPrices}>
        <h2>Historial de Precios</h2>
        <Table
          dataSource={dataSourceTable}
          columns={columns}
          pagination={{ pageSize: 3 }}
          className={styles.tableData}
        />
      </div>
    </>
  );
};

export default HistorialPricesTable;
