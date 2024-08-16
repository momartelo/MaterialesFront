import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalLogin from "../ModalLogin/ModalLogin";
import { AuthContext } from "../../providers/AuthProvider";
import { API_URL } from "../../utils/consts";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../providers/ThemeProvider";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Brightness2Icon from "@mui/icons-material/Brightness2";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const { isNightMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleChangeTheme = () => {
    toggleTheme();
  };

  // useEffect(() => {
  //   fetch(`${API_URL}/category`)
  //     .then((res) => res.json())
  //     .then((data) => setCategories(data))
  //     .catch((err) => console.error(err));
  // }, []);

  // useEffect(() => {
  //   fetch(`${API_URL}/subcategory`)
  //     .then((res) => res.json())
  //     .then((data) => setSubcategories(data))
  //     .catch((err) => console.error(err));
  // }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/category`);
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch(`${API_URL}/subcategory`);

      if (!response.ok) {
        throw new Error("Error de red");
      }
      const data = await response.json();
      setSubcategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
    <div
      className={`${styles.containerNav} ${
        isNightMode ? styles.nightMode : styles.dayMode
      }`}
    >
      <div className={styles.wrapperNav}>
        <div className={styles.fluidNav}>
          <div className={`${styles.generalNav} ${styles.flex}`}>
            <div className={`${styles.logoAnchor} ${styles.flex}`}>
              <Link className={styles.linkLogo} to="#">
                <img src="../../../public/img/osse.jpg" alt="" />
              </Link>
            </div>
            <div className={styles.containerNavbarCentral}>
              <div className={styles.wrappernavbarCentral}>
                <nav className={styles.navbarCentral}>
                  <ul className={`${styles.ulNavbarCentral} ${styles.flex}`}>
                    <li className={styles.navItem}>
                      <Link
                        className={`${styles.liHomeNavbar} ${styles.flex} ${styles.nightMode}`}
                        to="/"
                      >
                        <span>Home</span>
                      </Link>
                    </li>

                    <li className={`${styles.navItem} ${styles.hasDropdown}  `}>
                      <Link
                        className={`${styles.liHomeNavbar} ${styles.flex} ${styles.nightMode}`}
                        to="#"
                      >
                        <span>Materiales</span>
                        {isNightMode ? (
                          <img
                            src="../../../public/img/angulo-hacia-abajo.png"
                            alt=""
                          />
                        ) : (
                          <img
                            src="../../../public/img/AnguloAbajo.png"
                            alt=""
                          />
                        )}
                      </Link>
                      <div
                        // className={`${styles.menuDropdown} ${
                        //   isNightMode ? styles.nightMode : styles.dayMode
                        // }`}
                        className={`${styles.menuDropdown} ${styles.nightMode} }`}
                      >
                        {categories.length === 0 ? (
                          <div className={styles.noCategories}>
                            <img
                              src="../../../public/img/bandeja-de-entrada-vacia.png"
                              alt=""
                            />
                            <p>¡¡¡No hay materiales existentes!!!</p>
                            {/* <Link
                              className={styles.buttonNewMaterial}
                              to={"/material/new"}
                            >
                              Crear Material
                            </Link> */}
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
                                              className={`${styles.productLinkNav} ${styles.nightMode} `}
                                            >
                                              <Link
                                                to={`/material/${category._id}/${subcategory._id}`}
                                              >
                                                -&nbsp;{subcategory.subcategory}
                                              </Link>
                                            </li>
                                          ))}
                                      <li
                                        className={`${styles.navItemTodo} ${styles.nightMode} `}
                                      >
                                        <Link to={`/material/${category._id}`}>
                                          Ver todos
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                ))}
                            </div>
                            <Link to={`/material`}>Todos los materiales</Link>
                          </div>
                        )}
                      </div>
                    </li>
                    {auth && auth.user ? (
                      // ! li de edicion-------------------------------
                      <li className={`${styles.navItem} ${styles.hasDropdown}`}>
                        <Link
                          className={`${styles.liHomeNavbar} ${styles.flex} ${styles.nightMode}`}
                          to="#"
                        >
                          <span>Editar</span>
                          {isNightMode ? (
                            <img
                              src="../../../public/img/angulo-hacia-abajo.png"
                              alt=""
                            />
                          ) : (
                            <img
                              src="../../../public/img/AnguloAbajo.png"
                              alt=""
                            />
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
                        className={`${styles.liHomeNavbar} ${styles.flex} ${styles.nightMode}`}
                        to="#"
                      >
                        <span>Contacto</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className={`${styles.containerIconsNav} ${styles.flex}`}>
              {auth && auth.user ? (
                <div className={styles.loggedUserContainer}>
                  <div className={styles.switchDayNight}>
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
                  <div className={styles.loggedUserInfo}>
                    <img
                      src={getAvatarImageUrl(auth.user?.genero)}
                      alt={auth.user.username}
                    />
                    <span>{auth.user.username}</span>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                  {isNightMode ? (
                    <Link className={styles.iconSearch}>
                      <img src="../../../public/img/buscarRelleno.png" alt="" />
                    </Link>
                  ) : (
                    <Link className={styles.iconSearch}>
                      <img src="../../../public/img/LupaNegra.png" alt="" />
                    </Link>
                  )}
                </div>
              ) : (
                <div className={styles.containerLogin}>
                  <div className={styles.switchDayNight}>
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
                  <div className={styles.iconLogin}>
                    <img
                      src="../../../public/img/perfil.png"
                      alt=""
                      onClick={openModal}
                    />
                  </div>
                  <div className={styles.iconSearch}>
                    <Link>
                      <img src="../../../public/img/lupa.png" alt="" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ModalLogin isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default Navbar;

{
  /* <li className={`${styles.navItem} ${styles.hasDropdown}  `}>
<Link
  className={`${styles.liHomeNavbar} ${styles.flex} ${styles.nightMode}`}
  to="#"
>
  <span>Materiales</span>
  {isNightMode ? (
    <img
      src="../../../public/img/angulo-hacia-abajo.png"
      alt=""
    />
  ) : (
    <img
      src="../../../public/img/AnguloAbajo.png"
      alt=""
    />
  )}
</Link>
<div
  // className={`${styles.menuDropdown} ${
  //   isNightMode ? styles.nightMode : styles.dayMode
  // }`}
  className={`${styles.menuDropdown} ${styles.nightMode} }`}
>
  {categories.length === 0 ? (
    <div className={styles.noCategories}>
      <p>No hay categorias existentes</p>
    </div>
  ) : (
    <div className={styles.menuRow}>
      <div
        className={`${styles.menuColumns} ${styles.flex}`}
      >
        {categories.map((category) => (
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
                      subcat.category._id === category._id
                  )
                  .map((subcategory) => (
                    <li
                      key={subcategory._id}
                      className={`${styles.productLinkNav} ${styles.nightMode} `}
                    >
                      <Link
                        to={`/material/${category._id}/${subcategory._id}`}
                      >
                        {subcategory.subcategory}
                      </Link>
                    </li>
                  ))}
              <li
                className={`${styles.navItemTodo} ${styles.nightMode} `}
              >
                <Link to={`/material/${category._id}`}>
                  Ver todos
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )}
</div>
</li> */
}
