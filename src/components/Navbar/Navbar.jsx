import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalLogin from "../ModalLogin/ModalLogin";
import { AuthContext } from "../../providers/AuthProvider";
import { API_URL, IMAGES_API_URL } from "../../utils/consts";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();
  // console.log("subcategories");
  // console.log(subcategories);

  useEffect(() => {
    fetch(`${API_URL}/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/subcategory`)
      .then((res) => res.json())
      .then((data) => setSubcategories(data))
      .catch((err) => console.error(err));
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
        console.log("Seleccionado avatar masculino");
        return "/avatars/avatar-hombre.png";
      case "FEM":
        console.log("Seleccionado avatar femenino");
        return "/avatars/avatar-mujer.png";
      case "NO-BIN":
        console.log("Seleccionado avatar no binario");
        return "/avatars/avatar-no-binario.png";
      default:
        console.log("Seleccionado avatar por defecto");
        return "/avatars/avatarBordeNegro.png";
    }
  };

  return (
    <div className={styles.containerNav}>
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
                        className={`${styles.liHomeNavbar} ${styles.flex}`}
                        to="/"
                      >
                        <span>Home</span>
                      </Link>
                    </li>

                    <li className={`${styles.navItem} ${styles.hasDropdown}`}>
                      <Link
                        className={`${styles.liHomeNavbar} ${styles.flex}`}
                        to="#"
                      >
                        <span>Materiales</span>
                        <img src="../../../public/img/AnguloAbajo.png" alt="" />
                      </Link>
                      <div className={styles.menuDropdown}>
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
                                      className={`${styles.productLinkNav} ${styles.navTitle}`}
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
                                            className={styles.productLinkNav}
                                          >
                                            <Link
                                              to={`/material/${category._id}/${subcategory._id}`}
                                            >
                                              {subcategory.subcategory}
                                            </Link>
                                          </li>
                                        ))}
                                    <li className={`${styles.navItemTodo}`}>
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
                    </li>
                    {auth && auth.user ? (
// ! li de edicion-------------------------------
                    <li className={`${styles.navItem} ${styles.hasDropdown}`}>
                      <Link
                        className={`${styles.liHomeNavbar} ${styles.flex}`}
                        to="#"
                      >
                        <span>Editar</span>
                        <img src="../../../public/img/AnguloAbajo.png" alt="" />
                      </Link>
                      <div className={styles.menuDropdown2}>
                        <div className={styles.menuRow}>
                          <div
                            className={`${styles.menuColumns} ${styles.flex}`}
                          >
                            <div className={styles.menuColumn}>
                              <ul className={styles.ulDropdown2}>
                                <li className={styles.liTitleMenu}>
                                  <span>Listar y Editar</span>
                                </li>
                                <li
                                  className={`${styles.productLinkNav} ${styles.navTitle}`}
                                >
                                  <Link
                                    className={styles.linkLogo}
                                    to="/category"
                                  >
                                    <p>Categorias</p>
                                  </Link>
                                </li>
                                <li
                                  className={`${styles.productLinkNav} ${styles.navTitle}`}
                                >
                                  <Link className={styles.linkLogo} to="#">
                                    <p>Subcategorias</p>
                                  </Link>
                                </li>
                                <li
                                  className={`${styles.productLinkNav} ${styles.navTitle}`}
                                >
                                  <Link className={styles.linkLogo} to="#">
                                    <p>Unidades</p>
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    ) : (<span></span>)}

                    <li className={styles.navItem}>
                      <Link
                        className={`${styles.liHomeNavbar} ${styles.flex}`}
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
                  <div className={styles.loggedUserInfo}>
                    <img
                      src={getAvatarImageUrl(auth.user?.genero)}
                      alt={auth.user.username}
                    />
                    <span>{auth.user.username}</span>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                  <Link className={styles.iconSearch}>
                    <img src="../../../public/img/lupa.png" alt="" />
                  </Link>
                </div>
              ) : (
                <div className={styles.iconLogin} onClick={openModal}>
                  <img src="../../../public/img/perfil.png" alt="" />
                  <Link className={styles.iconSearch}>
                    <img src="../../../public/img/lupa.png" alt="" />
                  </Link>
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
