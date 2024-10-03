import { useState, useEffect, useContext, useId } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styles from "./Material.module.css";
import MaterialItem2 from "../MaterialItem2/MaterialItem2";
import { AuthContext } from "../../providers/AuthProvider";
import Select from "react-select";
import useAppContext from "../../hooks/useAppContext";

const Material = ({ materials, getMaterial, categories }) => {
  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const sortId = useId();
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [filterMaterials, setFilterMaterials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [materialsPerPage, setMaterialsPerPage] = useState(10); // Valor inicial
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Filtrar materiales por nombre
    let filtered = materials.filter((mat) => {
      return mat.name.toLowerCase().includes(search.toLowerCase());
    });

    // Aplicar ordenamiento
    if (sort === "category") {
      filtered = filtered.slice().sort((a, b) => {
        const categoryA = categories.find((cat) => cat._id === a.category);
        const categoryB = categories.find((cat) => cat._id === b.category);
        // Primero ordena por categoría, luego por nombre si las categorías son iguales
        if (categoryA.category !== categoryB.category) {
          return categoryA.category.localeCompare(categoryB.category);
        } else {
          return a.name.localeCompare(b.name);
        }
      });
    } else if (sort === "precioEnPesos") {
      filtered = filtered
        .slice()
        .sort((a, b) => (a[sort] || 0) - (b[sort] || 0));
    } else {
      filtered = filtered
        .slice()
        .sort((a, b) => (a[sort] || "").localeCompare(b[sort] || ""));
    }

    // Actualizar el estado de filterMaterials con los materiales filtrados y ordenados
    setFilterMaterials(filtered);

    // Reiniciar currentPage a 1 cuando se cambian los filtros
    setCurrentPage(1);
    setIsLoading(false);
  }, [search, sort, materials, categories]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleMaterialsPerPageChange = (selectedOption) => {
    setMaterialsPerPage(selectedOption.value);
  };

  const renderPaginationControls = () => {
    const pageNumbers = Math.ceil(filterMaterials.length / materialsPerPage);

    return (
      <ul className={`${styles.pagination} ${containerClass} ${modeClass}`}>
        <li>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Prev
          </button>
        </li>
        {[...Array(pageNumbers)].map((_, index) => (
          <li key={index + 1}>
            <button
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? styles.active : ""}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={handleNextPage}
            disabled={currentPage === pageNumbers}
          >
            Next
          </button>
        </li>
      </ul>
    );
  };

  const sortOptions = [
    { value: "", label: "Ordenar por:" },
    { value: "name", label: "Nombre" },
    { value: "precioEnPesos", label: "Precio" },
    { value: "category", label: "Categoria" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      // width: "200px", // Ancho fijo para el control
      height: "40px",
      borderRadius: "5px",
      borderColor: "red",
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
      zIndex: 100,
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

  const customStyles2 = {
    control: (provided, state) => ({
      ...provided,
      // width: "80px", // Ancho fijo para el control
      height: "40px",
      borderRadius: "5px",
      borderColor: "orange",
      // boxShadow: state.isFocused ? "0 0 0 1px blue" : "none",
      // "&:hover": {
      //   borderColor: "blue",
      // },
      backgroundColor: "orange", // Fondo rojo para el control
      color: "white", // Color del texto del control
      cursor: "pointer",
      boxShadow: state.isFocused ? "none" : provided.boxShadow, // Elimina la sombra solo cuando está enfocado
      border: state.isFocused ? "none" : provided.border, //
    }),
    menu: (provided) => ({
      ...provided,
      width: "80px", // Ancho fijo para el menú
      borderRadius: "10px",
      marginTop: 0,
      zIndex: 100,
      backgroundColor: "orange", // Fondo rojo para el menú desplegable
      boxShadow: "none", // Elimina la sombra al desplegar
      border: "none", // Elimina el borde al desplegar
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "darkred" : "orange",
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
    borderRadius: 5,
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

  const customTheme2 = (theme) => ({
    ...theme,
    borderRadius: 5,
    colors: {
      ...theme.colors,
      primary25: "lightcoral", // Color para las opciones cuando están seleccionadas
      primary: "darkred", // Color primario para el control
      neutral0: "orange", // Fondo rojo para el control
      neutral80: "white", // Color del texto en el menú (normal)
      neutral90: "white", // Color del texto en el menú (enfocado)
      neutral20: "white", // Color del texto seleccionado
    },
  });

  return (
    <div
      className={`${styles.containerMaterial} ${containerClass} ${modeClass}`}
    >
      <div
        className={`${styles.containerVarSearch} ${containerClass} ${modeClass}`}
      >
        <div
          className={`${styles.addMaterialContainer} ${containerClass} ${modeClass}`}
        >
          {auth ? (
            <button
              className={styles.addMaterialButton}
              onClick={() => navigate("/material/new")}
            >
              Crear Material
            </button>
          ) : null}
        </div>
        <div
          className={`${styles.searchContainer} ${containerClass} ${modeClass}`}
        >
          <input
            type="text"
            className={`${styles.formControl} ${containerClass} ${modeClass}`}
            placeholder="Buscar material..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className={styles.searchIcon} />
        </div>
        <div
          className={`${styles.containerActions} ${containerClass} ${modeClass}`}
        >
          <div
            className={`${styles.sortSelect} ${containerClass} ${modeClass}`}
          >
            <Select
              id={sortId}
              options={sortOptions}
              value={sortOptions.find((option) => option.value === sort)}
              onChange={(selectedOption) => setSort(selectedOption.value)}
              styles={customStyles}
              theme={customTheme}
              // placeholder="Ordenar por:"
            />
          </div>
          <div
            className={` ${styles.itemsPerPage} ${containerClass} ${modeClass}`}
          >
            <Select
              options={[
                { value: 10, label: "10" },
                { value: 20, label: "20" },
                { value: 50, label: "50" },
              ]}
              defaultValue={{ value: 10, label: "10" }}
              onChange={handleMaterialsPerPageChange}
              styles={customStyles2}
              theme={customTheme2}
              placeholder="Items"
            />
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className={styles.loaderContainer}>
          {/* <ClipLoader size={50} color={"#123abc"} loading={isLoading} /> */}
        </div>
      ) : (
        <>
          <div
            className={`${styles.containerItem} ${containerClass} ${modeClass}`}
          >
            {filterMaterials.length > 0 ? (
              filterMaterials
                .slice(
                  (currentPage - 1) * materialsPerPage,
                  currentPage * materialsPerPage
                )
                .map((material) => (
                  <MaterialItem2
                    key={material._id}
                    material={material}
                    getMaterial={getMaterial}
                    onClick={(e) => {
                      if (!e.defaultPrevented) {
                        navigate(`/material/description/${material._id}`);
                      }
                    }}
                  />
                ))
            ) : (
              <div
                className={`${styles.containerNoShow} ${containerClass} ${modeClass}`}
              >
                <img src="/img/archivo.png" alt="" />
                <p>¡No hay </p>
                <p>&nbsp;Materiales</p>
                <p>&nbsp;creados!!!</p>
                <img src="/img/archivo.png" alt="" />
              </div>
            )}
          </div>
          <div className={styles.paginationControls}>
            {renderPaginationControls()}
          </div>
        </>
      )}
    </div>
  );
};

export default Material;
