import styles from "./MaterialDescription.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useId, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCategoriesWithoutAuth } from "../../hooks/useCategoriesWithoutAuth";
import { useSubcategoriesWithoutAuth } from "../../hooks/useSubcategoriesWithoutAuth";
import { useUnitsWithoutAuth } from "../../hooks/useUnitsWithoutAuth";
import { useMaterialsWithoutAuth } from "../../hooks/useMaterialsWithoutAuth";
import MaterialDetails from "./MaterialDetails";
import HistorialPricesTable from "./HistorialPricesTable";
import MaterialCharts from "./MaterialCharts";

const MaterialDescription = () => {
  const modalId = useId();
  const { materialId } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const { materials, errorMat } = useMaterialsWithoutAuth();
  const { categories, errorCat } = useCategoriesWithoutAuth();
  const { subcategories, errorSub } = useSubcategoriesWithoutAuth();
  const { units, errorUnits } = useUnitsWithoutAuth();

  if (errorMat || errorCat || errorSub || errorUnits) {
    return <div>Error al cargar datos</div>;
  }

  if (
    materials.length === 0 ||
    categories.length === 0 ||
    subcategories.length === 0 ||
    units.length === 0
  ) {
    return <p>Cargando....</p>;
  }

  const material = materials.find((mat) => mat._id === materialId);
  if (!material) {
    return <p>No se encontró el material solicitado.</p>;
  }

  const handleBack = () => navigate(-1);
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };
  const handleCloseModal = (e) => {
    if (e) e.stopPropagation();
    setShowDeleteModal(false);
  };

  return (
    <>
      <Navbar />
      <div className={styles.containerMaterialDescription}>
        <div className={styles.containerMaterialFull}>
          <MaterialDetails
            material={material}
            category={categories.find((cat) => cat._id === material.category)}
            subcategory={subcategories.find(
              (sub) => sub._id === material.subcategory
            )}
            unit={units.find((u) => u._id === material.unit)}
            auth={auth}
            handleBack={handleBack}
            handleDeleteClick={handleDeleteClick}
            modalId={modalId}
            showDeleteModal={showDeleteModal}
            handleCloseModal={handleCloseModal}
          />
          <div className={styles.containerHistorialPrices}>
            <HistorialPricesTable historialPrecio={material.historialPrecio} />
          </div>
        </div>
        <div className={styles.containerGraphics}>
          <MaterialCharts historialPrecio={material.historialPrecio} />
        </div>
      </div>
    </>
  );
};

export default MaterialDescription;

// import styles from "./MaterialDescription.module.css";
// import Navbar from "../../components/Navbar/Navbar";
// import { AuthContext } from "../../providers/AuthProvider";
// import { useCallback, useContext, useEffect, useId, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// // import { fetchMaterialsWithoutAuth } from "../../functions/getMaterial";
// import { HiOutlineTrash } from "react-icons/hi";
// // import { fetchSubcategoriesWithoutAuth } from "../../functions/getSubcategory";
// // import { fetchUnitsWithoutAuth } from "../../functions/getUnit";
// import { Table } from "antd";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   LineController,
//   LineElement,
//   TimeScale,
//   LinearScale,
//   PointElement,
// } from "chart.js";
// import "chartjs-adapter-date-fns";
// import DeleteMaterialModal from "../../components/DeleteMaterialModal/DeleteMaterialModal";
// import { useCategoriesWithoutAuth } from "../../hooks/useCategoriesWithoutAuth";
// import { useSubcategoriesWithoutAuth } from "../../hooks/useSubcategoriesWithoutAuth";
// import { useUnitsWithoutAuth } from "../../hooks/useUnitsWithoutAuth";
// import { useMaterialsWithoutAuth } from "../../hooks/useMaterialsWithoutAuth";
// import { formatDollars, formatPesos } from "../../functions/formatCurrency";

// ChartJS.register(
//   Title,
//   Tooltip,
//   Legend,
//   LineController,
//   LineElement,
//   TimeScale,
//   LinearScale,
//   PointElement
// );

// const MaterialDescription = () => {
//   const modalId = useId();
//   const { materialId } = useParams();

//   const [loading, setLoading] = useState(true);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const { auth } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const { materials, loadingMat, minLoadingTimeElapsedMat, errorMat } =
//     useMaterialsWithoutAuth();

//   if (errorMat) {
//     return <div>Error al cargar materiales: {errorMat.message}</div>;
//   }

//   const { categories, loadingCat, minLoadingTimeElapsedCat, errorCat } =
//     useCategoriesWithoutAuth();

//   if (errorCat) {
//     return <div>Error al cargar categorías: {errorCat.message}</div>;
//   }

//   const { subcategories, loadingSub, minLoadingTimeElapsedSub, errorSub } =
//     useSubcategoriesWithoutAuth();

//   if (errorSub) {
//     return <div>Error al cargar subcategorías: {errorSub.message}</div>;
//   }

//   const { units, loadingUnits, minLoadingTimeElapsedUnits, errorUnits } =
//     useUnitsWithoutAuth();

//   if (errorUnits) {
//     return <div>Error al cargar unidades: {errorUnits.message}</div>;
//   }

//   if (
//     materials.length === 0 ||
//     categories.length === 0 ||
//     subcategories.length === 0 ||
//     units.length === 0
//   ) {
//     return <p>Cargando....</p>;
//   }

//   const material = materials.find((mat) => mat._id === materialId);
//   console.log(material);

//   const category = categories.find((cat) => cat._id === material.category);
//   console.log(category);

//   const subcategory = subcategories.find(
//     (sub) => sub._id === material.subcategory
//   );
//   console.log(subcategory);

//   const unit = units.find((u) => u._id === material.unit);
//   console.log(unit);

//   if (!material) {
//     return <p>No se encontró el material solicitado.</p>;
//   }

//   const dataSourceGraphics = material?.historialPrecio?.map(
//     (historia, index) => ({
//       key: index,
//       fecha: new Date(historia.fecha).toLocaleDateString(),
//       precioDolares: historia.precioEnDolares,
//       precioPesos: historia.precioEnPesos,
//     })
//   );

//   const dataSourceTable = material?.historialPrecio?.map((historia, index) => ({
//     key: index,
//     fecha: new Date(historia.fecha).toLocaleDateString(),
//     precioDolares: formatDollars(historia.precioEnDolares),
//     precioPesos: formatPesos(historia.precioEnPesos),
//   }));

//   const columns = [
//     {
//       title: "Fecha",
//       dataIndex: "fecha",
//     },
//     {
//       title: "Precio en USD",
//       dataIndex: "precioDolares",
//     },
//     {
//       title: "Precio en ARS",
//       dataIndex: "precioPesos",
//     },
//   ];

//   const chartDataDollars = {
//     labels: dataSourceGraphics.map((historia) => historia.fecha), // Fechas del historial
//     datasets: [
//       {
//         label: "Precio en USD",
//         data: dataSourceGraphics.map((historia) => historia.precioDolares), // Convertir a números
//         fill: false,
//         borderColor: "rgba(75, 192, 192, 1)",
//         tension: 0.1,
//         pointRadius: 4,
//       },
//     ],
//   };

//   const chartDataPesos = {
//     labels: dataSourceGraphics.map((historia) => historia.fecha), // Fechas del historial
//     datasets: [
//       {
//         label: "Precio en ARS",
//         data: dataSourceGraphics.map((historia) => historia.precioPesos), // Convertir a números
//         fill: false,
//         borderColor: "rgba(54, 162, 235, 1)",
//         tension: 0.1,
//         pointRadius: 4,
//       },
//     ],
//   };

//   const chartOptions = {
//     scales: {
//       x: {
//         type: "time",
//         time: {
//           parser: "dd/MM/yyyy",
//           unit: "day",
//           tooltipFormat: "dd/MM/yyyy",
//         },
//         title: {
//           display: true,
//           text: "Fecha",
//         },
//       },
//       y: {
//         beginAtZero: false,
//         title: {
//           display: true,
//           text: "Precio",
//         },
//         ticks: {
//           callback: function (value) {
//             // Formatear el valor con separador de miles y coma decimal
//             return value.toLocaleString("es-AR");
//           },
//         },
//       },
//     },
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem) {
//             // Asegurar que tooltipItem.raw sea un número
//             const value = parseFloat(tooltipItem.raw)
//               .toFixed(2)
//               .toLocaleString("es-AR");
//             return `${tooltipItem.dataset.label}: ${value}`;
//           },
//         },
//       },
//     },
//   };

//   const handleBack = () => {
//     navigate(-1); // Navegar hacia atrás
//   };

//   const handleDeleteClick = (e) => {
//     e.stopPropagation();
//     setShowDeleteModal(true); // Abrir el modal al hacer clic en el icono
//   };

//   const handleCloseModal = (e) => {
//     if (e) {
//       e.stopPropagation();
//     }
//     setShowDeleteModal(false); // Cerrar el modal de eliminar
//   };

//   return (
//     <>
//       <Navbar />
//       <div className={styles.containerMaterialDescription}>
//         <div className={styles.materialWrapper}>
//           <div className={styles.materialDetails}>
//             <h1>{material.name}</h1>
//             <div className={styles.containerCategory}>
//               <p>Categoria:&nbsp;</p>
//               <p>{category ? category.category : "No disponible"}</p>
//               <p>&nbsp;- Subcategoria:&nbsp;</p>
//               <p>{subcategory ? subcategory.subcategory : "No disponible"}</p>
//             </div>
//             <div className={styles.containerUnit}>
//               <p>Unidad:&nbsp;</p>
//               <p>{unit ? unit.unit : "No disponible"}</p>
//             </div>
//             <div className={styles.materialImageAndPrice}>
//               <div className={styles.materialImage}>
//                 <img src={material.image} alt="" />
//               </div>
//               <div className={styles.priceMaterialItem}>
//                 <p>Precio en Dolares</p>
//                 <span>{formatDollars(material.precioEnDolares)}</span>
//                 <hr className={styles.hr} />
//                 <p>Precio en Pesos</p>
//                 <span>{formatPesos(material.precioEnPesos)}</span>
//                 <hr className={styles.hr} />
//                 <div className={styles.containerSource}>
//                   <p>Fuente:&nbsp;</p>
//                   <p>{material.fuente}</p>
//                 </div>
//               </div>
//             </div>
//             {auth ? (
//               <div className={styles.containerButtons}>
//                 <Link
//                   className={styles.buttonEdit}
//                   to={`/material/update/${materialId}`}
//                 >
//                   Editar
//                 </Link>
//                 <button className={styles.buttonBack} onClick={handleBack}>
//                   Volver
//                 </button>
//                 <Link
//                   className={styles.buttonEraseDescription}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleDeleteClick(e);
//                   }}
//                 >
//                   <HiOutlineTrash />
//                 </Link>
//                 <DeleteMaterialModal
//                   show={showDeleteModal}
//                   onHide={handleCloseModal}
//                   getMaterial={async () => {
//                     await getMaterial();
//                     getCategory();
//                   }}
//                   modalId={modalId}
//                   materialId={material._id}
//                   nombre={material.name}
//                 />
//               </div>
//             ) : (
//               <div className={styles.containerButtons}>
//                 <button className={styles.buttonBack} onClick={handleBack}>
//                   Volver
//                 </button>
//               </div>
//             )}
//           </div>
//           <div className={styles.historialPrices}>
//             <h2>Historial de Precios</h2>
//             <Table
//               dataSource={dataSourceTable}
//               columns={columns}
//               pagination={{ pageSize: 3 }}
//               className={styles.tableData}
//             />
//           </div>
//         </div>
//         <div className={styles.containerGraphics}>
//           <div className={styles.containerGraphicDollar}>
//             <Line
//               className={styles.graphicDollar}
//               data={chartDataDollars}
//               options={chartOptions}
//             />
//           </div>
//           <div className={styles.containerGraphicPesos}>
//             <Line
//               className={styles.graphicPesos}
//               data={chartDataPesos}
//               options={chartOptions}
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MaterialDescription;
