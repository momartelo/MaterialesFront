import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./404Page.module.css";

function NotFoundPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  return (
    <div className={styles.container404}>
      <Navbar />
      <h1>ERROR</h1>
      <div className={styles.numbers404}>
        <img src="/img/numero-4.png" alt="" width="200px" />
        <img src="/img/CañoDibujo.png" alt="" width="200px" />
        <img src="/img/numero-4.png" alt="" width="200px" />
      </div>
      <h3>Esta pagina no esta disponoble dentro de nuestra red</h3>
      <div className={styles.texts404}>
        <p>La pagina a la que intentas acceder no existe</p>
        <p>Prueba volver a la pagina de inicio</p>
      </div>
      <div className={styles.containerButtons}>
        <Link className={styles.button} to="/">
          Inicio
        </Link>
        <button className={styles.buttonBack} onClick={handleBack}>
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
  );
}
export default NotFoundPage;
