import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.containerFooter}>
      <div className={styles.containerSocialIcons}>
        <div className={styles.line}></div>
        <div className={styles.socialIcons}>
          <Link to={"https://www.facebook.com/ossemgp"} target="_blank">
            <img
              className={styles.iconFacebook}
              src="../../../public/img/facebook.png"
              alt=""
            />
          </Link>
          <Link to={"https://www.instagram.com/ossemgp/?hl=es"} target="_blank">
            <img
              className={styles.iconInstagram}
              src="../../../public/img/instagramNegro.png"
              alt=""
            />
          </Link>
          <Link
            to={"https://www.youtube.com/channel/UCCEEL9h3O0NzjjIHKs8IRTw"}
            target="_blank"
          >
            <img
              className={styles.iconYoutube}
              src="../../../public/img/youtube.png"
              alt=""
            />
          </Link>
          <Link to={"https://x.com/prensaosse"} target="_blank">
            <img
              className={styles.iconX}
              src="../../../public/img/xTransparente.png"
              alt=""
            />
          </Link>
          <Link
            to={"https://www.linkedin.com/company/ossemgp/"}
            target="_blank"
          >
            <img
              className={styles.iconLinkedin}
              src="../../../public/img/linkedinNegro.png"
              alt=""
            />
          </Link>
        </div>
        <div className={styles.line}></div>
      </div>
      <div className={styles.containerTitles}>
        <h2>Obras Sanitarias</h2>
        <p>Copyright &copy; 2024</p>
      </div>
      <div className={styles.containerPolitics}>
        <Link>
          <p>Informacion legal</p>
        </Link>
        <div className={styles.separate}></div>
        <Link>
          <p>Politica de privacidad</p>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
