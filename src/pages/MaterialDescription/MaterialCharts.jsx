import React from "react";
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
  const dataSourceGraphics = historialPrecio?.map((historia, index) => ({
    key: index,
    fecha: new Date(historia.fecha).toLocaleDateString(),
    precioDolares: historia.precioEnDolares,
    precioPesos: historia.precioEnPesos,
  }));

  const chartDataDollars = {
    labels: dataSourceGraphics.map((historia) => historia.fecha),
    datasets: [
      {
        label: "Precio en USD",
        data: dataSourceGraphics.map((historia) => historia.precioDolares),
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
        pointRadius: 4,
      },
    ],
  };

  const chartDataPesos = {
    labels: dataSourceGraphics.map((historia) => historia.fecha),
    datasets: [
      {
        label: "Precio en ARS",
        data: dataSourceGraphics.map((historia) => historia.precioPesos),
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        tension: 0.1,
        pointRadius: 4,
      },
    ],
  };

  const chartOptions = {
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
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: "Precio",
        },
        ticks: {
          callback: function (value) {
            return value.toLocaleString("es-AR");
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = parseFloat(tooltipItem.raw)
              .toFixed(2)
              .toLocaleString("es-AR");
            return `${tooltipItem.dataset.label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className={styles.containerGraphics}>
      <div className={styles.containerGraphicDollar}>
        <Line
          className={styles.graphicDollar}
          data={chartDataDollars}
          options={chartOptions}
        />
      </div>
      <div className={styles.containerGraphicPesos}>
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
