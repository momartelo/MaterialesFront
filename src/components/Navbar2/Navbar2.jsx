import ModalLogin from "../ModalLogin/ModalLogin";
import styles from "./Navbar2.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { API_URL } from "../../utils/consts";

const Navbar2 = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, [API_URL]);
  console.log("Estoy en el Navbar");
  console.log(categories);

  const handleLogout = () => {
    logout();
    // navigate("/login");
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
                        <div className={styles.menuRow}>
                          <div
                            className={`${styles.menuColumns} ${styles.flex}`}
                          >
                            <div className={styles.menuColumn}>
                              <ul className={styles.ulDropdown}>
                                <li
                                  className={`${styles.productLinkNav} ${styles.navTitle}`}
                                >
                                  <p>Materiales Agua</p>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">Caños</Link>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">Accesorios para caños</Link>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">Valvulas</Link>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">Accesorios para Conexiones</Link>
                                </li>
                                <li className={`${styles.navItemTodo}`}>
                                  <Link to="#">Ver todos</Link>
                                </li>
                              </ul>
                            </div>
                            <div className={styles.menuColumn}>
                              <ul className={styles.ulDropdown}>
                                <li
                                  className={`${styles.productLinkNav} ${styles.navTitle}`}
                                >
                                  <p>Materiales Cloaca</p>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">Caños</Link>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">Accesorios para caños</Link>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">Accesorios para B.R.</Link>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">Acometidas</Link>
                                </li>
                                <li className={`${styles.navItemTodo}`}>
                                  <Link to="#">Ver todos</Link>
                                </li>
                              </ul>
                            </div>
                            <div className={styles.menuColumn}>
                              <ul className={styles.ulDropdown}>
                                <li
                                  className={`${styles.productLinkNav} ${styles.navTitle}`}
                                >
                                  <p>Materiales Pluviales</p>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">Caños</Link>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">Tapas y Collares</Link>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">Materiales para Sumideros</Link>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">-----</Link>
                                </li>
                                <li className={`${styles.navItemTodo}`}>
                                  <Link to="#">Ver todos</Link>
                                </li>
                              </ul>
                            </div>
                            <div className={styles.menuColumn}>
                              <ul className={styles.ulDropdown}>
                                <li
                                  className={`${styles.productLinkNav} ${styles.navTitle}`}
                                >
                                  <p>Materiales Arquitectura</p>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">Cales y Cemento</Link>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">Hormigones</Link>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">Ladrillos</Link>
                                </li>
                                <li className={styles.productLinkNav}>
                                  <Link to="#">Baldosas para veredas</Link>
                                </li>
                                <li className={`${styles.navItemTodo}`}>
                                  <Link to="#">Ver todos</Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className={styles.navItem}>
                      <Link
                        className={`${styles.liHomeNavbar} ${styles.flex}`}
                        to="#"
                      >
                        <span>FAQ's</span>
                      </Link>
                    </li>
                    <li className={styles.navItem}>
                      <Link
                        className={`${styles.liHomeNavbar} ${styles.flex}`}
                        to="#"
                      >
                        <span>Contact</span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            <div className={`${styles.containerIconsNav} ${styles.flex}`}>
              {auth && auth.user ? (
                <div className={styles.loggedUserInfo}>
                  <span>{auth.user.username}</span>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              ) : (
                <div className={styles.iconLogin} onClick={openModal}>
                  <img src="../../../public/img/perfil.png" alt="" />
                </div>
              )}
              <Link className={styles.iconSearch}>
                <img src="../../../public/img/lupa.png" alt="" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ModalLogin isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default Navbar2;
