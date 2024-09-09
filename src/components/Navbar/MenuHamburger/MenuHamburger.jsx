import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MenuHamburger.module.css";
import { AuthContext } from "../../../providers/AuthProvider";
import { useCategoriesWithoutAuth } from "../../../hooks/useCategoriesWithoutAuth";
import { useSubcategoriesWithoutAuth } from "../../../hooks/useSubcategoriesWithoutAuth";

const HamburgerMenu = () => {
  const { auth } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubMenuMaterialesOpen, setIsSubMenuMaterialesOpen] = useState(false);
  const [isSubMenuEditOpen, setIsSubMenuEditOpen] = useState(false);

  const { categories, loading: loadingCategories } = useCategoriesWithoutAuth();
  const { subcategories, loading: loadingSubcategories } =
    useSubcategoriesWithoutAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubMenuMateriales = () => {
    setIsSubMenuMaterialesOpen(!isSubMenuMaterialesOpen);
    if (isSubMenuEditOpen) {
      setIsSubMenuEditOpen(false);
    }
  };

  const toggleSubMenuEdit = () => {
    setIsSubMenuEditOpen(!isSubMenuEditOpen);
    if (isSubMenuMaterialesOpen) {
      setIsSubMenuMaterialesOpen(false);
    }
  };

  return (
    <div className={styles.hamburgerMenu}>
      {isOpen ? (
        <CloseIcon
          style={{ fontSize: 24 }}
          onClick={toggleMenu}
          className={styles.hamburgerCloseIcon}
        />
      ) : (
        <MenuIcon
          style={{ fontSize: 24 }}
          onClick={toggleMenu}
          className={styles.hamburgerMenuIcon}
        />
      )}
      <nav className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <ul>
          <li className={styles.menuDropdownTitles}>
            <a
              className={styles.textTitleMenu}
              href="#home"
              onClick={toggleSubMenuMateriales}
            >
              Materiales
            </a>
            {isSubMenuMaterialesOpen ? (
              <img
                src="/img/arriba-cheuron.png"
                alt=""
                onClick={toggleSubMenuMateriales}
              />
            ) : (
              <img
                src="/img/abajo-cheuron.png"
                alt=""
                onClick={toggleSubMenuMateriales}
              />
            )}

            {isSubMenuMaterialesOpen && (
              <div className={`${styles.menuDropdown} ${styles.nightMode}`}>
                {loadingCategories || loadingSubcategories ? (
                  <div className={styles.noCategories}>
                    <img src="/img/Skateboarding.gif" alt="Cargando..." />
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
                                className={`${styles.productLinkNav} ${styles.navTitle} ${styles.nightMode}`}
                              >
                                <p>-&nbsp; {category.category}</p>
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
                                      className={`${styles.productLinkNav} ${styles.nightMode}`}
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
                                className={`${styles.navItemTodo} ${styles.nightMode}`}
                              >
                                <Link
                                  to={`/material/${category._id}`}
                                  onClick={toggleMenu}
                                >
                                  Ver todos
                                </Link>
                              </li>
                            </ul>
                          </div>
                        ))}
                    </div>
                    <div className={styles.navItemTodoMat}>
                      <Link to={`/material`} onClick={toggleMenu}>
                        Todos los materiales
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </li>
          <li className={styles.menuDropdownTitles} onClick={toggleSubMenuEdit}>
            <a className={styles.textTitleMenu} href="#home">
              Listar y Editar
            </a>
            {isSubMenuEditOpen ? (
              <img src="/img/arriba-cheuron.png" alt="" />
            ) : (
              <img src="/img/abajo-cheuron.png" alt="" />
            )}
            {isSubMenuEditOpen && (
              <ul className={styles.subMenu}>
                <li>
                  <a href="/material">- Materiales</a>
                </li>
                <li>
                  <a href="/category">- Categorias</a>
                </li>
                <li>
                  <a href="/subcategory">- Subcategorias</a>
                </li>
                <li>
                  <a href="/unit">- Unidades</a>
                </li>
              </ul>
            )}
          </li>
          <li className={styles.menuDropdownTitles}>
            <a className={styles.textTitleMenu} href="#">
              Contacto
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HamburgerMenu;
