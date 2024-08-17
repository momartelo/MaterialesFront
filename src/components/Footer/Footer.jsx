import { Link } from "react-router-dom";
import { useResponsive } from "../../providers/ResponsiveContext";
import { useTheme } from "../../providers/ThemeProvider";
import styles from "./Footer.module.css";

const Footer = () => {
  const { isNightMode } = useTheme();
  const {
    isDesktopHD,
    isDesktopFullHD,
    isTabletHD,
    isTablet,
    isMobileLandscape,
    isMobile,
  } = useResponsive();
  return (
    <>
      {isDesktopFullHD && (
        <div className={styles.containerFooter}>
          <div className={styles.containerSocialIcons}>
            <div className={styles.line}></div>
            <div className={styles.socialIcons}>
              <Link to={"https://www.facebook.com/ossemgp"} target="_blank">
                <img
                  className={styles.iconFacebookFullHD}
                  src="../../../public/img/facebook.png"
                  alt=""
                />
              </Link>
              <Link
                to={"https://www.instagram.com/ossemgp/?hl=es"}
                target="_blank"
              >
                <img
                  className={styles.iconInstagramFullHD}
                  src="../../../public/img/instagramNegro.png"
                  alt=""
                />
              </Link>
              <Link
                to={"https://www.youtube.com/channel/UCCEEL9h3O0NzjjIHKs8IRTw"}
                target="_blank"
              >
                <img
                  className={styles.iconYoutubeFullHD}
                  src="../../../public/img/youtube.png"
                  alt=""
                />
              </Link>
              <Link to={"https://x.com/prensaosse"} target="_blank">
                <img
                  className={styles.iconXFullHD}
                  src="../../../public/img/xTransparente.png"
                  alt=""
                />
              </Link>
              <Link
                to={"https://www.linkedin.com/company/ossemgp/"}
                target="_blank"
              >
                <img
                  className={styles.iconLinkedinFullHD}
                  src="../../../public/img/linkedinNegro.png"
                  alt=""
                />
              </Link>
            </div>
            <div className={styles.line}></div>
          </div>
          <div className={styles.containerTitles}>
            <div className={styles.containerTitle}>
              <h2>Obras Sanitarias</h2>
            </div>
            <div className={styles.containerCopyright}>
              <p>&nbsp; Todos los derechos reservados &copy; 2024</p>
            </div>
          </div>
          <div className={styles.containerPolitics}>
            {/* <Link>
              <p>Informacion legal</p>
            </Link>
            <div className={styles.separateFull}></div>
            <Link>
              <p>Politica de privacidad</p>
            </Link> */}
          </div>
        </div>
      )}
      {isDesktopHD && (
        <div className={styles.containerFooter}>
          <div className={styles.containerSocialIcons}>
            <div className={styles.line}></div>
            <div className={styles.socialIcons}>
              <Link to={"https://www.facebook.com/ossemgp"} target="_blank">
                <img
                  className={styles.iconFacebookHD}
                  src="../../../public/img/facebook.png"
                  alt=""
                />
              </Link>
              <Link
                to={"https://www.instagram.com/ossemgp/?hl=es"}
                target="_blank"
              >
                <img
                  className={styles.iconInstagramHD}
                  src="../../../public/img/instagramNegro.png"
                  alt=""
                />
              </Link>
              <Link
                to={"https://www.youtube.com/channel/UCCEEL9h3O0NzjjIHKs8IRTw"}
                target="_blank"
              >
                <img
                  className={styles.iconYoutubeHD}
                  src="../../../public/img/youtube.png"
                  alt=""
                />
              </Link>
              <Link to={"https://x.com/prensaosse"} target="_blank">
                <img
                  className={styles.iconXHD}
                  src="../../../public/img/xTransparente.png"
                  alt=""
                />
              </Link>
              <Link
                to={"https://www.linkedin.com/company/ossemgp/"}
                target="_blank"
              >
                <img
                  className={styles.iconLinkedinHD}
                  src="../../../public/img/linkedinNegro.png"
                  alt=""
                />
              </Link>
            </div>
            <div className={styles.line}></div>
          </div>
          <div className={styles.containerTitles}>
            <div className={styles.containerTitle}>
              <h2>Obras Sanitarias</h2>
            </div>
            <div className={styles.containerCopyright}>
              <p>&nbsp; Todos los derechos reservados &copy; 2024</p>
            </div>
          </div>
          <div className={styles.containerPolitics}>
            {/* <Link>
              <p>Informacion legal</p>
            </Link>
            <div className={styles.separate}></div>
            <Link>
              <p>Politica de privacidad</p>
            </Link> */}
          </div>
        </div>
      )}
      {isTabletHD && (
        <div className={styles.containerFooter}>
          <div className={styles.containerSocialIcons}>
            <div className={styles.line}></div>
            <div className={styles.socialIcons}>
              <Link to={"https://www.facebook.com/ossemgp"} target="_blank">
                <img
                  className={styles.iconFacebookHD}
                  src="../../../public/img/facebook.png"
                  alt=""
                />
              </Link>
              <Link
                to={"https://www.instagram.com/ossemgp/?hl=es"}
                target="_blank"
              >
                <img
                  className={styles.iconInstagramHD}
                  src="../../../public/img/instagramNegro.png"
                  alt=""
                />
              </Link>
              <Link
                to={"https://www.youtube.com/channel/UCCEEL9h3O0NzjjIHKs8IRTw"}
                target="_blank"
              >
                <img
                  className={styles.iconYoutubeHD}
                  src="../../../public/img/youtube.png"
                  alt=""
                />
              </Link>
              <Link to={"https://x.com/prensaosse"} target="_blank">
                <img
                  className={styles.iconXHD}
                  src="../../../public/img/xTransparente.png"
                  alt=""
                />
              </Link>
              <Link
                to={"https://www.linkedin.com/company/ossemgp/"}
                target="_blank"
              >
                <img
                  className={styles.iconLinkedinHD}
                  src="../../../public/img/linkedinNegro.png"
                  alt=""
                />
              </Link>
            </div>
            <div className={styles.line}></div>
          </div>
          <div className={styles.containerTitles}>
            <div className={styles.containerTitle}>
              <h2>Obras Sanitarias</h2>
            </div>
            <div className={styles.containerCopyright}>
              <p>&nbsp; Todos los derechos reservados &copy; 2024</p>
            </div>
          </div>
          <div className={styles.containerPolitics}>
            {/* <Link>
              <p>Informacion legal</p>
            </Link>
            <div className={styles.separate}></div>
            <Link>
              <p>Politica de privacidad</p>
            </Link> */}
          </div>
        </div>
      )}
      {isTablet && (
        <div className={styles.containerFooter}>
          <div className={styles.containerSocialIcons}>
            <div className={styles.line}></div>
            <div className={styles.socialIcons}>
              <Link to={"https://www.facebook.com/ossemgp"} target="_blank">
                <img
                  className={styles.iconFacebookHD}
                  src="../../../public/img/facebook.png"
                  alt=""
                />
              </Link>
              <Link
                to={"https://www.instagram.com/ossemgp/?hl=es"}
                target="_blank"
              >
                <img
                  className={styles.iconInstagramHD}
                  src="../../../public/img/instagramNegro.png"
                  alt=""
                />
              </Link>
              <Link
                to={"https://www.youtube.com/channel/UCCEEL9h3O0NzjjIHKs8IRTw"}
                target="_blank"
              >
                <img
                  className={styles.iconYoutubeHD}
                  src="../../../public/img/youtube.png"
                  alt=""
                />
              </Link>
              <Link to={"https://x.com/prensaosse"} target="_blank">
                <img
                  className={styles.iconXHD}
                  src="../../../public/img/xTransparente.png"
                  alt=""
                />
              </Link>
              <Link
                to={"https://www.linkedin.com/company/ossemgp/"}
                target="_blank"
              >
                <img
                  className={styles.iconLinkedinHD}
                  src="../../../public/img/linkedinNegro.png"
                  alt=""
                />
              </Link>
            </div>
            <div className={styles.line}></div>
          </div>
          <div className={styles.containerTitles}>
            <div className={styles.containerTitleTablet}>
              <h2>Obras Sanitarias</h2>
            </div>
            <div className={styles.containerCopyright}>
              <p>&nbsp; Todos los derechos reservados &copy; 2024</p>
            </div>
          </div>
          <div className={styles.containerPolitics}>
            {/* <Link>
              <p>Informacion legal</p>
            </Link>
            <div className={styles.separate}></div>
            <Link>
              <p>Politica de privacidad</p>
            </Link> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
