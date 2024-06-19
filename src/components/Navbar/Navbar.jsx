import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.containerNav}>
      <div className={styles.headerBottom}>
        <div className={`${styles.containerBottom} ${styles.flex}`}>
          <div className={styles.hiddenMenu}>
            <div className={styles.dtmenu}>
              <div className={`${styles.dtmenuTitle} ${styles.flex}`}>
                <i id="iconMenu" className="iconMenu fas fa-bars"></i>
                <span>Materiales</span>
              </div>
              <div className={styles.dtmenuList}>
                <ul className={styles.desktopMenu}>
                  <li data-depth="0">
                    <Link
                      className={`${styles.hyperList} ${styles.flex}`}
                      to="#"
                    >
                      <img src="./img/tv-vieja.png" alt="" />
                      Agua
                      <i id="icon-submenu" className="fas fa-caret-right"></i>
                    </Link>
                    <div className={styles.subContainerMenu}>
                      <ul className={`${styles.sub} ${styles.flex}`}>
                        <div
                          className={`${styles.subMenuContainer} ${styles.flex}`}
                        >
                          <li className={styles.subMenu}>
                            <Link to="#">Television</Link>
                            <ul className={styles.subMenuList}>
                              <li>
                                <Link to="#">Smart TVs</Link>
                              </li>
                              <li>
                                <Link to="#">TVs LED</Link>
                              </li>
                              <li>
                                <Link to="#">Tvs 4K</Link>
                              </li>
                              <li>
                                <Link to="#">Controles Remotos</Link>
                              </li>
                              <li>
                                <Link to="#">Accesorios</Link>
                              </li>
                            </ul>
                          </li>
                          <li className={styles.subMenu}>
                            <Link to="#">Celulares</Link>
                            <ul className={styles.subMenuList}>
                              <li>
                                <Link to="#">Tablets</Link>
                              </li>
                              <li>
                                <Link to="#">Celulares Libres</Link>
                              </li>
                              <li>
                                <Link to="#">Celulares con Abono</Link>
                              </li>
                              <li>
                                <Link to="#">Relojes</Link>
                              </li>
                              <li>
                                <Link to="#">Accesorios</Link>
                              </li>
                            </ul>
                          </li>
                          <li className={styles.subMenu}>
                            <Link to="#">Camaras</Link>
                            <ul className={styles.subMenuList}>
                              <li>
                                <Link to="#">Camaras Digitales</Link>
                              </li>
                              <li>
                                <Link to="#">DSLR Y SLR</Link>
                              </li>
                              <li>
                                <Link to="#">Point and Shoot</Link>
                              </li>
                              <li>
                                <Link to="#">Camara Estenopeica</Link>
                              </li>
                              <li>
                                <Link to="#">Accesorios</Link>
                              </li>
                            </ul>
                          </li>
                          <li className={styles.subMenu}>
                            <Link to="#">Consolas</Link>
                            <ul className={styles.subMenuList}>
                              <li>
                                <Link to="#">Consolas</Link>
                              </li>
                              <li>
                                <Link to="#">Videojuegos</Link>
                              </li>
                              <li>
                                <Link to="#">VR</Link>
                              </li>
                              <li>
                                <Link to="#">Accesorios</Link>
                              </li>
                            </ul>
                          </li>
                        </div>
                        <div
                          className={`${styles.subMenuContainer} ${styles.flex}`}
                        >
                          <li className={styles.subMenu}>
                            <Link to="#">Computadoras</Link>
                            <ul className={styles.subMenuList}>
                              <li>
                                <Link to="#">PC de Escritorio</Link>
                              </li>
                              <li>
                                <Link to="#">Notebooks</Link>
                              </li>
                              <li>
                                <Link to="#">All in One</Link>
                              </li>
                              <li>
                                <Link to="#">Monitores</Link>
                              </li>
                            </ul>
                          </li>
                          <li className={styles.subMenu}>
                            <Link to="#">Componentes PC</Link>
                            <ul className={styles.subMenuList}>
                              <li>
                                <Link to="#">Memorias</Link>
                              </li>
                              <li>
                                <Link to="#">Discos</Link>
                              </li>
                              <li>
                                <Link to="#">Placas de video</Link>
                              </li>
                              <li>
                                <Link to="#">Procesadores</Link>
                              </li>
                              <li>
                                <Link to="#">Placas Madre</Link>
                              </li>
                              <li>
                                <Link to="#">Fuentes</Link>
                              </li>
                            </ul>
                          </li>
                          <li className={styles.subMenu}>
                            <Link to="#">Perifericos PC</Link>
                            <ul className={styles.subMenuList}>
                              <li>
                                <Link to="#">Sillas Gamer</Link>
                              </li>
                              <li>
                                <Link to="#">Auriculares</Link>
                              </li>
                              <li>
                                <Link to="#">Impresoras</Link>
                              </li>
                              <li>
                                <Link to="#">Conectividad y Redes</Link>
                              </li>
                              <li>
                                <Link to="#">Estabilizadores</Link>
                              </li>
                              <li>
                                <Link to="#">Mouses y Teclados</Link>
                              </li>
                            </ul>
                          </li>
                          <li className={styles.subMenu}>
                            <Link to="#">Software</Link>
                            <ul className={styles.subMenuList}>
                              <li>
                                <Link to="#">SO</Link>
                              </li>
                              <li>
                                <Link to="#">Diseño</Link>
                              </li>
                              <li>
                                <Link to="#">Redes</Link>
                              </li>
                              <li>
                                <Link to="#">Comercial</Link>
                              </li>
                              <li>
                                <Link to="#">Oficina</Link>
                              </li>
                            </ul>
                          </li>
                        </div>
                      </ul>
                    </div>
                  </li>
                  <li data-depth="0">
                    <a href="" className={`${styles.hyperList} ${styles.flex}`}>
                      <img src="./img/camiseta-de-manga-corta.png" alt="" />
                      Cloaca
                      <i id="icon-submenu" className="fas fa-caret-right"></i>
                    </a>
                  </li>
                  <li data-depth="0">
                    <a href="" className={`${styles.hyperList} ${styles.flex}`}>
                      <img src="./img/sillon.png" alt="" />
                      Pluvial
                      <i id="icon-submenu" className="fas fa-caret-right"></i>
                    </a>
                  </li>
                  <li data-depth="0">
                    <a href="" className={`${styles.hyperList} ${styles.flex}`}>
                      <img src="./img/bolso-de-mano.png" alt="" />
                      Arquitectura
                    </a>
                  </li>
                  <li data-depth="0">
                    <a href="" className={`${styles.hyperList} ${styles.flex}`}>
                      <img src="./img/carro.png" alt="" />
                      Otros
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.headerNavLinks}>
            <ul>
              <li className={styles.iHeaderNav}>
                <a href="#">Inicio</a>
              </li>
              <li className={styles.npHeaderNav}>
                <a href="#">Marcas</a>
              </li>
              <li className={styles.mHeaderNav}>
                <a href="#">Vender</a>
              </li>
              <li className={styles.sHeaderNav}>
                <a href="#">Sucursales</a>
              </li>
              <li className={styles.nHeaderNav}>
                <a href="#">Nosotros</a>
              </li>
              <li className={styles.cHeaderNav}>
                <a href="#">Contacto</a>
              </li>
            </ul>
          </div>
          <div className={styles.headerNavLiksHidden}>
            <ul>
              <li className={styles.linksHiddenNavResponsive}>
                <a href="#">
                  <i id="icon-menu" className="fas fa-ellipsis-h"></i>
                </a>
                <div className={styles.linksHiddenNavResponsiveContainer}>
                  <ul>
                    <li className={styles.iHeaderNavResponsive}>
                      <a href="#">Inicio</a>
                    </li>
                    <li className={styles.npHeaderNavResponsive}>
                      <a href="#">Marcas</a>
                    </li>
                    <li className={styles.mHeaderNavResponsive}>
                      <a href="#">Vender</a>
                    </li>
                    <li className={styles.sHeaderNavResponsive}>
                      <a href="#">Sucursales</a>
                    </li>
                    <li className={styles.nHeaderNavResponsive}>
                      <a href="#">Nosotros</a>
                    </li>
                    <li className={styles.cHeaderNavResponsive}>
                      <a href="#">Contacto</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// <header id="header">

{
  /* <div className="header-top">
  <div className="container-top flex">
    <div className="text">Holiday Sale on Clothing at 20% discount</div>
    <div className="language">
      <form className="flex" action="#">
        <select name="lenguajes" id="lang">
          <option value="selecciona">Idioma</option>
          <option value="english">English</option>
          <option value="francais">Francais</option>
          <option value="portuguese">Portuguese</option>
          <option value="spanish">Spanish</option>
        </select>
      </form>
    </div>
    <div className="currency">
      <form className="flex" action="#">
        <select name="currencies" id="money">
          <option value="selecciona">Moneda</option>
          <option value="english">Dolar</option>
          <option value="francais">Euro</option>
          <option value="portuguese">Real</option>
          <option value="spanish">Peso Arg.</option>
        </select>
      </form>
    </div>
  </div>
</div> */
}

{
  /* <div className="header-middle">
  <div className="container-middle flex">
    <div className="logo">
      <a className="logo-grande" href="index.html"
        ><img src="./img/megashop-logo-1492236279.jpg" alt=""
      /></a>
      <a className="logo-chico" href="index.html"
        ><img src="./img/LogoCelular.png" alt="" height="65px"
      /></a>
    </div>
    <div className="search">
      <form className="flex" action="" id="buttonform">
        <input type="text" name="" id="search-nav" placeholder="Search" />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
    <div className="account">
      <div className="login-register">
        <div className="login-toogle">
          <a className="flex" href="count.html">
            <i className="fas fa-user"></i>
            <span className="login-toogle-text">Mi Cuenta</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</div> */
}

// </header>
