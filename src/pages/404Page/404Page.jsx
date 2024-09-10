import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useResponsive } from "../../providers/ResponsiveContext";
import { useTheme } from "../../providers/ThemeProvider";
import styles from "./404Page.module.css";

function NotFoundPage() {
  const { isNightMode } = useTheme();
  const {
    isDesktopHD,
    isDesktopFullHD,
    isTabletHD,
    isTablet,
    isMobile,
    isMobileLandscape,
  } = useResponsive();

  console.log({
    isDesktopHD,
    isDesktopFullHD,
    isTabletHD,
    isTablet,
    isMobile,
    isMobileLandscape,
  });

  const getContainerClass = () => {
    if (isDesktopFullHD) return styles.fullHD;
    if (isDesktopHD) return styles.hd;
    if (isTabletHD) return styles.tabletHD;
    if (isTablet) return styles.tablet;
    if (isMobileLandscape) return styles.mobileLandscape;
    if (isMobile) return styles.mobile;
    return "";
  };

  const notFoundClass = getContainerClass();
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  return (
    <>
      <Navbar />
      <div className={`${styles.container404} ${notFoundClass} ${modeClass}`}>
        <h1>&#123;&nbsp;ErrOr&nbsp;&#125;</h1>
        <div className={`${styles.numbers404} ${notFoundClass} ${modeClass}`}>
          <img src="/img/numero-4.png" alt="" />
          <img src="/img/CañoDibujo.png" alt="" />
          <img src="/img/numero-4.png" alt="" />
        </div>
        <h3>Esta pagina no esta disponible dentro de nuestra red</h3>
        <div className={`${styles.texts404} ${notFoundClass} ${modeClass}`}>
          <p>La pagina a la que intentas acceder no existe</p>
          <span
            className={`${styles.separatorTexts404} ${notFoundClass} ${modeClass}`}
          >
            &nbsp;-&nbsp;
          </span>
          <p>Prueba volver a la pagina de inicio</p>
        </div>
        <div
          className={`${styles.containerButtons} ${notFoundClass} ${modeClass}`}
        >
          <Link
            className={`${styles.buttonHome} ${notFoundClass} ${modeClass}`}
            to="/"
          >
            Inicio
          </Link>
          <button
            className={`${styles.buttonBack} ${notFoundClass} ${modeClass}`}
            onClick={handleBack}
          >
            Volver
          </button>
        </div>
        <span>
          Si crees que esto es un error contacta con nuestro equipo de soporte
        </span>
        <Link href="mailto:soporte@osse.gov.ar" className={styles.linkMail}>
          soporte@osse.gov.ar
        </Link>
      </div>
      <Footer />
    </>
  );
}
export default NotFoundPage;
