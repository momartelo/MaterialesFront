import { useState, useEffect, useContext, useId } from "react";
import MaterialItem from "../MaterialItem/MaterialItem";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styles from "./Material.module.css";
import MaterialItem2 from "../MaterialItem2/MaterialItem2";
import { AuthContext } from "../../providers/AuthProvider";
import Select from "react-select";

const Material = ({ materials, getMaterial }) => {
  const sortId = useId();
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [filterMaterials, setFilterMaterials] = useState(materials);
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    let filtered = materials.filter((mat) => {
      return mat.name.toLowerCase().includes(search.toLowerCase());
    });

    if (sort) {
      filtered = filtered.slice().sort((a, b) => {
        if (sort === "precioEnPesos") {
          return (a[sort] || 0) - (b[sort] || 0);
        }
        return (a[sort] || "").localeCompare(b[sort] || "");
      });
    }

    console.log(filtered);
    setFilterMaterials(filtered);
  }, [search, sort, materials]);

  const sortOptions = [
    { value: "", label: "Ordenar por:" },
    { value: "name", label: "Nombre" },
    { value: "precioEnPesos", label: "Precio" },
    { value: "category", label: "Categoria" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "200px", // Ancho fijo para el control
      borderRadius: "5px",
      borderColor: "none",
      // boxShadow: state.isFocused ? "0 0 0 1px blue" : "none",
      // "&:hover": {
      //   borderColor: "blue",
      // },
      backgroundColor: "red", // Fondo rojo para el control
      color: "white", // Color del texto del control
      cursor: "pointer",
      boxShadow: state.isFocused ? "none" : provided.boxShadow, // Elimina la sombra solo cuando está enfocado
      border: state.isFocused ? "none" : provided.border, //
    }),
    menu: (provided) => ({
      ...provided,
      width: "200px", // Ancho fijo para el menú
      borderRadius: "10px",
      marginTop: 0,
      backgroundColor: "red", // Fondo rojo para el menú desplegable
      boxShadow: "none", // Elimina la sombra al desplegar
      border: "none", // Elimina el borde al desplegar
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "darkred" : "red",
      color: state.isSelected ? "white" : "white", // Color del texto de las opciones
      "&:hover": {
        backgroundColor: "lightblue",
        color: "black", // Color del texto cuando está enfocado
      },
      cursor: "pointer",
      borderRadius: "5px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white", // Color del texto seleccionado
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "white", // Color del texto del placeholder
    }),
  };

  const customTheme = (theme) => ({
    ...theme,
    borderRadius: 10,
    colors: {
      ...theme.colors,
      primary25: "lightcoral", // Color para las opciones cuando están seleccionadas
      primary: "darkred", // Color primario para el control
      neutral0: "red", // Fondo rojo para el control
      neutral80: "white", // Color del texto en el menú (normal)
      neutral90: "white", // Color del texto en el menú (enfocado)
      neutral20: "white", // Color del texto seleccionado
    },
  });

  return (
    <div className={styles.containerMaterial}>
      {auth ? (
        <div className={styles.subcontainerMaterial}>
          <Link to="/material/new" className={styles.btnSuccess}>
            Material Nuevo
          </Link>

          <div className={styles.searchContainer}>
            <input
              type="search"
              className={styles.formControl}
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className={styles.searchIcon} />
          </div>
          <div className={styles.containerSort}>
            <div className={styles.selectWrapper}>
              <Select
                id={sortId}
                value={sortOptions.find((option) => option.value === sort)}
                onChange={(selectedOption) => setSort(selectedOption.value)}
                options={sortOptions}
                styles={customStyles}
                theme={customTheme}
                className="customSelect"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.subcontainerMaterial}></div>
      )}
      {filterMaterials.length >= 1 ? (
        <div className={styles.containerItem}>
          {filterMaterials.map((material) => (
            <MaterialItem2
              getMaterial={getMaterial}
              key={material._id}
              material={material}
              onClick={() => navigate(`/material/${material._id}`)}
            />
          ))}
        </div>
      ) : (
        <div className={styles.containerNoShow}>
          <img src="../../../public/img/archivo.png" alt="" />
          <p>¡No hay Materiales que mostrar!!!</p>
          <img src="../../../public/img/archivo.png" alt="" />
        </div>
      )}
    </div>
  );
};

export default Material;

// import { useState, useEffect, useContext, useId } from "react";
// import MaterialItem from "../MaterialItem/MaterialItem";
// import { Link, useNavigate } from "react-router-dom";
// import { FaSearch } from "react-icons/fa";
// import styles from "./Material.module.css";
// import MaterialItem2 from "../MaterialItem2/MaterialItem2";
// import { AuthContext } from "../../providers/AuthProvider";

// const Material = ({ materials, getMaterial }) => {
//   const sortId = useId();
//   const [sort, setSort] = useState("");
//   const [search, setSearch] = useState("");
//   const [filterMaterials, setFilterMaterials] = useState(materials);
//   const { auth } = useContext(AuthContext);

//   const navigate = useNavigate();

//   useEffect(() => {
//     let filtered = materials.filter((mat) => {
//       return mat.name.toLowerCase().includes(search.toLowerCase());
//     });

//     if (sort) {
//       filtered = filtered.slice().sort((a, b) => {
//         if (sort === "precioEnPesos") {
//           return (a[sort] || 0) - (b[sort] || 0);
//         }
//         return (a[sort] || "").localeCompare(b[sort] || "");
//       });
//     }

//     console.log(filtered);
//     setFilterMaterials(filtered);
//   }, [search, sort, materials]);

//   return (
//     <div className={styles.containerMaterial}>
//       {auth ? (
//         <div className={styles.subcontainerMaterial}>
//           <Link to="/material/new" className={styles.btnSuccess}>
//             Material Nuevo
//           </Link>

//           <div className={styles.searchContainer}>
//             <input
//               type="search"
//               className={styles.formControl}
//               placeholder="Search"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <FaSearch className={styles.searchIcon} />
//           </div>
//           <div className={styles.containerSort}>
//             <div className={styles.selectWrapper}>
//               <select
//                 id={sortId}
//                 value={sort}
//                 onChange={(e) => setSort(e.target.value)}
//                 className={styles.customSelect}
//               >
//                 <option value="">Ordenar por:</option>
//                 <option value="name">Nombre</option>
//                 <option value="precioEnPesos">Precio</option>
//                 <option value="category">Categoria</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className={styles.subcontainerMaterial}></div>
//       )}
//       {filterMaterials.length >= 1 ? (
//         <div className={styles.containerItem}>
//           {filterMaterials.map((material) => (
//             <MaterialItem2
//               getMaterial={getMaterial}
//               key={material._id}
//               material={material}
//               onClick={() => navigate(`/material/${material._id}`)}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className={styles.containerNoShow}>
//           <img src="../../../public/img/archivo.png" alt="" />
//           <p>¡No hay Materiales que mostrar!!!</p>
//           <img src="../../../public/img/archivo.png" alt="" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Material;
