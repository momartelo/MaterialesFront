import React, { useState } from "react";
import readXlsxFile from "read-excel-file";

const LecturaExcel = () => {
  const [data, setData] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [fileLoaded, setFileLoaded] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.error("No se seleccionó ningún archivo.");
      return;
    }

    readXlsxFile(file)
      .then((rows) => {
        console.log("Datos crudos del archivo:", rows); // Depuración: Ver datos crudos

        // Transformar los datos en un formato estructurado
        const structuredData = transformData(rows);
        console.log("Datos transformados:", structuredData); // Depuración: Ver datos transformados

        setData(structuredData); // Guardar los datos en el estado
        setJsonData(structuredData); // Guardar los datos en formato JSON
        setFileLoaded(true);

        // Crear y descargar el archivo JSON
        downloadJsonFile(structuredData);
      })
      .catch((error) => {
        console.error("Error al leer el archivo:", error);
      });
  };

  const handleReset = () => {
    setData([]);
    setJsonData([]);
    setFileLoaded(false);
  };

  // Función para transformar los datos del archivo
  const transformData = (rows) => {
    const structuredData = [];
    let fecha = "";
    let currentDate = ""; // Inicializar con una fecha predeterminada

    // Recorrer todas las filas del archivo
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      console.log(`Fila ${i}:`, row); // Depuración: Ver cada fila

      // Si la fila contiene la denominación "Materiales", actualizar la fecha
      if (row[3] === "Materiales" && row[1] instanceof Date) {
        currentDate = row[1].toISOString().split("T")[0]; // Formatear la fecha como YYYY-MM-DD
        console.log(`Fecha detectada en la fila ${i}: ${currentDate}`); // Depuración: Ver fecha detectada
      }

      if (currentDate) {
        fecha = currentDate;
        console.log(fecha); // "2011-01-01"

        // Extraer año, mes y día
        const [anio, mes, dia] = fecha.split("-");

        console.log(anio); // "2011"
        console.log(mes); // "01"
        console.log(dia); // "01"

        // Array con los nombres de los meses
        const meses = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ];

        // Convertir el número del mes a su nombre
        const nombreMes = meses[parseInt(mes) - 1]; // Restamos 1 porque los arrays empiezan en 0
        fecha = `${nombreMes} ${anio}`; // Formatear como "Mes Año"

        console.log(fecha); // "Enero 2011"
      }

      // Si la fila contiene datos de denominación, índice y variación
      if (row[3] && row[5] !== undefined && row[6] !== undefined) {
        const denominacion = row[3];
        const indice = row[5];
        const variacion = row[6];
        console.log(indice);
        console.log(typeof indice);
        // const indice = parseFloat(row[5].toString().replace(",", "."));
        // const variacion = parseFloat(row[6].toString().replace(",", "."));

        // Validar que los datos sean números válidos, incluyendo 0
        if (typeof indice === "number" && typeof variacion === "number") {
          // Si es una fila de "Materiales", asignar la fecha actual
          if (denominacion === "Materiales") {
            structuredData.push({
              periodo: fecha, // Usar la fecha de "Materiales"
              denominacion,
              indice,
              variacion,
            });
          } else {
            // Para filas que no son "Materiales", usar la última fecha de "Materiales"
            structuredData.push({
              //periodo: fecha, // Usar la última fecha de "Materiales"
              denominacion,
              indice,
              variacion,
            });
          }
          console.log(`Datos agregados:`, {
            periodo: fecha,
            denominacion,
            indice,
            variacion,
          }); // Depuración: Ver datos agregados
        }
      }
    }

    return structuredData;
  };

  // Función para crear y descargar un archivo JSON
  const downloadJsonFile = (json) => {
    const jsonString = JSON.stringify(json, null, 2); // Convertir el JSON a string con formato
    const blob = new Blob([jsonString], { type: "application/json" }); // Crear un Blob
    const url = URL.createObjectURL(blob); // Crear una URL para el Blob

    // Crear un enlace temporal para descargar el archivo
    const link = document.createElement("a");
    link.href = url;
    link.download = "datos.json"; // Nombre del archivo
    link.click(); // Simular clic en el enlace para iniciar la descarga

    // Liberar la URL del Blob
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      {/* Mostrar el título y el input solo si no hay archivo cargado */}
      {!fileLoaded && (
        <>
          <h1>Cargar y leer archivo Excel (.xlsx)</h1>
          <input type="file" accept=".xlsx" onChange={handleFileUpload} />
        </>
      )}

      {/* Mostrar la tabla y el botón de reset si hay archivo cargado */}
      {fileLoaded && (
        <>
          <button onClick={handleReset}>Reset</button>
          <table border="1">
            <thead>
              <tr>
                <th>PERÍODO</th>
                <th>DENOMINACIÓN</th>
                <th>ÍNDICE</th>
                <th>VARIACIÓN (%)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.periodo}</td>
                  <td>{row.denominacion}</td>
                  <td>{row.indice.toFixed(2)}</td>
                  <td>{row.variacion.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default LecturaExcel;

// import React, { useState } from "react";
// import readXlsxFile from "read-excel-file";

// const LecturaExcel = () => {
//   const [data, setData] = useState([]);
//   const [jsonData, setJsonData] = useState([]);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];

//     if (!file) {
//       console.error("No se seleccionó ningún archivo.");
//       return;
//     }

//     readXlsxFile(file)
//       .then((rows) => {
//         console.log("Datos crudos del archivo:", rows); // Depuración: Ver datos crudos

//         // Transformar los datos en un formato estructurado
//         const structuredData = transformData(rows);
//         console.log("Datos transformados:", structuredData); // Depuración: Ver datos transformados

//         setData(structuredData); // Guardar los datos en el estado
//         setJsonData(structuredData); // Guardar los datos en formato JSON

//         // Crear y descargar el archivo JSON
//         downloadJsonFile(structuredData);
//       })
//       .catch((error) => {
//         console.error("Error al leer el archivo:", error);
//       });
//   };

//   // Función para transformar los datos del archivo
//   const transformData = (rows) => {
//     const structuredData = [];
//     let fecha = "";
//     let currentDate = ""; // Inicializar con una fecha predeterminada

//     // Recorrer todas las filas del archivo
//     for (let i = 0; i < rows.length; i++) {
//       const row = rows[i];
//       console.log(`Fila ${i}:`, row); // Depuración: Ver cada fila

//       // Si la fila contiene la denominación "Materiales", actualizar la fecha
//       if (row[3] === "Materiales" && row[1] instanceof Date) {
//         currentDate = row[1].toISOString().split("T")[0]; // Formatear la fecha como YYYY-MM-DD
//         console.log(`Fecha detectada en la fila ${i}: ${currentDate}`); // Depuración: Ver fecha detectada
//       }

//       if (currentDate) {
//         fecha = currentDate;
//         console.log(fecha); // "2011-01-01"

//         // Extraer año, mes y día
//         const [anio, mes, dia] = fecha.split("-");

//         console.log(anio); // "2011"
//         console.log(mes); // "01"
//         console.log(dia); // "01"

//         // Array con los nombres de los meses
//         const meses = [
//           "Enero",
//           "Febrero",
//           "Marzo",
//           "Abril",
//           "Mayo",
//           "Junio",
//           "Julio",
//           "Agosto",
//           "Septiembre",
//           "Octubre",
//           "Noviembre",
//           "Diciembre",
//         ];

//         // Convertir el número del mes a su nombre
//         const nombreMes = meses[parseInt(mes) - 1]; // Restamos 1 porque los arrays empiezan en 0
//         fecha = `${nombreMes} ${anio}`; // Formatear como "Mes Año"

//         console.log(fecha); // "Enero 2011"
//       }

//       // Si la fila contiene datos de denominación, índice y variación
//       if (row[3] && row[5] !== undefined && row[6] !== undefined) {
//         const denominacion = row[3];
//         const indice = parseFloat(row[5].toString().replace(",", "."));
//         const variacion = parseFloat(row[6].toString().replace(",", "."));

//         // Validar que los datos sean números válidos, incluyendo 0
//         if (typeof indice === "number" && typeof variacion === "number") {
//           // Si es una fila de "Materiales", asignar la fecha actual
//           if (denominacion === "Materiales") {
//             structuredData.push({
//               periodo: fecha, // Usar la fecha de "Materiales"
//               denominacion,
//               indice,
//               variacion,
//             });
//           } else {
//             // Para filas que no son "Materiales", usar la última fecha de "Materiales"
//             structuredData.push({
//               //periodo: fecha, // Usar la última fecha de "Materiales"
//               denominacion,
//               indice,
//               variacion,
//             });
//           }
//           console.log(`Datos agregados:`, {
//             periodo: fecha,
//             denominacion,
//             indice,
//             variacion,
//           }); // Depuración: Ver datos agregados
//         }
//       }
//     }

//     return structuredData;
//   };

//   // Función para crear y descargar un archivo JSON
//   const downloadJsonFile = (json) => {
//     const jsonString = JSON.stringify(json, null, 2); // Convertir el JSON a string con formato
//     const blob = new Blob([jsonString], { type: "application/json" }); // Crear un Blob
//     const url = URL.createObjectURL(blob); // Crear una URL para el Blob

//     // Crear un enlace temporal para descargar el archivo
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "datos.json"; // Nombre del archivo
//     link.click(); // Simular clic en el enlace para iniciar la descarga

//     // Liberar la URL del Blob
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div>
//       <h1>Cargar y leer archivo Excel (.xlsx)</h1>
//       <input type="file" accept=".xlsx" onChange={handleFileUpload} />

//       {data.length > 0 && (
//         <table border="1">
//           <thead>
//             <tr>
//               <th>PERÍODO</th>
//               <th>DENOMINACIÓN</th>
//               <th>ÍNDICE</th>
//               <th>VARIACIÓN (%)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, index) => (
//               <tr key={index}>
//                 <td>{row.periodo}</td>
//                 <td>{row.denominacion}</td>
//                 <td>{row.indice.toFixed(2)}</td>
//                 <td>{row.variacion.toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default LecturaExcel;
