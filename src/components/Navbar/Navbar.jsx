import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalLogin from "../ModalLogin/ModalLogin";
import { AuthContext } from "../../providers/AuthProvider";
import { useTheme } from "../../providers/ThemeProvider";

import { useCategoriesWithoutAuth } from "../../hooks/useCategoriesWithoutAuth";
import { useSubcategoriesWithoutAuth } from "../../hooks/useSubcategoriesWithoutAuth";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import RefreshIcon from "@mui/icons-material/Refresh";
import styles from "./Navbar.module.css";
import { fetchRates } from "../../functions/fetchRates";
import { useResponsive } from "../../providers/ResponsiveContext";
import MenuHamburger from "./MenuHamburger/MenuHamburger";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { isNightMode, toggleTheme } = useTheme();
  const {
    isDesktopHD,
    isDesktopFullHD,
    isTabletHD,
    isTablet,
    isMobile,
    isMobileLandscape,
  } = useResponsive();

  const getResponsiveClass = () => {
    if (isDesktopFullHD) return styles.fullHD;
    if (isDesktopHD) return styles.hd;
    if (isTabletHD) return styles.tabletHD;
    if (isTablet) return styles.tablet;
    if (isMobileLandscape) return styles.mobileLandscape;
    if (isMobile) return styles.mobile;
    return "";
  };

  const responsiveClass = getResponsiveClass();
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const [rates, setRates] = useState({
    valorDolarCompra: null,
    valorDolarVenta: null,
    valorEuroCompra: null,
    valorEuroVenta: null,
    fechaDolar: null,
    fechaEuro: null,
  });
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const { categories, loading: loadingCategories } = useCategoriesWithoutAuth();
  const { subcategories, loading: loadingSubcategories } =
    useSubcategoriesWithoutAuth();

  const handleChangeTheme = () => {
    toggleTheme();
  };

  useEffect(() => {
    fetchRates(setRates, setLoading, setIsRefreshing);
    const intervalId = setInterval(
      () => fetchRates(setRates, setLoading, setIsRefreshing),
      43200000
    ); // Cada 12 horas
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const adjustMenuPosition = () => {
      const menuDropdown = document.querySelector(`.${styles.menuDropdown}`);
      if (menuDropdown) {
        const rect = menuDropdown.getBoundingClientRect();
        const overflowRight = rect.right > window.innerWidth;
        if (overflowRight) {
          menuDropdown.style.left = `${window.innerWidth - rect.right - 20}px`;
        } else {
          menuDropdown.style.left = "0";
        }
      }
    };

    adjustMenuPosition();
    window.addEventListener("resize", adjustMenuPosition);
    return () => window.removeEventListener("resize", adjustMenuPosition);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const getAvatarImageUrl = (gender) => {
    switch (gender) {
      case "MASC":
        return "/avatars/avatar-hombre.png";
      case "FEM":
        return "/avatars/avatar-mujer.png";
      case "NO-BIN":
        return "/avatars/avatar-no-binario.png";
      default:
        return "/avatars/avatarBordeNegro.png";
    }
  };

  return (
    <div className={`${styles.containerNav} ${responsiveClass} ${modeClass}`}>
      <div className={styles.wrapperNav}>
        <div className={styles.fluidNav}>
          <div className={`${styles.generalNav} ${styles.flex}`}>
            <div
              className={`${styles.logoAnchor} ${styles.flex}  ${responsiveClass} ${modeClass}`}
            >
              <Link className={styles.linkLogo} to="/">
                <img src="/img/osse.jpg" alt="" />
              </Link>
            </div>
            <div
              className={`${styles.containerNavbarCentral} ${responsiveClass} ${modeClass}`}
            >
              <div className={styles.wrappernavbarCentral}>
                <nav
                  className={`${styles.navbarCentral} ${responsiveClass} ${modeClass}`}
                >
                  <ul
                    className={`${styles.ulNavbarCentral} ${responsiveClass} ${modeClass} ${styles.flex}`}
                  >
                    <li className={styles.navItem}>
                      <Link
                        className={`${styles.liHomeNavbar} ${styles.flex} ${responsiveClass} ${modeClass}`}
                        to="/"
                      >
                        <span>Home</span>
                      </Link>
                    </li>

                    <li className={`${styles.navItem} ${styles.hasDropdown}`}>
                      <Link
                        className={`${styles.liHomeNavbar} ${styles.flex} ${responsiveClass} ${modeClass}`}
                        to="#"
                      >
                        <span>Materiales</span>
                        {isNightMode ? (
                          <img src="/img/angulo-hacia-abajo.png" alt="" />
                        ) : (
                          <img src="/img/AnguloAbajo.png" alt="" />
                        )}
                      </Link>
                      <div
                        className={`${styles.menuDropdown} ${styles.nightMode}`}
                      >
                        {loadingCategories || loadingSubcategories ? (
                          <div className={styles.noCategories}>
                            <img
                              src="/img/Skateboarding.gif"
                              alt="Cargando..."
                            />
                            <p>Cargando materiales...</p>
                          </div>
                        ) : categories.length === 0 ? (
                          <div className={styles.noCategories}>
                            <img
                              src="/img/bandeja-de-entrada-vacia.png"
                              alt=""
                            />
                            <p>¡¡¡No hay materiales existentes!!!</p>
                          </div>
                        ) : (
                          <div className={styles.menuRow}>
                            <div
                              className={`${styles.menuColumns} ${styles.flex}`}
                            >
                              {categories
                                .slice()
                                .sort((a, b) =>
                                  a.category.localeCompare(b.category)
                                )
                                .map((category) => (
                                  <div
                                    key={category._id}
                                    className={styles.menuColumn}
                                  >
                                    <ul className={styles.ulDropdown}>
                                      <li
                                        className={`${styles.productLinkNav} ${styles.navTitle} ${styles.nightMode}`}
                                      >
                                        <p>{category.category}</p>
                                      </li>
                                      {Array.isArray(subcategories) &&
                                        subcategories.length > 0 &&
                                        subcategories
                                          .filter(
                                            (subcat) =>
                                              subcat.category._id ===
                                              category._id
                                          )
                                          .sort((a, b) =>
                                            a.subcategory.localeCompare(
                                              b.subcategory
                                            )
                                          )
                                          .map((subcategory) => (
                                            <li
                                              key={subcategory._id}
                                              className={`${styles.productLinkNav} ${styles.nightMode}`}
                                            >
                                              <Link
                                                to={`/material/${category._id}/${subcategory._id}`}
                                              >
                                                -&nbsp;{subcategory.subcategory}
                                              </Link>
                                            </li>
                                          ))}
                                      <li
                                        className={`${styles.navItemTodo} ${styles.nightMode}`}
                                      >
                                        <Link to={`/material/${category._id}`}>
                                          Ver todos
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                ))}
                            </div>
                            <div className={styles.navItemTodoMat}>
                              <Link to={`/material`}>Todos los materiales</Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                    {auth && auth.user ? (
                      <li className={`${styles.navItem} ${styles.hasDropdown}`}>
                        <Link
                          className={`${styles.liHomeNavbar} ${styles.flex} ${responsiveClass} ${modeClass}`}
                          to="#"
                        >
                          <span>Editar</span>
                          {isNightMode ? (
                            <img src="/img/angulo-hacia-abajo.png" alt="" />
                          ) : (
                            <img src="/img/AnguloAbajo.png" alt="" />
                          )}
                        </Link>
                        <div
                          className={`${styles.menuDropdown2} ${styles.nightMode}`}
                        >
                          <div className={styles.menuRow}>
                            <div
                              className={`${styles.menuColumns} ${styles.flex}`}
                            >
                              <div className={styles.menuColumn}>
                                <ul className={styles.ulDropdown2}>
                                  <li
                                    className={`${styles.liTitleMenu} ${styles.nightMode}`}
                                  >
                                    <span>Listar y Editar</span>
                                  </li>
                                  <li
                                    className={`${styles.productLinkNav} ${styles.navTitle} ${styles.nightMode}`}
                                  >
                                    <Link
                                      className={styles.linkLogo}
                                      to="/material"
                                    >
                                      <p>- Materiales</p>
                                    </Link>
                                  </li>
                                  <li
                                    className={`${styles.productLinkNav} ${styles.navTitle} ${styles.nightMode}`}
                                  >
                                    <Link
                                      className={styles.linkLogo}
                                      to="/category"
                                    >
                                      <p>- Categorias</p>
                                    </Link>
                                  </li>
                                  <li
                                    className={`${styles.productLinkNav} ${styles.navTitle} ${styles.nightMode}`}
                                  >
                                    <Link
                                      className={styles.linkLogo}
                                      to="/subcategory"
                                    >
                                      <p>- Subcategorias</p>
                                    </Link>
                                  </li>
                                  <li
                                    className={`${styles.productLinkNav} ${styles.navTitle} ${styles.nightMode}`}
                                  >
                                    <Link
                                      className={styles.linkLogo}
                                      to="/unit"
                                    >
                                      <p>- Unidades</p>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ) : (
                      <span></span>
                    )}
                    <li className={styles.navItem}>
                      <Link
                        className={`${styles.liHomeNavbar} ${styles.flex} ${responsiveClass} ${modeClass}`}
                        to="#"
                      >
                        <span>Contacto</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
                <nav
                  className={`${styles.navbarHamburger} ${responsiveClass} ${modeClass}`}
                >
                  <MenuHamburger />
                </nav>
                <div
                  className={`${styles.logoAnchorMenuHamburger}  ${responsiveClass} ${modeClass} ${styles.flex} `}
                >
                  <Link
                    className={`${styles.linkLogoMenuHamburger} ${responsiveClass} ${modeClass}`}
                    to="/"
                  >
                    <img src="/img/osse.jpg" alt="" />
                  </Link>
                </div>
              </div>
            </div>
            <div
              className={`${styles.containerIconsNav} ${styles.flex} ${responsiveClass} ${modeClass}`}
            >
              <div
                className={`${styles.containerSwitchLog} ${responsiveClass} ${modeClass}`}
              >
                <div
                  className={`${styles.switchDayNight} ${responsiveClass} ${modeClass}`}
                >
                  <FormControlLabel
                    className={styles.toggleTheme}
                    control={
                      <Switch
                        checked={isNightMode}
                        onChange={handleChangeTheme}
                        color="primary"
                        name="nightModeSwitch"
                        inputProps={{ "aria-label": "toggle night mode" }}
                        icon={
                          <WbSunnyIcon
                            style={{
                              fontSize: 28,
                              backgroundColor: "#3498DB",
                              padding: "4px",
                              borderRadius: "50%",
                              color: "#ffc107",
                              marginTop: "-4px",
                            }}
                          />
                        }
                        checkedIcon={
                          <Brightness2Icon
                            style={{
                              fontSize: 28,
                              backgroundColor: "white",
                              padding: "4px",
                              borderRadius: "50%",
                              color: "blue",
                              marginTop: "-4px",
                            }}
                          />
                        }
                      />
                    }
                  />
                </div>
                {auth && auth.user ? (
                  <div
                    className={`${styles.loggedUserContainer} ${responsiveClass} ${modeClass}`}
                  >
                    <div className={styles.loggedUserInfo}>
                      <img
                        src={getAvatarImageUrl(auth.user?.genero)}
                        alt={auth.user.username}
                      />
                      <span>{auth.user.username}</span>
                      <button onClick={handleLogout}>Logout</button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.containerLogin}>
                    <div className={styles.iconLogin}>
                      <img src="/img/perfil.png" alt="" onClick={openModal} />
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`${styles.containerExchange} ${responsiveClass} ${modeClass}`}
              >
                <div
                  className={`${styles.containerValorDolar} ${responsiveClass} ${modeClass}`}
                >
                  <p>Dolar:</p> <p>${rates.valorDolarVenta}</p>
                  <p>Actualizado: {rates.fechaDolar}</p>
                  <button
                    className={styles.buttonRefresh}
                    onClick={() => {
                      setIsRefreshing(true);
                      fetchRates(setRates, setLoading, setIsRefreshing);
                    }}
                    disabled={loading}
                  >
                    <RefreshIcon
                      className={isRefreshing ? styles.loadingIcon : ""}
                      style={{ fontSize: "18px" }}
                    />
                  </button>
                </div>
                <div
                  className={`${styles.separataExchange} ${responsiveClass} ${modeClass}`}
                ></div>
                <div
                  className={`${styles.containerValorEuro} ${responsiveClass} ${modeClass}`}
                >
                  <p>Euro:</p> <p>${rates.valorEuroVenta} </p>
                  <p>Actualizado: {rates.fechaEuro}</p>
                  <button
                    className={styles.buttonRefresh}
                    onClick={() => {
                      setIsRefreshing(true);
                      fetchRates(setRates, setLoading, setIsRefreshing);
                    }}
                    disabled={loading}
                  >
                    <RefreshIcon
                      className={isRefreshing ? styles.loadingIcon : ""}
                      style={{ fontSize: "18px" }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalLogin isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default Navbar;

// import React, { useContext, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import ModalLogin from "../ModalLogin/ModalLogin";
// import { AuthContext } from "../../providers/AuthProvider";
// import styles from "./Navbar.module.css";
// import { useNavigate } from "react-router-dom";
// import { useTheme } from "../../providers/ThemeProvider";
// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import WbSunnyIcon from "@mui/icons-material/WbSunny";
// import Brightness2Icon from "@mui/icons-material/Brightness2";
// import RefreshIcon from "@mui/icons-material/Refresh";
// import { getExchangesRates } from "../../functions/fetchs";
// import { useCategoriesWithoutAuth } from "../../hooks/useCategoriesWithoutAuth";
// import { useSubcategoriesWithoutAuth } from "../../hooks/useSubcategoriesWithoutAuth";

// const Navbar = () => {
//   const { auth, logout } = useContext(AuthContext);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const { isNightMode, toggleTheme } = useTheme();
//   const [valorDolarCompra, setValorDolarCompra] = useState(null);
//   const [valorDolarVenta, setValorDolarVenta] = useState(null);
//   const [fechaDolar, setFechaDolar] = useState(null);
//   const [valorEuroCompra, setValorEuroCompra] = useState(null);
//   const [valorEuroVenta, setValorEuroVenta] = useState(null);
//   const [fechaEuro, setFechaEuro] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const navigate = useNavigate();

//   const { categories, loading: loadingCategories } = useCategoriesWithoutAuth();
//   const { subcategories, loading: loadingSubcategories } =
//     useSubcategoriesWithoutAuth();

//   const handleChangeTheme = () => {
//     toggleTheme();
//   };

//   const fetchRates = async () => {
//     setLoading(true);
//     try {
//       console.log("Dentro del fetch");
//       const response = await getExchangesRates();
//       const data = response.data;
//       console.log(data);
//       const dolar = data.find((moneda) => moneda.moneda === "USD");
//       const euro = data.find((moneda) => moneda.moneda === "EUR");

//       const dolarCompra = dolar ? parseFloat(dolar.compra) : "No disponible";
//       const dolarVenta = dolar ? parseFloat(dolar.venta) : "No disponible";
//       const euroCompra = euro ? parseFloat(euro.compra) : "No disponible";
//       const euroVenta = euro ? parseFloat(euro.venta) : "No disponible";

//       const fechaCotizacionDolar = dolar
//         ? dolar.fechaActualizacion
//         : "No disponible";

//       const fechaCotizacionEuro = euro
//         ? euro.fechaActualizacion
//         : "No disponible";

//       const opcionesFecha = {
//         day: "2-digit",
//         month: "2-digit",
//         year: "numeric",
//       };

//       const fechaFormateadaDolar = new Date(
//         fechaCotizacionDolar
//       ).toLocaleDateString("es-AR", opcionesFecha);

//       const fechaFormateadaEuro = new Date(
//         fechaCotizacionEuro
//       ).toLocaleDateString("es-AR", opcionesFecha);

//       setValorDolarCompra(dolarCompra.toFixed(2));
//       setValorDolarVenta(dolarVenta.toFixed(2));
//       setValorEuroCompra(euroCompra.toFixed(2));
//       setValorEuroVenta(euroVenta.toFixed(2));
//       setFechaDolar(fechaFormateadaDolar);
//       setFechaEuro(fechaFormateadaEuro);
//     } catch (error) {
//       console.error("Error fetching exchanges rates, error");
//     } finally {
//       setLoading(false);
//       setTimeout(() => setIsRefreshing(false), 1000);
//     }
//   };

//   useEffect(() => {
//     fetchRates();
//     const intervalId = setInterval(fetchRates, 43200000);
//     return () => clearInterval(intervalId);
//   }, []);

//   useEffect(() => {
//     const adjustMenuPosition = () => {
//       const menuDropdown = document.querySelector(`.${styles.menuDropdown}`);
//       if (menuDropdown) {
//         const rect = menuDropdown.getBoundingClientRect();
//         const overflowRight = rect.right > window.innerWidth;

//         if (overflowRight) {
//           menuDropdown.style.left = `${window.innerWidth - rect.right - 20}px`; // Ajuste para mantenerlo dentro de la ventana
//         } else {
//           menuDropdown.style.left = "0"; // Posición normal si no hay desbordamiento
//         }
//       }
//     };

//     adjustMenuPosition();
//     window.addEventListener("resize", adjustMenuPosition);

//     return () => {
//       window.removeEventListener("resize", adjustMenuPosition);
//     };
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   const openModal = () => {
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   const getAvatarImageUrl = (gender) => {
//     switch (gender) {
//       case "MASC":
//         return "/avatars/avatar-hombre.png";
//       case "FEM":
//         return "/avatars/avatar-mujer.png";
//       case "NO-BIN":
//         return "/avatars/avatar-no-binario.png";
//       default:
//         return "/avatars/avatarBordeNegro.png";
//     }
//   };

//   return (
//     <div
//       className={`${styles.containerNav} ${
//         isNightMode ? styles.nightMode : styles.dayMode
//       }`}
//     >
//       <div className={styles.wrapperNav}>
//         <div className={styles.fluidNav}>
//           <div className={`${styles.generalNav} ${styles.flex}`}>
//             <div className={`${styles.logoAnchor} ${styles.flex}`}>
//               <Link className={styles.linkLogo} to="#">
//                 <img src="/img/osse.jpg" alt="" />
//               </Link>
//             </div>
//             <div className={styles.containerNavbarCentral}>
//               <div className={styles.wrappernavbarCentral}>
//                 <nav className={styles.navbarCentral}>
//                   <ul className={`${styles.ulNavbarCentral} ${styles.flex}`}>
//                     <li className={styles.navItem}>
//                       <Link
//                         className={`${styles.liHomeNavbar} ${styles.flex} ${styles.nightMode}`}
//                         to="/"
//                       >
//                         <span>Home</span>
//                       </Link>
//                     </li>

//                     <li className={`${styles.navItem} ${styles.hasDropdown}  `}>
//                       <Link
//                         className={`${styles.liHomeNavbar} ${styles.flex} ${styles.nightMode}`}
//                         to="#"
//                       >
//                         <span>Materiales</span>
//                         {isNightMode ? (
//                           <img src="/img/angulo-hacia-abajo.png" alt="" />
//                         ) : (
//                           <img src="/img/AnguloAbajo.png" alt="" />
//                         )}
//                       </Link>
//                       <div
//                         // className={`${styles.menuDropdown} ${
//                         //   isNightMode ? styles.nightMode : styles.dayMode
//                         // }`}
//                         className={`${styles.menuDropdown} ${styles.nightMode} }`}
//                       >
//                         {loadingCategories || loadingSubcategories ? (
//                           <div className={styles.noCategories}>
//                             <img
//                               src="/img/Skateboarding.gif"
//                               alt="Cargando..."
//                             />
//                             <p>Cargando materiales...</p>
//                           </div>
//                         ) : categories.length === 0 ? (
//                           <div className={styles.noCategories}>
//                             <img
//                               src="/img/bandeja-de-entrada-vacia.png"
//                               alt=""
//                             />
//                             <p>¡¡¡No hay materiales existentes!!!</p>
//                           </div>
//                         ) : (
//                           <div className={styles.menuRow}>
//                             <div
//                               className={`${styles.menuColumns} ${styles.flex}`}
//                             >
//                               {categories
//                                 .slice()
//                                 .sort((a, b) =>
//                                   a.category.localeCompare(b.category)
//                                 )
//                                 .map((category) => (
//                                   <div
//                                     key={category._id}
//                                     className={styles.menuColumn}
//                                   >
//                                     <ul className={styles.ulDropdown}>
//                                       <li
//                                         className={`${styles.productLinkNav} ${styles.navTitle} ${styles.nightMode}`}
//                                       >
//                                         <p>{category.category}</p>
//                                       </li>
//                                       {Array.isArray(subcategories) &&
//                                         subcategories.length > 0 &&
//                                         subcategories
//                                           .filter(
//                                             (subcat) =>
//                                               subcat.category._id ===
//                                               category._id
//                                           )
//                                           .sort((a, b) =>
//                                             a.subcategory.localeCompare(
//                                               b.subcategory
//                                             )
//                                           )
//                                           .map((subcategory) => (
//                                             <li
//                                               key={subcategory._id}
//                                               className={`${styles.productLinkNav} ${styles.nightMode} `}
//                                             >
//                                               <Link
//                                                 to={`/material/${category._id}/${subcategory._id}`}
//                                               >
//                                                 -&nbsp;{subcategory.subcategory}
//                                               </Link>
//                                             </li>
//                                           ))}
//                                       <li
//                                         className={`${styles.navItemTodo} ${styles.nightMode} `}
//                                       >
//                                         <Link to={`/material/${category._id}`}>
//                                           Ver todos
//                                         </Link>
//                                       </li>
//                                     </ul>
//                                   </div>
//                                 ))}
//                             </div>
//                             <div className={styles.navItemTodoMat}>
//                               <Link to={`/material`}>Todos los materiales</Link>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </li>
//                     {auth && auth.user ? (
//                       // ! li de edicion-------------------------------
//                       <li className={`${styles.navItem} ${styles.hasDropdown}`}>
//                         <Link
//                           className={`${styles.liHomeNavbar} ${styles.flex} ${styles.nightMode}`}
//                           to="#"
//                         >
//                           <span>Editar</span>
//                           {isNightMode ? (
//                             <img src="/img/angulo-hacia-abajo.png" alt="" />
//                           ) : (
//                             <img src="/img/AnguloAbajo.png" alt="" />
//                           )}
//                         </Link>
//                         <div
//                           className={`${styles.menuDropdown2} ${styles.nightMode}`}
//                         >
//                           <div className={styles.menuRow}>
//                             <div
//                               className={`${styles.menuColumns} ${styles.flex}`}
//                             >
//                               <div className={styles.menuColumn}>
//                                 <ul className={styles.ulDropdown2}>
//                                   <li
//                                     className={`${styles.liTitleMenu} ${styles.nightMode}`}
//                                   >
//                                     <span>Listar y Editar</span>
//                                   </li>
//                                   <li
//                                     className={`${styles.productLinkNav} ${styles.navTitle} ${styles.nightMode}`}
//                                   >
//                                     <Link
//                                       className={styles.linkLogo}
//                                       to="/material"
//                                     >
//                                       <p>- Materiales</p>
//                                     </Link>
//                                   </li>
//                                   <li
//                                     className={`${styles.productLinkNav} ${styles.navTitle} ${styles.nightMode}`}
//                                   >
//                                     <Link
//                                       className={styles.linkLogo}
//                                       to="/category"
//                                     >
//                                       <p>- Categorias</p>
//                                     </Link>
//                                   </li>
//                                   <li
//                                     className={`${styles.productLinkNav} ${styles.navTitle} ${styles.nightMode}`}
//                                   >
//                                     <Link
//                                       className={styles.linkLogo}
//                                       to="/subcategory"
//                                     >
//                                       <p>- Subcategorias</p>
//                                     </Link>
//                                   </li>
//                                   <li
//                                     className={`${styles.productLinkNav} ${styles.navTitle} ${styles.nightMode}`}
//                                   >
//                                     <Link
//                                       className={styles.linkLogo}
//                                       to="/unit"
//                                     >
//                                       <p>- Unidades</p>
//                                     </Link>
//                                   </li>
//                                 </ul>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </li>
//                     ) : (
//                       <span></span>
//                     )}
//                     <li className={styles.navItem}>
//                       <Link
//                         className={`${styles.liHomeNavbar} ${styles.flex} ${styles.nightMode}`}
//                         to="#"
//                       >
//                         <span>Contacto</span>
//                       </Link>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             </div>
//             <div className={`${styles.containerIconsNav} ${styles.flex}`}>
//               <div className={styles.containerExchange}>
//                 <div className={styles.containerValorDolar}>
//                   <p>Dolar:</p> <p>${valorDolarVenta}</p>
//                   <p>Actualizado: {fechaDolar}</p>
//                   <button
//                     className={styles.buttonRefresh}
//                     onClick={() => {
//                       setIsRefreshing(true);
//                       fetchRates();
//                     }}
//                     disabled={loading}
//                   >
//                     <RefreshIcon
//                       className={isRefreshing ? styles.loadingIcon : ""}
//                       style={{ fontSize: "18px" }}
//                     />
//                   </button>
//                 </div>
//                 <div className={styles.separataExchange}></div>
//                 <div className={styles.containerValorEuro}>
//                   <p>Euro:</p> <p>${valorEuroVenta}</p>
//                   <p>Actualizado: {fechaEuro}</p>
//                   <button
//                     className={styles.buttonRefresh}
//                     onClick={() => {
//                       setIsRefreshing(true);
//                       fetchRates();
//                     }}
//                     disabled={loading}
//                   >
//                     <RefreshIcon
//                       className={isRefreshing ? styles.loadingIcon : ""}
//                       style={{ fontSize: "18px" }}
//                     />
//                   </button>
//                 </div>
//               </div>
//               <div className={styles.switchDayNight}>
//                 <FormControlLabel
//                   className={styles.toggleTheme}
//                   control={
//                     <Switch
//                       checked={isNightMode}
//                       onChange={handleChangeTheme}
//                       color="primary"
//                       name="nightModeSwitch"
//                       inputProps={{ "aria-label": "toggle night mode" }}
//                       icon={
//                         <WbSunnyIcon
//                           style={{
//                             fontSize: 28,
//                             backgroundColor: "#3498DB",
//                             padding: "4px",
//                             borderRadius: "50%",
//                             color: "#ffc107",
//                             marginTop: "-4px",
//                           }}
//                         />
//                       }
//                       checkedIcon={
//                         <Brightness2Icon
//                           style={{
//                             fontSize: 28,
//                             backgroundColor: "white",
//                             padding: "4px",
//                             borderRadius: "50%",
//                             color: "blue",
//                             marginTop: "-4px",
//                           }}
//                         />
//                       }
//                     />
//                   }
//                 />
//               </div>
//               {auth && auth.user ? (
//                 <div className={styles.loggedUserContainer}>
//                   <div className={styles.loggedUserInfo}>
//                     <img
//                       src={getAvatarImageUrl(auth.user?.genero)}
//                       alt={auth.user.username}
//                     />
//                     <span>{auth.user.username}</span>
//                     <button onClick={handleLogout}>Logout</button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className={styles.containerLogin}>
//                   <div className={styles.iconLogin}>
//                     <img src="/img/perfil.png" alt="" onClick={openModal} />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <ModalLogin isOpen={modalIsOpen} onRequestClose={closeModal} />
//     </div>
//   );
// };

// export default Navbar;
