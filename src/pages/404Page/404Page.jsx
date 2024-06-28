import { Link } from "react-router-dom";
import Navbar3 from "../../components/Navbar3/Navbar3";
import styles from "./404Page.module.css";

function NotFoundPage() {
  return (
    <div className={styles.container404}>
      <Navbar3 />
      <h1>ERROR</h1>
      <div className={styles.numbers404}>
        <img src="../../../public/img/numero-4.png" alt="" width="200px" />
        <img src="../../../public/img/CañoDibujo.png" alt="" width="200px" />
        <img src="../../../public/img/numero-4.png" alt="" width="200px" />
      </div>
      <h3>Esta pagina no esta disponoble dentro de nuestra red</h3>
      <div className={styles.texts404}>
        <p>La pagina a la que intentas acceder no existe</p>
        <p>Prueba volver a la pagina de inicio</p>
      </div>
      <Link className={styles.button} to="/">
        Inicio
      </Link>
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
