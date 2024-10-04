import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MenuHamburger.module.css";
import { AuthContext } from "../../../providers/AuthProvider";
import { useCategoriesWithoutAuth } from "../../../hooks/useCategoriesWithoutAuth";
import { useSubcategoriesWithoutAuth } from "../../../hooks/useSubcategoriesWithoutAuth";
import { useTheme } from "../../../providers/ThemeProvider";

const HamburgerMenu = () => {
  const { isNightMode } = useTheme();
  const { auth } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuMaterialesOpen, setIsSubMenuMaterialesOpen] = useState(false);
  const [isSubMenuEditOpen, setIsSubMenuEditOpen] = useState(false);
  const [isSubMenuIndiceOpen, setIsSubMenuIndiceOpen] = useState(false);

  const { categories, loading: loadingCategories } = useCategoriesWithoutAuth();
  const { subcategories, loading: loadingSubcategories } =
    useSubcategoriesWithoutAuth();

  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenuMateriales = () => {
    setIsSubMenuMaterialesOpen(!isSubMenuMaterialesOpen);
    if (isSubMenuEditOpen || isSubMenuIndiceOpen) {
      setIsSubMenuEditOpen(false);
      setIsSubMenuIndiceOpen(false);
    }
  };

  const toggleSubMenuEdit = () => {
    setIsSubMenuEditOpen(!isSubMenuEditOpen);
    if (isSubMenuMaterialesOpen || isSubMenuIndiceOpen) {
      setIsSubMenuMaterialesOpen(false);
      setIsSubMenuIndiceOpen(false);
    }
  };

  const toggleSubMenuIndice = () => {
    setIsSubMenuIndiceOpen(!isSubMenuIndiceOpen);
    if (isSubMenuMaterialesOpen || isSubMenuEditOpen) {
      setIsSubMenuMaterialesOpen(false);
      setIsSubMenuEditOpen(false);
    }
  };

  return (
    <div className={`${styles.hamburgerMenu} ${modeClass}`}>
      {isOpen ? (
        <CloseIcon
          style={{ fontSize: 24, color: "red" }}
          onClick={toggleMenu}
          className={styles.hamburgerCloseIcon}
        />
      ) : (
        <MenuIcon
          style={{ fontSize: 24 }}
          onClick={toggleMenu}
          className={`${styles.hamburgerMenuIcon} ${modeClass}`}
        />
      )}
      <nav
        className={`${styles.menu} ${modeClass} ${isOpen ? styles.open : ""}`}
      >
        <ul>
          <li
            className={`${styles.menuDropdownTitles} ${modeClass}`}
            onClick={toggleSubMenuMateriales}
          >
            <a className={`${styles.textTitleMenu} ${modeClass}`} href="#home">
              Materiales
            </a>
            {isSubMenuMaterialesOpen ? (
              isNightMode ? (
                <img src="/img/arriba-cheuron-Azul.png" alt="" /> // Imagen para el modo nocturno
              ) : (
                <img src="/img/arriba-cheuron.png" alt="" /> // Imagen para el modo diurno
              )
            ) : isNightMode ? (
              <img src="/img/flecha-hacia-abajo-Azul.png" alt="" /> // Imagen para el modo nocturno
            ) : (
              <img src="/img/abajo-cheuron.png" alt="" /> // Imagen para el modo diurno
            )}

            {isSubMenuMaterialesOpen && (
              <div className={`${styles.menuDropdown} ${modeClass}`}>
                {loadingCategories || loadingSubcategories ? (
                  <div className={styles.noCategories}>
                    <img src="/img/glass-Spheres.gif" alt="Cargando..." />
                    <p>Cargando materiales...</p>
                  </div>
                ) : categories.length === 0 ? (
                  <div className={styles.noCategories}>
                    <img src="/img/bandeja-de-entrada-vacia.png" alt="" />
                    <p>¡¡¡No hay materiales existentes!!!</p>
                  </div>
                ) : (
                  <div className={styles.menuRow}>
                    <div className={`${styles.menuColumns} ${styles.flex}`}>
                      {categories
                        .slice()
                        .sort((a, b) => a.category.localeCompare(b.category))
                        .map((category) => (
                          <div key={category._id} className={styles.menuColumn}>
                            <ul className={styles.ulDropdown}>
                              <li
                                className={`${styles.productLinkNav} ${styles.navTitle} ${modeClass}`}
                              >
                                <Link
                                  to={`/material/${category._id}`}
                                  onClick={toggleMenu}
                                >
                                  {category.category}
                                </Link>
                              </li>
                              {Array.isArray(subcategories) &&
                                subcategories.length > 0 &&
                                subcategories
                                  .filter(
                                    (subcat) =>
                                      subcat.category._id === category._id
                                  )
                                  .sort((a, b) =>
                                    a.subcategory.localeCompare(b.subcategory)
                                  )
                                  .map((subcategory) => (
                                    <li
                                      key={subcategory._id}
                                      className={`${styles.productLinkNav} ${modeClass}`}
                                    >
                                      <Link
                                        className={styles.subcategoryName}
                                        to={`/material/${category._id}/${subcategory._id}`}
                                        onClick={toggleMenu}
                                      >
                                        &#10146;&nbsp;{subcategory.subcategory}
                                      </Link>
                                    </li>
                                  ))}
                              <li
                                className={`${styles.navItemTodo} ${modeClass}`}
                              ></li>
                            </ul>
                          </div>
                        ))}
                    </div>
                    <div className={`${styles.navItemTodoMat} ${modeClass}`}>
                      <Link to={`/material`} onClick={toggleMenu}>
                        Todos los materiales
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </li>
          <li
            className={`${styles.menuDropdownTitles} ${modeClass}`}
            onClick={toggleSubMenuEdit}
          >
            <a className={`${styles.textTitleMenu} ${modeClass}`} href="#home">
              Listar y Editar
            </a>
            {isSubMenuEditOpen ? (
              isNightMode ? (
                <img src="/img/arriba-cheuron-Azul.png" alt="" /> // Imagen para el modo nocturno
              ) : (
                <img src="/img/arriba-cheuron.png" alt="" /> // Imagen para el modo diurno
              )
            ) : isNightMode ? (
              <img src="/img/flecha-hacia-abajo-Azul.png" alt="" /> // Imagen para el modo nocturno
            ) : (
              <img src="/img/abajo-cheuron.png" alt="" /> // Imagen para el modo diurno
            )}
            {isSubMenuEditOpen && (
              <ul className={`${styles.subMenu} ${modeClass}`}>
                <li>
                  <a href="/material">Materiales</a>
                </li>
                <li>
                  <a href="/category">Categorias</a>
                </li>
                <li>
                  <a href="/subcategory">Subcategorias</a>
                </li>
                <li>
                  <a href="/unit">Unidades</a>
                </li>
              </ul>
            )}
          </li>
          <li
            className={`${styles.menuDropdownTitles} ${modeClass}`}
            onClick={toggleSubMenuIndice}
          >
            <a className={`${styles.textTitleMenu} ${modeClass}`} href="#home">
              Indices
            </a>
            {isSubMenuIndiceOpen ? (
              isNightMode ? (
                <img src="/img/arriba-cheuron-Azul.png" alt="" /> // Imagen para el modo nocturno
              ) : (
                <img src="/img/arriba-cheuron.png" alt="" /> // Imagen para el modo diurno
              )
            ) : isNightMode ? (
              <img src="/img/flecha-hacia-abajo-Azul.png" alt="" /> // Imagen para el modo nocturno
            ) : (
              <img src="/img/abajo-cheuron.png" alt="" /> // Imagen para el modo diurno
            )}
            {isSubMenuIndiceOpen && (
              <ul className={`${styles.subMenu} ${modeClass}`}>
                <li>
                  <a href="/inflationM">Inflacion Mensual</a>
                </li>
                <li>
                  <a href="/inflationI">Inflacion Interanual</a>
                </li>
                <li>
                  <a href="/indiceCAC">Indice de la Construccion</a>
                </li>
                <li>
                  <a href="/indiceUVA">Indice UVA</a>
                </li>
              </ul>
            )}
          </li>
          <li className={`${styles.menuDropdownTitles} ${modeClass}`}>
            <a
              className={`${styles.textTitleMenu} ${modeClass}`}
              href="/contact"
            >
              Contacto
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
