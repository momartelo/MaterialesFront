import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import useAppContext from "../../hooks/useAppContext";
import styles from "./404Page.module.css";

function NotFoundPage() {
  const { isNightMode, containerClass } = useAppContext(styles);
  const modeClass = isNightMode ? styles.nightMode : styles.dayMode;

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  return (
    <>
      <Navbar />
      <div className={`${styles.container404} ${containerClass} ${modeClass}`}>
        <h1>&#123;&nbsp;ErrOr&nbsp;&#125;</h1>
        <div className={`${styles.numbers404} ${containerClass} ${modeClass}`}>
          <img src="/img/numero-4.png" alt="" />
          <img src="/img/CañoDibujo.png" alt="" />
          <img src="/img/numero-4.png" alt="" />
        </div>
        <h3>Esta pagina no esta disponible dentro de nuestra red</h3>
        <div className={`${styles.texts404} ${containerClass} ${modeClass}`}>
          <p>La pagina a la que intentas acceder no existe</p>
          <span
            className={`${styles.separatorTexts404} ${containerClass} ${modeClass}`}
          >
            &nbsp;-&nbsp;
          </span>
          <p>Prueba volver a la pagina de inicio</p>
        </div>
        <div
          className={`${styles.containerButtons} ${containerClass} ${modeClass}`}
        >
          <Link
            className={`${styles.buttonHome} ${containerClass} ${modeClass}`}
            to="/"
          >
            Inicio
          </Link>
          <button
            className={`${styles.buttonBack} ${containerClass} ${modeClass}`}
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
