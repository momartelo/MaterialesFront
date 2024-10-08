import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
} from "chart.js";
import "chartjs-adapter-date-fns";
import styles from "./MaterialDescription.module.css";
import useAppContext from "../../hooks/useAppContext";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  TimeScale,
  LinearScale,
  PointElement
);

const MaterialCharts = ({ historialPrecio }) => {
  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const labels = historialPrecio?.map((historia) =>
    new Date(historia.fecha).toLocaleDateString()
  );
  const preciosDolares = historialPrecio?.map(
    (historia) => historia.precioEnDolares
  );
  const preciosPesos = historialPrecio?.map(
    (historia) => historia.precioEnPesos
  );

  const commonDatasetConfig = {
    fill: false,
    tension: 0.1,
    pointRadius: 4,
  };

  const chartDataDollars = {
    labels,
    datasets: [
      {
        ...commonDatasetConfig,
        label: "Precio en USD",
        data: preciosDolares,
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const chartDataPesos = {
    labels,
    datasets: [
      {
        ...commonDatasetConfig,
        label: "Precio en ARS",
        data: preciosPesos,
        borderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  const chartOptions = useMemo(
    () => ({
      scales: {
        x: {
          type: "time",
          time: {
            parser: "dd/MM/yyyy",
            unit: "day",
            tooltipFormat: "dd/MM/yyyy",
          },
          title: {
            display: true,
            text: "Fecha",
            color: isNightMode ? "#999" : "#999",
          },
          grid: {
            color: isNightMode ? "#ddd" : "#ddd", // Color de la línea de la cuadrícula del eje X
          },
          ticks: {
            color: isNightMode ? "#999" : "#999", // Color del texto de las marcas (ticks) del eje X
          },
        },
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: "Precio",
            color: isNightMode ? "#999" : "#1e1e1e",
          },
          grid: {
            color: isNightMode ? "#ddd" : "#f5f5f5", // Color de la línea de la cuadrícula del eje X
          },
          ticks: {
            callback: function (value) {
              return value.toLocaleString("es-AR");
            },
            color: isNightMode ? "#999" : "#999", // Color del texto de las marcas (ticks) del eje X
          },
        },
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              const value = tooltipItem.raw.toLocaleString("es-AR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
              return `${tooltipItem.dataset.label}: ${value}`;
            },
          },
        },
      },
    }),
    []
  );

  return (
    <div
      className={`${styles.containerGraphics} ${containerClass} ${modeClass}`}
    >
      <div
        className={`${styles.containerGraphicDollar} ${containerClass} ${modeClass}`}
      >
        <p>Evolucion del precio en Dolares</p>
        <Line
          className={styles.graphicDollar}
          data={chartDataDollars}
          options={chartOptions}
        />
      </div>
      <div
        className={`${styles.containerGraphicPesos} ${containerClass} ${modeClass}`}
      >
        <p>Evolucion del precio en Pesos</p>
        <Line
          className={styles.graphicPesos}
          data={chartDataPesos}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default MaterialCharts;
